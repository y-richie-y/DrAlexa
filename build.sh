#!/bin/bash
cd "$(dirname "$0")"

git pull
cd frontend
npm install
npm build-webpack
#...build webpack...
 
cd ../backend
npm start
