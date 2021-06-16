from backend import db

class UserModel(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(200))
    lastname = db.Column(db.String(200))
    email = db.Column(db.String(200), unique=True)
    hash = db.Column(db.String(200), unique=True)

    def __init__(self, firstname, lastname, email, hash):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.hash = hash
    
    def __repr__(self):
        return '<id {}>'.format(self.id)

class ChannelModel(db.Model):
    __tablename__ = 'channels'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=True)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<name {}>'.format(self.name)