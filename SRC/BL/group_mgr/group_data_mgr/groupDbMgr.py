from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import create_engine, Column, Integer, String
from group_mgr.settings import DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
from .models import GroupData,GroupUserMapping,  Base
from datetime import datetime
import pymysql

class GroupDbMgr:
    def __init__(self):
        self.ensure_database()

        self.engine = create_engine(
            f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}",
            pool_pre_ping=True
        )
        self.SessionLocal = sessionmaker(bind=self.engine, autoflush=False, autocommit=False)

        Base.metadata.create_all(self.engine)

    def get_session(self):
        return self.SessionLocal()

    def ensure_database(self):
        conn = pymysql.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
        )
        cursor = conn.cursor()
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
        conn.commit()
        conn.close()
    # ... your __init__, ensure_database, get_session already here ...

    # ============================
    #       GROUP DATA CRUD
    # ============================

    def create_group(self, group_name: str, created_at=None):
        session = self.get_session()
        try:
            group = GroupData(
                group_name=group_name,
                created_at=created_at or datetime.now().date()
            )
            session.add(group)
            session.commit()
            session.refresh(group)
            return group
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()

    def get_group(self, group_id: int):
        session = self.get_session()
        try:
            return session.query(GroupData).filter_by(id=group_id).first()
        finally:
            session.close()

    def get_all_groups(self):
        session = self.get_session()
        try:
            return session.query(GroupData).all()
        finally:
            session.close()

    def update_group(self, group_id: int, group_name: str = None):
        session = self.get_session()
        try:
            group = session.query(GroupData).filter_by(id=group_id).first()
            if not group:
                return None

            if group_name:
                group.group_name = group_name

            session.commit()
            session.refresh(group)
            return group
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()

    def delete_group(self, group_id: int):
        session = self.get_session()
        try:
            group = session.query(GroupData).filter_by(id=group_id).first()
            if not group:
                return False

            session.delete(group)
            session.commit()
            return True
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()


    # ============================
    #   GROUP USER MAPPING CRUD
    # ============================

    def add_user_to_group(self, user_id: int, group_id: int, role: str,
                          status="active", joined_at=None):
        session = self.get_session()
        try:
            mapping = GroupUserMapping(
                user_id=user_id,
                group_id=group_id,
                role=role,
                status=status,
                joined_at=joined_at or datetime.now().date()
            )
            session.add(mapping)
            session.commit()
            session.refresh(mapping)
            return mapping
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()

    def get_mapping(self, mapping_id: int):
        session = self.get_session()
        try:
            return session.query(GroupUserMapping)\
                          .filter_by(id=mapping_id).first()
        finally:
            session.close()

    def get_users_in_group(self, group_id: int):
        session = self.get_session()
        try:
            return session.query(GroupUserMapping)\
                          .filter_by(group_id=group_id).all()
        finally:
            session.close()

    def get_groups_of_user(self, user_id: int):
        session = self.get_session()
        try:
            return session.query(GroupUserMapping)\
                          .filter_by(user_id=user_id).all()
        finally:
            session.close()

    def update_user_group_role(self, mapping_id: int, role=None, status=None):
        session = self.get_session()
        try:
            mapping = session.query(GroupUserMapping)\
                             .filter_by(id=mapping_id).first()
            if not mapping:
                return None

            if role:
                mapping.role = role
            if status:
                mapping.status = status

            session.commit()
            session.refresh(mapping)
            return mapping
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()

    def remove_user_from_group(self, mapping_id: int):
        session = self.get_session()
        try:
            mapping = session.query(GroupUserMapping)\
                             .filter_by(id=mapping_id).first()
            if not mapping:
                return False

            session.delete(mapping)
            session.commit()
            return True
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()
