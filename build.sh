#!/bin/bash
cd "$(dirname "$0")"

git pull
cd frontend
npm install
#...build webpack...
 
cd ../backend
node server.js