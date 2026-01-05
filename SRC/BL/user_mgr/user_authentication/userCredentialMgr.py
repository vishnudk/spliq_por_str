from .userDbMgr import userDbMgr

class userCredentialMgr:
    def __init__(self):
        pass

    def validate_credentials(self, username, password):
        print("Validating credentials for user:", username)
        user_record = userDbMgr().get_user_by_username(username)
        if user_record and user_record['password'] == password:
            return user_record
        return False
    def create_user(self, username, password, email):
        print("Creating user:", username)
        return userDbMgr().add_user(username, password, email)

    def check_username_exists(self, username):
        print("Checking if username exists:", username)
        if userDbMgr().get_user_by_username(username):
            return True
        return False