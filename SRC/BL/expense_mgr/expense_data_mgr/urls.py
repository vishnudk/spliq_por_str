# urls.py

from django.urls import path
from .views import (
    TransactionListCreate,
    TransactionRetrieveUpdateDelete,
    ParticipationListCreate,
    ParticipationRetrieveUpdateDelete,
    GroupTransactions,
    UserExpenseSummary,
    UserDebtDetails
)

urlpatterns = [
    # TransactionData CRUD
    path("transactions/", TransactionListCreate.as_view()),
    path("transactions/<int:tx_id>/", TransactionRetrieveUpdateDelete.as_view()),

    # Participation CRUD
    path("transactions/<int:tx_id>/participations/", ParticipationListCreate.as_view()),
    path("participations/<int:part_id>/", ParticipationRetrieveUpdateDelete.as_view()),

    # Group Transactions
    path("transactions/group/<int:group_id>/", GroupTransactions.as_view()),
    
    # User Expense Summary
    # User Expense Summary
    path("user/<int:user_id>/", UserExpenseSummary.as_view()),
    path("user/<int:user_id>/details/", UserDebtDetails.as_view()),
]
