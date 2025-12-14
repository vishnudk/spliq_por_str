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
    if user_id == 1:
        return [
            ExpenseType(
                id=1,
                totalAmountToBePaid=150.0,
                totalAmountToGet=200.0
            )
        ]
    else:
        return [
            ExpenseType(
                id=2,
                totalAmountToBePaid=15022.0,
                totalAmountToGet=4200.0
            )
        ]

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
    # Dummy data for demonstration
    data = [
        UserType(
            id=user_id,
            username="Luca",
            userEmail="user@gmail.com",
            expenseType=get_expenses(user_id),
            conversationType=get_conversations(user_id))]
    return data


@strawberry.type
class Query:
    users: list[UserType] = strawberry.field(resolver=get_users)
    # user: UserType = strawberry.field(resolver=get_user)
    @strawberry.field
    def user(self, userId: int) -> Optional[UserType]:
        userData = get_users(userId)
        # for user in users:
        #     if user.id == userId:
        return userData[0]
        # return None

schema = strawberry.Schema(query=Query)
