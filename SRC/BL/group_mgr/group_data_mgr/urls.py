from django.urls import path
from .views import (
    GroupListCreate,
    GroupDetail,
    AddUserToGroup,
    MappingDetail,
    UsersInGroup,
    GroupsOfUser,
    UpdateUserGroupMapping,
    RemoveUserFromGroup
)

urlpatterns = [
    # Group CRUD
    path("groups/", GroupListCreate.as_view()),
    path("groups/<int:group_id>/", GroupDetail.as_view()),

    # Group User Mapping CRUD
    path("group/add-user/", AddUserToGroup.as_view()),
    path("mapping/<int:mapping_id>/", MappingDetail.as_view()),
    path("group/<int:group_id>/users/", UsersInGroup.as_view()),
    path("user/<int:user_id>/groups/", GroupsOfUser.as_view()),
    path("mapping/<int:mapping_id>/update/", UpdateUserGroupMapping.as_view()),
    path("mapping/<int:mapping_id>/remove/", RemoveUserFromGroup.as_view()),
]
