use csv::ReaderBuilder;
use serde::Serialize;
use std::io::Cursor;

use super::s3::S3Client;
use src_tauri::{files::FileHandler, grouper::Utils, models::Student};

use std::time::Instant;

///
/////////////////////////////
/// Foreign Function API
/// Handles messages received
/// from TypeScript client
/////////////////////////////
///

// READ DIR FOR FILE LIST
#[tauri::command]
pub async fn get_file_list() -> Result<Vec<String>, ()> {
    let handler = FileHandler::new();
    let file_list = handler
        .read_directory()
        .expect("Error retrieving file list");
    Ok(file_list)
}

// RETURN JSON FROM FILE
#[tauri::command]
pub fn read_json(obj_name: &str) -> Result<String, ()> {
    let handler = FileHandler::new();
    let json = handler.read_and_return_json(obj_name).unwrap();
    Ok(json)
}

#[tauri::command]
pub async fn check_connection() -> Result<bool, ()> {
    let has_connection = FileHandler::network_available();
    Ok(has_connection)
}

// DELETE A FILE/CLASS
#[tauri::command]
pub fn delete_one_file(obj_name: &str) -> Result<String, String> {
    match FileHandler::new().delete_file(obj_name) {
        Ok(res) => Ok(res),
        Err(e) => Err(format!("Encountered an error while deleting file: {}", e)),
    }
}

// RETURN AVERAGES AS MAP
#[tauri::command]
pub async fn get_group_avgs(groups_json: String) -> Result<String, ()> {
    let group_avgs =
        Utils::send_group_avgs(groups_json).expect("Encountered an error building GroupAvgs ...");

    Ok(group_avgs)
}

// BUILD GROUPS
#[tauri::command]
pub async fn build_groups(obj_name: &str, group_size: u16) -> Result<Vec<String>, ()> {
    let test_sd = 2_f32;
    let handler = FileHandler::new();

    let students = handler
        .read_and_return_students(obj_name)
        .expect("Failed to parse students from json ... ");

    let students_json = handler
        .read_and_return_json(obj_name)
        .expect("Failed to parse file into json ...");

    let now = Instant::now();

    let balanced = Utils::balancer_pool(students, group_size, 10000, test_sd)
        .lock()
        .unwrap()
        .to_owned();

    let elapsed = now.elapsed();

    println!("Elapsed: {:.2?}", elapsed);

    let groups_json =
        Utils::treemap_to_json(balanced).expect("Failed to parse json from groups map ... ");
    // - Use groups_json to assign group field to each student
    // - Send new students_json for single source of truth

    Ok(vec![students_json, groups_json])
}

// BUILD GROUPS FROM JSON
#[tauri::command]
pub async fn groups_from_data(students_json: String, group_size: u16) -> Result<String, ()> {
    let test_sd = 2_f32;

    let students = Utils::students_from_json(&students_json)
        .expect("Failed to parse students vector from json ... ");

    let balanced = Utils::balancer_pool(students, group_size, 500, test_sd)
        .lock()
        .unwrap()
        .to_owned();

    let groups_json =
        Utils::treemap_to_json(balanced).expect("Failed to parse json from treemap ... ");
    Ok(groups_json)
}

///
/////
///

/* NEW COMMAND HERE */

///
/////
///

///
/////
///

/* NEW COMMAND HERE */

///
/////
///

///
/////
///

/* NEW COMMAND HERE */

///
/////
///

/*
///////////
----------
    S3
----------
///////////
*/
// LIST S3 BUCKETS
#[tauri::command]
pub async fn list_buckets() -> Result<Vec<String>, ()> {
    #[derive(Serialize, Debug)]
    struct BucketDetails {
        name: String,
        created: i64,
    }
    let client = S3Client::get_client().await.unwrap();
    let res = S3Client::show_buckets(&client).await.unwrap();
    let buckets = res.buckets().unwrap();

    let buckets_serialized: Vec<String> = buckets
        .iter()
        .map(|b| {
            let details = BucketDetails {
                name: b.name().unwrap().to_string(),
                created: b.creation_date().unwrap().secs(),
            };
            serde_json::to_string(&details).unwrap()
        })
        .collect();

    Ok(buckets_serialized)
}

// LIST S3 FILES
#[tauri::command]
pub async fn list_objects() -> Result<Vec<String>, ()> {
    let test_bucket_name = "grouper-client-test-bucket";
    let client = S3Client::get_client().await.unwrap();
    let objects = S3Client::list_objects(&client, test_bucket_name)
        .await
        .unwrap();

    Ok(objects)
}

// GET FILE FROM S3
#[tauri::command]
pub async fn get_file_s3(obj_name: &str) -> Result<String, ()> {
    let test_bucket_name = "grouper-client-test-bucket";
    let client = S3Client::get_client().await.unwrap();

    let object = S3Client::download_object(&client, test_bucket_name, obj_name)
        .await
        .unwrap();
    let body = object.body.collect().await.unwrap();
    let stream = body.into_bytes();
    let cursor = Cursor::new(stream);

    let mut reader = ReaderBuilder::new().has_headers(true).from_reader(cursor);

    let mut serializable: Vec<Student> = Vec::new();

    for (idx, row) in reader.records().enumerate() {
        let student = FileHandler::student_from_record(idx, row);
        if student.avg > 0.0 {
            serializable.push(student);
        }
    }

    let json = serde_json::to_string(&serializable).unwrap();

    Ok(json)
}

// UPLOAD STUDENTS TO S3
#[tauri::command]
pub async fn upload_students_s3(
    csv_as_json: &str,
    obj_name: &str,
    logged_in: bool,
) -> Result<String, ()> {
    let handler = FileHandler::new();
    let stream = csv_as_json.as_bytes();

    let cursor = Cursor::new(stream);

    let mut reader = ReaderBuilder::new().has_headers(true).from_reader(cursor);

    let mut serializable: Vec<Student> = Vec::new();

    for (idx, row) in reader.records().enumerate() {
        let student = FileHandler::student_from_record(idx, row);
        if student.avg > 0.0 {
            serializable.push(student);
        }
    }

    let client = S3Client::get_client().await.unwrap();

    let test_bucket_name = "grouper-client-test-bucket";
    let json_string = serde_json::to_string(&serializable).unwrap();
    if logged_in {
        S3Client::upload_object(&client, test_bucket_name, &json_string, obj_name)
            .await
            .expect("Error uploading object to S3.");
    }

    handler
        .write_json(serializable, obj_name)
        .expect("Failure writing json to temp directory.");

    let filename: String = format!("{}.json", obj_name);
    let json = read_json(&filename).expect("Failed to read json file.");
    Ok(json)
}
