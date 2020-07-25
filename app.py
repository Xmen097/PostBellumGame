from flask import Flask
from flask import render_template
from flask import url_for

app = Flask(__name__)


@app.route('/')
def game():
    return render_template('index.html', script_source=url_for('static', filename='game.js'), style_source=url_for('static', filename='style.css'))


if __name__ == '__main__':
    app.run()
