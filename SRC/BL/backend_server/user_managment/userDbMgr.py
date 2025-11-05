from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, Column, Integer, String
from user_managment.models import UserCredentials
import pymysql

class userDbMgr:
    def __init__(self):
        self.engine = create_engine("mysql+pymysql://root:Devmachine123!@localhost/user_data_db")
        self.Session = sessionmaker(bind=self.engine)
        self.session = self.Session()

    def get_user_by_username(self, username):
        user = self.session.query(UserCredentials).filter_by(userid=username).first()
        if user:
            return {'username': user.username, 'password': user.password, 'userid': user.userid}
        return None