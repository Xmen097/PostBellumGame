import os

from flask import Flask, render_template, url_for, flash, request, redirect
from werkzeug.utils import secure_filename


app = Flask(__name__)
app.secret_key = 'Ur mom gay'

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = 'static/img'


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


@app.route('/admin', methods=['GET', 'POST'])
def admin():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            print('No file part')
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], request.values['id']))  # saving files without extension to avoid duplicates. Browser will figure out the correct type.
            print('Upload successful')
    return app.send_static_file('PostBellumGame-NodeManager/index.html')


@app.route('/admin/save', methods=['POST'])
def save():
    file = open(os.path.join('static', "game.json"), "w")
    file.write(request.values['data'])
    file.close()
    print("JSON saved")
    return ""


if __name__ == '__main__':
    app.run()
