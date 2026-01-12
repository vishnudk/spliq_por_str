# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .expenseDbMgr import TransactionDbManager
from .utils import transaction_to_dict, participation_to_dict
from datetime import date


class TransactionListCreate(APIView):
    """List all transactions or create a new transaction"""
    
    def get(self, request):
        db_mgr = TransactionDbManager()
        transactions = db_mgr.get_all_transactions()
        return Response([transaction_to_dict(t) for t in transactions])
    
    def post(self, request):
        db_mgr = TransactionDbManager()
        data = request.data
        
        # Create transaction
        tx = db_mgr.create_transaction(
            amount=data.get('amount'),
            paid_by=data.get('paid_by'),
            group_id=data.get('group_id'),
            description=data.get('description', ''),
            created_date=data.get('created_date', date.today())
        )
        
        # Create participations if provided
        participations = data.get('participations', [])
        for part in participations:
            db_mgr.add_participation(
                transaction_id=tx.id,
                participant_id=part.get('participant_id'),
                owed_amount=part.get('owed_amount'),
                status=part.get('status', 'unpaid')
            )
        
        return Response(transaction_to_dict(tx), status=status.HTTP_201_CREATED)


class TransactionRetrieveUpdateDelete(APIView):
    """Retrieve, update or delete a transaction"""
    
    def get(self, request, tx_id):
        db_mgr = TransactionDbManager()
        tx = db_mgr.get_transaction(tx_id)
        if not tx:
            return Response({'error': 'Transaction not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(transaction_to_dict(tx))
    
    def put(self, request, tx_id):
        db_mgr = TransactionDbManager()
        tx = db_mgr.update_transaction(tx_id, **request.data)
        if not tx:
            return Response({'error': 'Transaction not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(transaction_to_dict(tx))
    
    def delete(self, request, tx_id):
        db_mgr = TransactionDbManager()
        success = db_mgr.delete_transaction(tx_id)
        if not success:
            return Response({'error': 'Transaction not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ParticipationListCreate(APIView):
    """List participations for a transaction or create a new participation"""
    
    def get(self, request, tx_id):
        db_mgr = TransactionDbManager()
        participations = db_mgr.get_participations_by_tx(tx_id)
        return Response([participation_to_dict(p) for p in participations])
    
    def post(self, request, tx_id):
        db_mgr = TransactionDbManager()
        data = request.data
        part = db_mgr.add_participation(
            transaction_id=tx_id,
            participant_id=data.get('participant_id'),
            owed_amount=data.get('owed_amount'),
            status=data.get('status', 'unpaid')
        )
        return Response(participation_to_dict(part), status=status.HTTP_201_CREATED)


class ParticipationRetrieveUpdateDelete(APIView):
    """Retrieve, update or delete a participation"""
    
    def get(self, request, part_id):
        db_mgr = TransactionDbManager()
        part = db_mgr.get_participation(part_id)
        if not part:
            return Response({'error': 'Participation not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(participation_to_dict(part))
    
    def put(self, request, part_id):
        db_mgr = TransactionDbManager()
        part = db_mgr.update_participation(part_id, **request.data)
        if not part:
            return Response({'error': 'Participation not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(participation_to_dict(part))
    
    def delete(self, request, part_id):
        db_mgr = TransactionDbManager()
        success = db_mgr.delete_participation(part_id)
        if not success:
            return Response({'error': 'Participation not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)


class GroupTransactions(APIView):
    """Get all transactions for a specific group"""
    
    def get(self, request, group_id):
        db_mgr = TransactionDbManager()
        transactions = db_mgr.get_transactions_by_group(group_id)
        return Response([transaction_to_dict(t) for t in transactions])


class UserExpenseSummary(APIView):
    """Get expense summary for a user (total to pay and total to receive)"""
    
    def get(self, request, user_id):
        db_mgr = TransactionDbManager()
        
        # Get all transactions
        all_transactions = db_mgr.get_all_transactions()
        
        total_to_pay = 0
        total_to_receive = 0
        
        for tx in all_transactions:
            # Get participations for this transaction
            participations = db_mgr.get_participations_by_tx(tx.id)
            
            # If user paid for this transaction
            if tx.paid_by == user_id:
                # They should receive money from participants
                for part in participations:
                    if part.participant_id != user_id and part.status == 'unpaid':
                        total_to_receive += float(part.owed_amount)
            
            # If user is a participant in this transaction
            else:
                for part in participations:
                    if part.participant_id == user_id and part.status == 'unpaid':
                        total_to_pay += float(part.owed_amount)
        
        return Response({
            'user_id': user_id,
            'total_to_pay': total_to_pay,
            'total_to_receive': total_to_receive
        })


class UserDebtDetails(APIView):
    """Get detailed debt information for a user"""
    
    def get(self, request, user_id):
        db_mgr = TransactionDbManager()
        
        # Get all transactions
        all_transactions = db_mgr.get_all_transactions()
        
        debt_details = []
        
        for tx in all_transactions:
            # Get participations for this transaction
            participations = db_mgr.get_participations_by_tx(tx.id)
            
            # If user paid for this transaction
            if tx.paid_by == user_id:
                # They should receive money from participants
                for part in participations:
                    if part.participant_id != user_id and part.status == 'unpaid':
                        debt_details.append({
                            'type': 'OWE_YOU',
                            'person_id': part.participant_id,
                            'amount': float(part.owed_amount),
                            'group_id': tx.group_id,
                            'description': tx.description,
                            'date': tx.created_date
                        })
            
            # If user is a participant in this transaction
            else:
                for part in participations:
                    if part.participant_id == user_id and part.status == 'unpaid':
                        debt_details.append({
                            'type': 'YOU_OWE',
                            'person_id': tx.paid_by,
                            'amount': float(part.owed_amount),
                            'group_id': tx.group_id,
                            'description': tx.description,
                            'date': tx.created_date
                        })
                        
        return Response(debt_details)
