# views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .expenseDbMgr import TransactionDbManager
from .utils import transaction_to_dict, participation_to_dict

db = TransactionDbManager()

# ---------------- TransactionData Views --------------------

class TransactionListCreate(APIView):
    def get(self, request):
        txs = db.get_all_transactions()
        return Response([transaction_to_dict(t) for t in txs])

    def post(self, request):
        required = ["amount", "paid_by"]
        for r in required:
            if r not in request.data:
                return Response({"error": f"{r} required"}, status=400)

        tx = db.create_transaction(
            amount=request.data["amount"],
            paid_by=request.data["paid_by"],
            group_id=request.data.get("group_id")
        )
        return Response(transaction_to_dict(tx), status=201)


class TransactionRetrieveUpdateDelete(APIView):
    def get(self, request, tx_id):
        tx = db.get_transaction(tx_id)
        if not tx:
            return Response({"error": "Not found"}, status=404)
        return Response(transaction_to_dict(tx))

    def put(self, request, tx_id):
        tx = db.update_transaction(tx_id, **request.data)
        if not tx:
            return Response({"error": "Not found"}, status=404)
        return Response(transaction_to_dict(tx))

    def delete(self, request, tx_id):
        ok = db.delete_transaction(tx_id)
        if not ok:
            return Response({"error": "Not found"}, status=404)
        return Response({"message": "Deleted"}, status=200)

# ---------------- Participation Views --------------------

class ParticipationListCreate(APIView):
    def get(self, request, tx_id):
        participations = db.get_participations_by_tx(tx_id)
        return Response([participation_to_dict(p) for p in participations])

    def post(self, request, tx_id):
        required = ["participant_id", "owed_amount", "status"]
        for r in required:
            if r not in request.data:
                return Response({"error": f"{r} required"}, status=400)

        part = db.add_participation(
            transaction_id=tx_id,
            participant_id=request.data["participant_id"],
            owed_amount=request.data["owed_amount"],
            status=request.data["status"],
            settled_at=request.data.get("settled_at")
        )

        return Response(participation_to_dict(part), status=201)


class ParticipationRetrieveUpdateDelete(APIView):
    def get(self, request, part_id):
        part = db.get_participation(part_id)
        if not part:
            return Response({"error": "Not found"}, status=404)
        return Response(participation_to_dict(part))

    def put(self, request, part_id):
        part = db.update_participation(part_id, **request.data)
        if not part:
            return Response({"error": "Not found"}, status=404)
        return Response(participation_to_dict(part))

    def delete(self, request, part_id):
        ok = db.delete_participation(part_id)
        if not ok:
            return Response({"error": "Not found"}, status=404)
        return Response({"message": "Deleted"}, status=200)
