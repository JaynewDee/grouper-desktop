#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod ffi;
mod s3;

use ffi::{create_bucket, get_object, greet, list_buckets, list_objects};
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            list_buckets,
            create_bucket,
            list_objects,
            get_object
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// New client api command:
//////////////////////////
// - Write any sdk-handler implementations in respective modules
// - Define with tauri::command in ffi, accessing handers from sdk impl
// - Import here to main
// - add to handlers array in Builder sequence
// On client:
// - add api command to app/api/index.ts
// - create an event activator in components/Test.tsx
// - log to console or display inside component
