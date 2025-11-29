from fastapi import APIRouter, Depends, HTTPException
from ..db.group_db_mgr import GroupDbMgr
from ..schemas.group_schemas import (
    GroupCreate, GroupUpdate, GroupResponse,
    GroupUserCreate, GroupUserUpdate, GroupUserResponse
)

router = APIRouter(prefix="/groups", tags=["Groups"])

db = GroupDbMgr()


# ======================================
#              GROUP CRUD
# ======================================

@router.post("/", response_model=GroupResponse)
def create_group(payload: GroupCreate):
    group = db.create_group(payload.group_name)
    return group


@router.get("/{group_id}", response_model=GroupResponse)
def get_group(group_id: int):
    group = db.get_group(group_id)
    if not group:
        raise HTTPException(404, "Group not found")
    return group


@router.get("/", response_model=list[GroupResponse])
def get_all_groups():
    return db.get_all_groups()


@router.put("/{group_id}", response_model=GroupResponse)
def update_group(group_id: int, payload: GroupUpdate):
    group = db.update_group(group_id, group_name=payload.group_name)
    if not group:
        raise HTTPException(404, "Group not found")
    return group


@router.delete("/{group_id}")
def delete_group(group_id: int):
    deleted = db.delete_group(group_id)
    if not deleted:
        raise HTTPException(404, "Group not found")
    return {"message": "Group deleted successfully"}


# ======================================
#       GROUP-USER MAPPING CRUD
# ======================================

@router.post("/users/add", response_model=GroupUserResponse)
def add_user_to_group(payload: GroupUserCreate):
    mapping = db.add_user_to_group(
        user_id=payload.user_id,
        group_id=payload.group_id,
        role=payload.role,
        status=payload.status
    )
    return mapping


@router.get("/users/{mapping_id}", response_model=GroupUserResponse)
def get_mapping(mapping_id: int):
    mapping = db.get_mapping(mapping_id)
    if not mapping:
        raise HTTPException(404, "Mapping not found")
    return mapping


@router.get("/{group_id}/users", response_model=list[GroupUserResponse])
def get_users_in_group(group_id: int):
    return db.get_users_in_group(group_id)


@router.get("/user/{user_id}", response_model=list[GroupUserResponse])
def get_groups_of_user(user_id: int):
    return db.get_groups_of_user(user_id)


@router.put("/users/{mapping_id}", response_model=GroupUserResponse)
def update_user_group(mapping_id: int, payload: GroupUserUpdate):
    mapping = db.update_user_group_role(
        mapping_id,
        role=payload.role,
        status=payload.status
    )
    if not mapping:
        raise HTTPException(404, "Mapping not found")
    return mapping


@router.delete("/users/{mapping_id}")
def remove_user_from_group(mapping_id: int):
    removed = db.remove_user_from_group(mapping_id)
    if not removed:
        raise HTTPException(404, "Mapping not found")
    return {"message": "User removed from group"}
