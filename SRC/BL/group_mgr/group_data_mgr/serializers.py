

def group_to_dict(group):
    return {
        "id": group.id,
        "group_name": group.group_name,
        "created_at": str(group.created_at),
    }


def mapping_to_dict(mapping):
    return {
        "id": mapping.id,
        "user_id": mapping.user_id,
        "group_id": mapping.group_id,
        "role": mapping.role,
        "joined_at": str(mapping.joined_at),
        "status": mapping.status,
    }

