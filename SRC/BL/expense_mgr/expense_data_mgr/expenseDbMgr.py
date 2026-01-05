# transaction_db_manager.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import date
from expense_mgr.settings import DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
from .models import Base, TransactionData, TransactionParticipationData
import pymysql

class TransactionDbManager:
    def __init__(self):
        self.ensure_database()
        self.engine = create_engine(
            f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
        )
        self.Session = sessionmaker(bind=self.engine)
        self.session = self.Session()
        Base.metadata.create_all(self.engine)

    def ensure_database(self):
        conn = pymysql.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
        )
        cursor = conn.cursor()
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
        conn.commit()
        conn.close()
    # -------------------- TransactionData CRUD --------------------

    def create_transaction(self, amount, paid_by, group_id, description=None, created_date=None):
        if created_date is None:
            created_date = date.today()

        tx = TransactionData(
            amount=amount,
            paid_by=paid_by,
            group_id=group_id,
            description=description,
            created_date=created_date
        )
        self.session.add(tx)
        self.session.commit()
        return tx

    def get_transaction(self, tx_id):
        return self.session.query(TransactionData).filter_by(id=tx_id).first()

    def get_all_transactions(self):
        return self.session.query(TransactionData).all()

    def get_transactions_by_group(self, group_id):
        return self.session.query(TransactionData).filter_by(group_id=group_id).all()

    def update_transaction(self, tx_id, **kwargs):
        tx = self.get_transaction(tx_id)
        if not tx:
            return None
        for key, val in kwargs.items():
            setattr(tx, key, val)
        self.session.commit()
        return tx

    def delete_transaction(self, tx_id):
        tx = self.get_transaction(tx_id)
        if not tx:
            return False
        self.session.delete(tx)
        self.session.commit()
        return True

    # -------------------- Participation CRUD --------------------

    def add_participation(self, transaction_id, participant_id, owed_amount, status, settled_at=None):
        part = TransactionParticipationData(
            transaction_id=transaction_id,
            participant_id=participant_id,
            owed_amount=owed_amount,
            status=status,
            settled_at=settled_at
        )
        self.session.add(part)
        self.session.commit()
        return part

    def get_participation(self, part_id):
        return self.session.query(TransactionParticipationData).filter_by(id=part_id).first()

    def get_participations_by_tx(self, transaction_id):
        return self.session.query(TransactionParticipationData).filter_by(transaction_id=transaction_id).all()

    def update_participation(self, part_id, **kwargs):
        part = self.get_participation(part_id)
        if not part:
            return None
        for key, val in kwargs.items():
            setattr(part, key, val)
        self.session.commit()
        return part

    def delete_participation(self, part_id):
        part = self.get_participation(part_id)
        if not part:
            return False
        self.session.delete(part)
        self.session.commit()
        return True

