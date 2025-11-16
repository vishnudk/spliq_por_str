import strawberry
from user_core.models import UserData
from typing import Optional

@strawberry.type
class ExpenseType:
    id: int
    totalAmountToBePaid: float
    totalAmountToGet: float
    

@strawberry.type
class UserType:
    id: int
    userEmail: str
    username: str
    expenseType: list[ExpenseType] = strawberry.field(default_factory=list)

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
    
def get_users(user_id: int) -> list[UserType]:
    # Dummy data for demonstration
    data = [
        UserType(
            id=user_id,
            username="Luca",
            userEmail="user@gmail.com",
            expenseType=get_expenses(user_id))]
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
