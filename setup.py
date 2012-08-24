from setuptools import setup, find_packages

setup(
    name='waypointsdb',
    version='1',
    packages=['waypointsdb'],
    include_package_data=True,
    zip_safe=False,
    install_requires=['Flask']
)
