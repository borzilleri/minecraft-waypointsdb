from fabric.api import *

env.user = 'jonathan'
env.hosts = ['durandal.rampant.io']

def pack():
    local('python setup.py sdist --formats=gztar', capture=False)

def deploy():
    dist = local('python setup.py --fullname', capture=True).strip()
    put('dist/%s.tar.gz' % dist, '/tmp/waypointsdb.tar.gz')
    tmpDir = '/tmp/%s'%dist
    with cd('/tmp'):
        run('tar xf /tmp/waypointsdb.tar.gz')
    with cd(tmpDir):
        run('/srv/flask/waypointsdb/env/bin/python setup.py install')
    run('rm -rf %s /tmp/waypointsdb.tar.gz'%tmpDir)
    run('touch /etc/uwsgi/apps-available/waypointsdb.ini')

