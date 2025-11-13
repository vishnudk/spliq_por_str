from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, Column, Integer, String
from user_authentication.models import UserCredentials
from user_mgr.settings import DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
import pymysql

class userDbMgr:
    def __init__(self):
        self.engine = create_engine(f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}")
        self.Session = sessionmaker(bind=self.engine)
        self.session = self.Session()

    def get_user_by_username(self, username):
        # self.add_db_table()
        user = self.session.query(UserCredentials).filter_by(userid=username).first()
        if user:
            return {'username': user.username, 'password': user.password, 'userid': user.userid}
        return None

    def add_db_table(self):
        conn = pymysql.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME
        )
        cursor = conn.cursor()

        with open("/SqlScripts/settle_database_user_data.sql", "r") as file:
            sql_script = file.read()

        for stmt in sql_script.split(";"):
            stmt = stmt.strip()
            if stmt:
                cursor.execute(stmt)

        conn.commit()
        cursor.close()
        conn.close()
