from flask import Flask, session, abort, redirect, url_for, request, render_template
import google.auth.transport
import google.auth.transport.requests
from google_auth_oauthlib.flow import Flow
import os
import pathlib
import requests
import google.auth  # google.auth --> library that helps manage authentication in Python
from google.oauth2 import id_token
import google.auth
from google.auth.transport.requests import Request
from cachecontrol import CacheControl
# lirary --> connect to mysql database
import mysql.connector


#--------------------------------- Nhung thu phuc vu cac ham ben duoi-----------------------------------------


# pathlib.Path(__file__) --> get full path of cur file --> src/js/core/gg_auth.py
app = Flask("AuthGoogle",
            template_folder= os.path.join(pathlib.Path(__file__).parent.parent.parent, "pages"),   # in file hold template
            static_folder= os.path.join(pathlib.Path(__file__).parent.parent.parent, "css"))    
app.secret_key = "AuthGoogle"

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"  # Allow HTTP for testing purposes.
GOOGLE_CLIENT_ID = "663085023264-l1q0rg9so158tjej1l869d07fm7h3t5t.apps.googleusercontent.com"
client_secrets_file = os.path.join(pathlib.Path(__file__).parent.parent.parent.parent, "config/client_secret.json") # file that contains client id

# create flow object 
flow = Flow.from_client_secrets_file(
    client_secrets_file= client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile", "openid"],
    redirect_uri = "http://127.0.0.1:5000/callback"
)

# connect to mysql database
# create connection object
def get_db_connection():
    conn = mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "123456",
        database = "Baitalon"
    )
    return conn
# parameter of function connect
# host = "localhost",  
# user 
# password
# database_name



#--------------------------------- Nhung thu phuc vu cac ham ben duoi-----------------------------------------


# func -> if user is not sign up --> not allow to access the main page
def login_is_required(f):   # decorator --> function that take another function
    def wrapper(*args, **kwargs):
        # check if user is authenticated --> if authenticated --> have google_id 
        if "google_id" not in session:
            abort(401)
        else:
            return f()
    return wrapper


# home page --> login or Sign up
@app.route("/login_page")
def login_page():
    session['previous_page'] = 'login'  
    return render_template("login.html")


@app.route("/signup")
def signup():
    session["previous_page"] = 'signup'  # save previous page to session
    return render_template("signup.html") 

# area when you choose sign up by google
@app.route("/process")
def process():
    authorization_url, state = flow.authorization_url()
    session["state"]= state
    return redirect(authorization_url)

# main page --> after login
@app.route("/main")
def main():
    return render_template('main.html')


# callback page when user login successfully --> get token , verify token and get user information
@app.route('/callback')
def callback():
    # exchange the authorization code for a token
    flow.fetch_token(authorization_response=request.url) # request.url --> the URL of the current request
    # check if session["state"] is equal to the state generated by flow
    if not session["state"] == request.args["state"]:
        abort(401)

    request_session = requests.Session()            # Create an session -->  sử dụng requests.Session() để lưu trữ session và duy trì trạng thái đăng nhật. 
    cached_session = CacheControl(request_session)  # Cache requests to avoid redundant API calls
    token_request = Request(session=cached_session) #Google Auth's --> create request object


    # get information
    credentials = flow.credentials
    
    user_info = id_token.verify_oauth2_token(
        id_token = credentials.id_token,
        request= token_request,  # the request object that contains information about the current request
        audience= GOOGLE_CLIENT_ID,
        clock_skew_in_seconds=10 # the time difference between server and client -> what purpose -> to avoid the error of token expiration
    )
    session['google_id'] = user_info['sub']  # sub --> subject --> unique identifier for the user
    session['email'] = user_info['email']
    session['google_name'] = user_info['name']
    # save info to database
    try:
        conn = get_db_connection()
        ex = conn.cursor()
        if session['previous_page'] == 'login':
            # check email exist or no
            ex.execute("select * from User_info where google_id = %s and email = %s", (session['google_id'], session['email']) )
            exist_user = ex.fetchone()
            if exist_user:
                # allow to access main page
                conn.close()
                return redirect(url_for("main"))
            else:
                return redirect(url_for("signup"))
        else: # for signup page
            # check if email exist
            ex.execute("select * from User_info where google_id = %s || email = %s", (session['google_id'], session['email']) )
            exist_user = ex.fetchone()
            if exist_user:
                conn.close()
                return redirect(url_for("signup"))
            else:
                # if not exist --> add new user
                ex.execute("insert into User_info(google_id, email, User_name) values(%s, %s, %s)", (session['google_id'], session['email'], session['email']))
                conn.commit()
                conn.close()
                return redirect(url_for("login_page"))  # redirect to login page
    except mysql.connector.Error as e:
        print(f"Error connection to database: {str(e)}")
        return redirect(url_for("login_page"))


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for("signup"))  

if __name__ == "__main__":
    app.run(debug=True, port=5000)



'''
conn = get_db_connection()
        ex = conn.cursor()
        # check if email exist
        ex.execute("select * from User_info where google_id = %s || email = %s", (session['google_id'], session['email']) )
        exist_user = ex.fetchone()  # get head row of command query
        if exist_user:
            # if exist 
            conn.close()
            return redirect(url_for("signup"))
        else:
            # if not exist --> add new user but previous path í login page --> redirect to signup page
            ex.execute("insert into User_info(google_id, email, User_name) values (%s, %s, %s)", (session['google_id'], session['email'], session['email']))
            conn.commit() # save changes into database
            conn.close()
            return redirect(url_for("main"))
    except mysql.connector.Error as e:
        print(f"Error connection to database: {str(e)}")
        return redirect(url_for("signup"))
        
'''