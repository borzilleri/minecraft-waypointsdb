from fabric.api import *

env.user = 'jonathan'
env.hosts = ['durandal.rampant.io']

def pack():
    local('python setup.py sdist --formats=gztar', capture=False)

def deploy():
    dist = local('python setup.py --fullname', capture=True).strip()
    put('dist/%s.tar.gz' % dist, '/tmp/waypointsdb.tar.gz')
    run('mkdir /tmp/waypointsdb')
    with cd('/tmp/waypointsdb'):
        run('tar xf /tmp/waypointsdb.tar.gz')
        run('/srv/flask/waypointsdb/env/bin/python setup.py install')
    run('rm -rf /tmp/waypointsdb /tmp/waypointsdb.tar.gz')
    run('touch /srv/flask/waypointsdb/waypointsdb.wsgi')

