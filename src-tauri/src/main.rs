#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod ffi;
mod s3;

use ffi::{greet, list_buckets};
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, list_buckets])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
