from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

from .groupDbMgr import GroupDbMgr
from .serializers import group_to_dict, mapping_to_dict

db = GroupDbMgr()

class GroupListCreate(APIView):
    def get(self, request):
        groups = db.get_all_groups()
        return Response([group_to_dict(g) for g in groups])

    def post(self, request):
        name = request.data.get("group_name")
        if not name:
            return Response({"error": "group_name required"}, status=400)

        group = db.create_group(group_name=name)
        return Response(group_to_dict(group), status=201)

class GroupDetail(APIView):
    def get(self, request, group_id):
        group = db.get_group(group_id)
        if not group:
            return Response({"error": "Group not found"}, status=404)

        return Response(group_to_dict(group))

    def put(self, request, group_id):
        name = request.data.get("group_name")
        group = db.update_group(group_id, name)
        if not group:
            return Response({"error": "Group not found"}, status=404)

        return Response(group_to_dict(group))

    def delete(self, request, group_id):
        deleted = db.delete_group(group_id)
        if not deleted:
            return Response({"error": "Group not found"}, status=404)

        return Response({"message": "Group deleted"})


class AddUserToGroup(APIView):
    def post(self, request):
        user_id = request.data.get("user_id")
        group_id = request.data.get("group_id")
        role = request.data.get("role", "member")

        if not user_id or not group_id:
            return Response({"error": "user_id and group_id required"}, status=400)

        mapping = db.add_user_to_group(
            user_id=user_id,
            group_id=group_id,
            role=role
        )
        return Response(mapping_to_dict(mapping), status=201)


class MappingDetail(APIView):
    def get(self, request, mapping_id):
        mapping = db.get_mapping(mapping_id)
        if not mapping:
            return Response({"error": "Mapping not found"}, status=404)

        return Response(mapping_to_dict(mapping))


class UsersInGroup(APIView):
    def get(self, request, group_id):
        mappings = db.get_users_in_group(group_id)
        return Response([mapping_to_dict(m) for m in mappings])


class GroupsOfUser(APIView):
    def get(self, request, user_id):
        mappings = db.get_groups_of_user(user_id)
        # return Response([mapping_to_dict(m) for m in mappings])
        return Response(mappings)


class UpdateUserGroupMapping(APIView):
    def put(self, request, mapping_id):
        role = request.data.get("role")
        status_value = request.data.get("status")

        mapping = db.update_user_group_role(mapping_id, role=role, status=status_value)
        if not mapping:
            return Response({"error": "Mapping not found"}, status=404)

        return Response(mapping_to_dict(mapping))

class RemoveUserFromGroup(APIView):
    def delete(self, request, mapping_id):
        removed = db.remove_user_from_group(mapping_id)
        if not removed:
            return Response({"error": "Mapping not found"}, status=404)

        return Response({"message": "User removed from group"})


