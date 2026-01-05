from sqlalchemy import Column, Integer,String, DECIMAL, Date, ForeignKey
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class TransactionData(Base):
    __tablename__ = "transaction_data"

    id = Column("idtransaction_data", Integer, primary_key=True, autoincrement=True)
    amount = Column("amount", DECIMAL(10, 0), nullable=False)
    paid_by = Column("paid_by", Integer, nullable=False)
    group_id = Column("group_id", Integer, nullable=True)
    description = Column("description", String(255), nullable=True)
    created_date = Column("created_date", Date, nullable=False)


class TransactionParticipationData(Base):
    __tablename__ = "transaction_participation_data"

    id = Column("idtransaction_participation_data", Integer, primary_key=True, autoincrement=True)
    transaction_id = Column(
        "transaction_id",
        Integer,
        ForeignKey("transaction_data.idtransaction_data", ondelete="CASCADE"),
        nullable=False
    )
    participant_id = Column(
        "transation_participant_id",
        Integer,
        nullable=False
    )
    owed_amount = Column("owed_amount", DECIMAL(10, 0), nullable=False)
    status = Column("status", String(20), nullable=False)  # e.g., 'paid', 'unpaid'
    settled_at = Column("settled_at", Date, nullable=True)
