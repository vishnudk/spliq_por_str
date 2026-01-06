# utils.py

def transaction_to_dict(t):
    return {
        "id": t.id,
        "amount": float(t.amount),
        "paid_by": t.paid_by,
        "group_id": t.group_id,
        "description": t.description,
        "created_date": t.created_date.isoformat()
    }


def participation_to_dict(p):
    return {
        "id": p.id,
        "transaction_id": p.transaction_id,
        "participant_id": p.participant_id,
        "owed_amount": float(p.owed_amount),
        "status": p.status,
        "settled_at": p.settled_at.isoformat() if p.settled_at else None
    }
