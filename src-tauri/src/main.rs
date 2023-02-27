#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod ffi;
mod s3;

use ffi::{
    build_groups, check_connection, delete_one_file, get_file_list, get_file_s3, get_group_avgs,
    groups_from_data, list_buckets, list_objects, read_json, upload_students_s3,
};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            list_buckets,
            list_objects,
            get_file_s3,
            upload_students_s3,
            get_file_list,
            check_connection,
            read_json,
            delete_one_file,
            build_groups,
            get_group_avgs,
            groups_from_data
        ])
        .plugin(tauri_plugin_store::Builder::default().build())
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
