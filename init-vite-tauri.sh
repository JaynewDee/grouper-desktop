#!/bin/bash

yarn create vite &&
cd src
npm i
npm i @types/node
cd ../

cargo create-tauri-app src-tauri -- --template react-ts

cd src-tauri
cargo tauri dev &
cd ../src
npm start