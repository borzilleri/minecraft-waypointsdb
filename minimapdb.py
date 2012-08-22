from __future__ import with_statement
import sqlite3
from contextlib import closing
from flask import Flask, request, Response, g, json, render_template

DEBUG = True
DATABASE = 'data.db'
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

def query_db(query, args=(), one=False):
    cur = g.db.execute(query, args)
    rv = [dict((cur.description[idx][0],value)
        for idx,value in enumerate(row)) for row in cur.fetchall()]
    return (rv[0] if rv else None) if one else rv


@app.route('/')
def list_waypoints():
    return render_template('index.html')

@app.route('/api/points', methods=['GET'])
def api_points():
    points = query_db('select * from waypoints order by name')
    return Response(json.dumps(points),mimetype='application/json')

@app.route('/api/points/<pId>', methods=['GET'])
def api_point(pId):
    point = query_db('select * from waypoints where id=?', [pId], one=True)
    if point is None:
        return Response(status=404)
    else:
        return Response(json.dumps(point), mimetype='application/json')

@app.route('/api/points', methods=['POST'])
def api_create_point():
    if( request.headers['Content-Type'] != 'application/json'):
        return Response('Unsupported Media Type', status=415)

    data = request.json
    g.db.execute('insert into waypoints (name,color,x,z,y) values (?,?,?,?,?)',
        [data['name'],data['color'],data['x'],data['z'],data['y']])
    g.db.commit()

    point = query_db('select * from waypoints where rowid=last_insert_rowid()',one=True)
    return Response(json.dumps(point), mimetype='application/json')

@app.route('/api/points/<pId>', methods=['PUT'])
def api_update_point(pId):
    if( request.headers['Content-Type'] != 'application/json'):
        return Response('Unsupported Media Type', status=415)

    data = request.json
    g.db.execute('update waypoints set name=?,color=?,x=?,z=?,y=? where id=?',
            [data['name'],data['color'],data['x'],data['z'],data['y'],data['id']])
    g.db.commit()
    return Response(json.dumps(data), status=200,mimetype='application/json')

@app.route('/api/points/<pId>', methods=['DELETE'])
def api_delete_point(pId):
    g.db.execute('delete from waypoints where id=?', [pId])
    g.db.commit()
    return Response(status=200)

if __name__ == '__main__':
    app.run()

