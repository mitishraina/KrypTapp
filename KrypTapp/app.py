from flask import Flask, render_template, redirect, url_for, session, request, jsonify
from authlib.integrations.flask_client import OAuth
import logging

app = Flask(__name__)
app.secret_key = 'w\xb0\xbe\x83\xf4\xaf\xdb0\x88\xafG\x14\xb5\xce\x16\xcf\xe9t\xd0\xd9\rZ\xf5'  

# OAuth setup for Google
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id='137786768483-60dvf3d44e4auf5kgiqmr5topf4bdvq6.apps.googleusercontent.com',
    client_secret='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',
    access_token_url='https://oauth2.googleapis.com/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    client_kwargs={'scope': 'openid profile email'},
    redirect_uri='http://127.0.0.1:5000/auth/callback'
)

@app.route('/')
def main():
    return render_template('main.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/login')
def login():
    return render_template('login.html') 

@app.route('/login/google')
def login_google():
    redirect_uri = url_for('auth_callback', _external=True)
    return google.authorize_redirect(redirect_uri)

# Handle Google OAuth callback
@app.route('/auth/callback')
def auth_callback():
    try:
        token = google.authorize_access_token()
        logging.info("Token received: %s", token)
        resp = google.get('userinfo')
        user_info = resp.json()
        logging.info("User info: %s", user_info)
        session['user'] = user_info
        return redirect(url_for('main'))
    except Exception as e:
        logging.error("Error during authorization: %s", e)
        return redirect(url_for('main'))

@app.route('/login/metamask', methods=['POST'])
def login_metamask():
    data = request.json
    address = data.get('address')
    if address:  
        session['user'] = {'address': address}
        return jsonify(success=True)
    return jsonify(success=False), 400

@app.route('/logout')
def logout():
    session.clear()  
    return redirect(url_for('register')) 
    

if __name__ == '__main__':
    app.run(debug=True)
