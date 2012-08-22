from __future__ import with_statement
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, \
        abort, render_template, flash, json
from contextlib import closing

DATABASE = 'data.db'
DEBUG = True
SECRET_KEY = 'dev key'

app = Flask(__name__)
app.config.from_object(__name__)
app.config.from_envvar('MINIMAPDB_SETTINGS', silent=True)

def connect_db():
    return sqlite3.connect(app.config['DATABASE']);

def init_db():
    with closing(connect_db()) as db:
        with app.open_resource('schema.sql') as f:
            db.cursor().executescript(f.read())
        db.commit()

@app.before_request
def before_request():
    g.db = connect_db()

@app.teardown_request
def teardown_request(exception):
    g.db.close()


@app.route('/')
def list_waypoints():
    return 'home!'

@app.route('/api/points', methods=['GET'])
def api_points():
    return 'list of '+url_for('api_points')

@app.route('/api/points', methods=['POST'])
def api_create_point():
    if( request.headers['Content-Type'] != 'application/json'):
        return "415 Unsupported Media Type"

    data = request.json
    g.db.execute('insert into waypoints (name,color,x,z,y) values (?,?,?,?,?)',
        [data['name'], data['color'], data['x'], data['z'], data['y']])
    g.db.commit()

    cur = g.db.execute('select name,color,x,z,y from waypoints where rowid=last_insert_rowid()')
    out = dict(name=row[0],color=row[1],x=row[2],z=row[3],y=row[4])

    resp = Response(json.dumps(out), status=200,mimetype='application/json')
    return resp;

@app.route('/api/points/<pId>', methods=['GET'])
def api_point(pId):
    return 'waypoint: ' + pId

@app.route('/api/points/<pId>', methods=['PUT'])
def api_update_point(pId):
    return 'updating point: '+pId


if __name__ == '__main__':
    app.run()

