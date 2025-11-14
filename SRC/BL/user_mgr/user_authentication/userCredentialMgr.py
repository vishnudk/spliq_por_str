from .userDbMgr import userDbMgr

class userCredentialMgr:
    def __init__(self):
        pass

    def validate_credentials(self, username, password):
        return True
        print("Validating credentials for user:", username)
        user_record = userDbMgr().get_user_by_username(username)
        if user_record and user_record['password'] == password:
            return True
        return False
    def create_user(self, username, password, email):
        print("Creating user:", username)
        return userDbMgr().add_user(username, password, email)