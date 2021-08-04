import os
from flask import Flask, render_template, redirect, url_for, request
from bson.objectid import ObjectId
from demo_cards import cards_list
from flask_pymongo import PyMongo

if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get('DATABASE')

app.config["MONGO_URI"] = os.environ.get("MONGO_URI")


app.secret_key = 'some_secret'

mongo = PyMongo(app)

app.templates = ""



# This is for your index Page!  Cool!  You should always have one of these.  It is the ('/') is the base root.
@app.route('/')
def index():
    demos = []
    for c, s in cards_list.items():
        demos.append({"name": s["name"], "link": c})
    custom_sets = mongo.db.cards.find()
    return render_template('index.html', demos=demos, custom_sets=custom_sets)

@app.route('/example/<game_id>')
def play_example(game_id):
    cards = cards_list[game_id]
    
    return render_template('game.html', cards=cards)

@app.route('/created/<game_id>')
def play_created(game_id):
    cards = mongo.db.cards.find_one({"_id": ObjectId(game_id)})
    return render_template('game.html', cards=cards)

@app.route("/create", methods=["GET", "POST"])
def create():
    cards = []
    if request.method == "POST":
        cards = request.form.getlist("imageurl[]")
        if len(cards) > 1:
            cards_in = {
                "name": request.form.get("name"),
                "deck": cards
            }
            mongo.db.cards.insert(cards_in)
    return render_template('create.html', cards=cards)

if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT', 8000)),
            debug=True)