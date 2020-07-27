import os

from flask import Flask, render_template, url_for, flash, request, redirect
from werkzeug.utils import secure_filename


app = Flask(__name__)

UPLOAD_FOLDER = '/img'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def game():
    with open('static/game.json') as file:
        return render_template('index.html',
                               script_source='static/game.js',
                               style_source='static/style.css',
                               data=file.read().replace("'", r"\'").replace("\n", ""))


@app.route('/admin', methods=['GET'])
def admin():
    return render_template('/PostBellumGame-NodeManager')

if __name__ == '__main__':
    app.run()
