# urls.py

from django.urls import path
from .views import (
    TransactionListCreate,
    TransactionRetrieveUpdateDelete,
    ParticipationListCreate,
    ParticipationRetrieveUpdateDelete
)

urlpatterns = [
    # TransactionData CRUD
    path("transactions/", TransactionListCreate.as_view()),
    path("transactions/<int:tx_id>/", TransactionRetrieveUpdateDelete.as_view()),

    # Participation CRUD
    path("transactions/<int:tx_id>/participations/", ParticipationListCreate.as_view()),
    path("participations/<int:part_id>/", ParticipationRetrieveUpdateDelete.as_view()),
]
