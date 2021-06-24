# Shift - A React + Flask Chat Application
Shift is a web application build with a React front-end and Flask back-end. The back-end is connected to a Postgres database that will store user information and send or retrieve messages from the users.

Try out the live version here: [Shift Chat Site](https://shift-chat-app.herokuapp.com/login)

## About Shift
Shift is a message board application that allows people to connect with others interested in different forms of exercise. The site contains several channels for different types of activities (cardio, running, cycling, lifting, etc) and within the channel users can collaborate on that topic.

There are three pages to this site: Home, Login, and Sign-Up.

### Home Page
The Home page contains the message board and different channels the user can enter into. They can send and receive messages from others within the chatroom. All messages are stored in the database in a 'messages' table along with the user id, current channel id, and creation date. 

Channels are listed in the left-hand panel, user's can also add a new channel if a topic they want to dicuss is missing. All channels are also stored in the database in a 'channels' table, and all records in that table retrieved and displayed on load. 

Finally, a user can logout if they are finished using the logout link on the top left of the page.

All routes related to actions on this page (send messages, add channels, get channels, logout, etc) are protected and require a valid JWT token provided on login, so that only users with a valid account can access those routes.

![](./screenshots/home.gif)

### Login Page
If a current JWT token doesn't exist, or it has expired, the user will automatically be redirected to the Login page. They must enter a valid username and password in order to access the Home page. Or, if they don't currently have an account, the Sign Up button will redirect to the Sign-Up page so they can create one.

Once the email and password have been submitted, account has been verified as an existing account and the password is confirmed as valid, the a JWT token containing the user's ID is created and passed to the front-end which is used to access the routes used for the Home page functionality. User is then re-routed to the Home page and can start using the message board.

![](./screenshots/login.gif)

### Sign-Up Page
The Sign-Up page allows users to create a new account with their first name, last name, email, and password. All of the user information is stored in a 'users' table in the database besides the password. Once the information is submitted and stored, the user is redirected to the Login page so they can login with their newly created account.

The password must be confirmed with two matching entires into two separate fields, and once all required information is submitted the password is then converted to a hash value which is then stored in the database. The hash is used to compare the entered password in the Login page as well to confirm a valid user account before redirecting to the Home page. 

![](./screenshots/signup.gif)

## Tools + Technologies
### Front-End
The front-end of this project is built in React using create-react-app application. Most of the components are created using react-bootstrap package, and styling is also done using responsive Bootstrap classes. Bootstrap also provides the validation for the Login and Sign-up forms to confirm valid values have been entered before submitting.

Additional Resources:
- React-bootstrap: https://react-bootstrap.github.io/
- Bootstrap: https://getbootstrap.com/
- Background image: https://unsplash.com/

### Back-End
#### Flask
The back-end for this site is created using Flask, a Python based framework for creating lightweight web servers. Flask is used to congiure the server, which defines the route endpoints for handling the HTTP requests, establishes connection and communication with the Postgres database, and serve the React index.html file for the user interface. 

There are two main types of routes in this application: authentication and views. 

The authentication handles user login/logout, storing new account information, and password security. Password encryption is handled using Flask's built-in werkzeug.security class, which provides methods for hashing passwords and comparing password hashs for logging in. The login route also utilizes a Flask extension called flask_jwt_extended, which provides methods for creating JWT tokens that are returned to the front-end on successful login. 

 The view endpoints handles interaction with the message board, including storing new messages, creating channels, and getting messages by channel. These routes are protected as only a valid user should be able to write / receive messages or create channels. The previously mentioned flask_jwt_extended provides a jwt_required tag that is added to the routes to ensure that any HTTP requests coming from the front end include that token in the request header for authentication.

Additional Resources: 
- Flask: https://flask.palletsprojects.com/en/2.0.x/
- Werkzeug: https://www.palletsprojects.com/p/werkzeug/
- Flask-JWT-Extended: https://flask-jwt-extended.readthedocs.io/en/stable/index.html

#### Postgres
The database for this project is created using Postgres, and communicates with the back-end routes using the Flask extension flask_sqlalchemy. In the server configuration the database URI is defined as an environment variable which allows the server to connect. Once this is done, communication can be established with the database by using the SQLAlchemy models defined in the backend/models.py file, which defines the number and type of each column in the associated table (users, messages, or channels). From there the SQLAlchemy models contain a query function that are used to pull data from the specified table, including filters if needed. 

For development, a local database is used by installing Postgres locally and using the built-in PgAdmin tool to create the database columns. From there the local URI is added to the .env file so the server can connect. 

For production deployment, Heroku includes a Postgres add-on which will provide the associated application with a database and automatically create an environment variable with the database's URI information.

Additional Resources:
- Flask-SQLAlchemy: https://flask-sqlalchemy.palletsprojects.com/en/2.x/
- Postgres: https://www.postgresql.org/
- Heroku Postgres: https://devcenter.heroku.com/articles/heroku-postgresql

## Running Locally
To run this project locally, you need the following tools installed on your local machine: 
- Node: https://nodejs.org/en/download/
- Python: https://www.python.org/downloads/
- Pipenv: https://pipenv.pypa.io/en/latest/
- Postgres: https://www.postgresql.org/download/

The below instructions can be followed if you want to run this project locally for custom development or enhancements:

Setup locally
- Fork this repository to your Github account
- On your local computer, navigate to the folder you want to store the project: `cd PROJECT-FOLDER-NAME`
- Clone the forked repository locally: `git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY`

Start back-end
- Navigate to project client folder: `cd PROJECT-FOLDER-NAME/chat-app/client`
- Install React dependencies: `npm install`
- Navigate back to project root folder `cd ..`
- Open a pipenv shell: `pipenv shell`
- Install Flask dependencies: `pipenv install`
- Add .env file to the project's root folder
- Add variable DATABASE_URL and set it to the URI of your local database
    - the URI should have the following structure: `postgresql://[USERNAME]:[PASSWORD]@localhost/[DATABASE_NAME]
    - If you don't have a local database setup, here are some instructions to create one: https://phoenixnap.com/kb/postgres-create-database
- Add variable SECRET_KEY and set it to any random string
- Add variable JWT_SECRET and set it to any random string
- Add variable ENV and set it to 'dev' (without quotation marks)
- From the root folder, start the application server: `python app.py`
- View the local web application at http://localhost:5000/

## Author
Rheanna Pena - [LinkedIn](https://www.linkedin.com/in/rheanna-pena-aa0007110/)
