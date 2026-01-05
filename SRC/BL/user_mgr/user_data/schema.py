import strawberry
from user_core.models import UserData
from typing import Optional
import requests
import logging

@strawberry.type
class ExpenseType:
    id: int
    totalAmountToBePaid: float
    totalAmountToGet: float

@strawberry.type
class TransactionType:
    id: int
    amount: float
    description: str
    date: str

@strawberry.type
class UserConversationsListType:
    conversationId: int
    conversationName: str

@strawberry.type
class UserType:
    id: int
    userEmail: str
    username: str
    expenseType: list[ExpenseType] = strawberry.field(default_factory=list)
    conversationType: list[UserConversationsListType] = strawberry.field(default_factory=list)


def request_grpMgr_for_user_grps(user_id: int) -> list[str]:
    response = requests.get(
        f"http://group-mgr:8001/groupData/user/{user_id}/groups/",
    )
    return response.json() if response.status_code == 200 else []

def get_expenses(user_id: int) -> list[ExpenseType]:
    # Dummy data for demonstration
    logger = logging.getLogger(__name__)
    logger.info(f"Fetching expenses for user_id: {user_id}")
    response = requests.get(f"http://expense-mgr:8003/expenseData/user/{user_id}/")
    if response.status_code == 200:
        data = response.json()
        return [ExpenseType(
            id=user_id,
            totalAmountToBePaid=data.get('total_to_pay', 0.0),
            totalAmountToGet=data.get('total_to_receive', 0.0)
        )]
    return []
   

def get_conversations(user_id: int) -> list[UserConversationsListType]:
    # Dummy data for demonstration
    user_group_data = request_grpMgr_for_user_grps(user_id)
    data = []
    print("user_group_data:", user_group_data)
    logger = logging.getLogger(__name__)
    logger.info(f"Fetching conversations for user_id: {user_id}")
    for group in user_group_data:
        data.append(
            UserConversationsListType(
                conversationId=int(group['group_id']),
                conversationName=group['group_name']
            )
        )

    return data

def get_users(user_id: int) -> list[UserType]:
    from user_authentication.userDbMgr import userDbMgr
    
    # Fetch user from DB
    # We might need a get_user_by_id in userDbMgr or just use existing methods if possible
    # userDbMgr currently only has get_user_by_username. I should add get_user_by_id first or use a direct query here if I can't modify userDbMgr easily again (which I can).
    # Let's assume I'll add get_user_by_id to userDbMgr next.
    
    user_record = userDbMgr().get_user_by_id(user_id)
    
    if user_record:
        return [
            UserType(
                id=user_record['id'],
                username=user_record['username'],
                userEmail=user_record['email'],
                expenseType=get_expenses(user_id),
                conversationType=get_conversations(user_id)
            )
        ]
    return []


@strawberry.type
class Query:
    @strawberry.field
    def users(self) -> list[UserType]:
        # Return a list of all users (dummy implementation using multiple IDs)
        return get_users(1) + get_users(2)
    
    @strawberry.field
    def user(self, userId: int) -> Optional[UserType]:
        userData = get_users(userId)
        return userData[0]

schema = strawberry.Schema(query=Query)
