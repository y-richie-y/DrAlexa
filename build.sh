#!/bin/bash
cd "$(dirname "$0")"

git pull
cd frontend
npm install
node node_modules/webpack/bin/webpack.js --config webpack.config.js

cd ..
cp frontend/bin/bundle.js backend/static/
