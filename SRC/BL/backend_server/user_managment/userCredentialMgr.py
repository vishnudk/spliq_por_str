from .userDbMgr import userDbMgr

class userCredentialMgr:
    def __init__(self):
        pass

    def validate_credentials(self, username, password):
        user_record = userDbMgr().get_user_by_username(username)
        if user_record and user_record['password'] == password:
            return True
        return False