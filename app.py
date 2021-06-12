from routes import create_app
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
import os

load_dotenv()
app = create_app()
db = SQLAlchemy(app)

if os.environ.get('ENV') == 'dev':
    app.debug = True
else:
    app.debug = False

if __name__ == '__main__':
    app.run()