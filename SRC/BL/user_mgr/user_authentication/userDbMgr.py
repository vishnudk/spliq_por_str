from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import create_engine, Column, Integer, String
from user_authentication.models import UserCredentials
from user_mgr.settings import DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
from user_authentication.models import Base, UserCredentials
import pymysql

class userDbMgr:
    def __init__(self):
        self.engine = create_engine(f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}")
        self.Session = sessionmaker(bind=self.engine)
        self.session = self.Session()
        self.ensure_database()
        self.Base = Base
        self.Base.metadata.create_all(self.engine)

    def ensure_database(self):
        conn = pymysql.connect(
            host = DB_HOST,
            user = DB_USER,
            password= DB_PASSWORD
        )
        cursor = conn.cursor()
        cursor.execute("CREATE DATABASE IF NOT EXISTS user_mgr")
        conn.commit()

    def get_user_by_username(self, username):
        user = self.session.query(UserCredentials).filter_by(username=username).first()
        if user:
            return {'username': user.username, 'password': user.password}
        return None
        
    def add_user(self, username, password, email):
        try:
            new_user = UserCredentials(username=username, password=password, userEmail = email)
            self.session.add(new_user)
            self.session.commit()
        except Exception as e:
            print("Error adding user:", e)
            self.session.rollback()
            return False
        return True
