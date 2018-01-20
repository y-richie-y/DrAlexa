#!/bin/bash
cd "$(dirname "$0")"

git pull

cd backend
npm start