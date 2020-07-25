from flask import Flask
from flask import render_template
from flask import url_for
from flask import current_app

app = Flask(__name__)


@app.route('/')
def game():
    with open('static/game.json') as file:
        return render_template('index.html',
                               script_source=url_for('static', filename='game.js'),
                               style_source=url_for('static', filename='style.css'),
                               data=file.read().replace("'", r"\'").replace("\n", ""))


if __name__ == '__main__':
    app.run()
