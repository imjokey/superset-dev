#! /bin/sh

# git clone --depth 1 --branch 4.0.2  https://github.com/apache/superset.git
docker build -t superset-4.0.2 .
