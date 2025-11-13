from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base


Base = declarative_base()

class UserCredentials(Base):
    __tablename__ = 'user_credentials_tbl'
    id = Column("iduser_credentials_tbl", Integer, primary_key=True, autoincrement=True)
    username = Column("user_name",String(50), unique=True, nullable=False)
    password = Column("user_password",String(100), nullable=False)
    userid = Column("user_id",String(50), unique=True, nullable=False)    
