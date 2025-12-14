from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class GroupData(Base):
    __tablename__ = 'group_data'
    id = Column("idgroup_data", Integer, primary_key=True, autoincrement=True)
    group_name = Column("group_name",String(50), nullable=False)
    created_at = Column("created_at",Date, nullable=False)


class GroupUserMapping(Base):
    __tablename__ = "user_group_mapping_data"

    id = Column("iduser_group_mapping_data", Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, nullable=False)
    group_id = Column(Integer, ForeignKey("group_data.idgroup_data"), nullable=False)
    role = Column(String(20), nullable=False)  # e.g., 'admin', 'member'
    joined_at = Column(Date, nullable=False)
    status = Column(String(20), nullable=False)  # e.g., 'active', 'inactive'

    @property
    def group_name(self):
        return self._group_name

    @group_name.setter
    def group_name(self, value: str):
        self._group_name = value
