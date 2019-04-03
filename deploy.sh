#!/bin/bash
rm -rf server/public/*
cd client
npm run build-prod
cd ..
mv client/build/* server/public