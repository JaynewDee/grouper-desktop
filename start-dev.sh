#!/bin/bash

cd src
npm run dev &
cd ../src-tauri
cargo tauri dev
