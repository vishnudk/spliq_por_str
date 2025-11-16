from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base


Base = declarative_base()

class UserData(Base):
    __tablename__ = 'user_data_tbl'
    id = Column("iduser_user_data_tbl", Integer, primary_key=True, autoincrement=True)
    username = Column("user_name",String(50), unique=True, nullable=False)
    password = Column("user_password",String(100), nullable=False)
    userEmail = Column("user_email", String(100), unique=True, nullable=False) 

