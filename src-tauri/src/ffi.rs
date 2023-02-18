use super::s3::S3Client;
use serde::Serialize;

use csv::{Error, ReaderBuilder, StringRecord};
use src_tauri::{
    files::FileHandler,
    grouper::{GroupsMap, Utils},
    models::{Student, StudentBuilder},
};
use std::io::Cursor;

///
/////////////////////////////
/// Foreign Function API
/// Handles messages received
/// from TypeScript client
/////////////////////////////
///

#[derive(Serialize, Debug)]
struct BucketDetails {
    name: String,
    created: i64,
}

#[tauri::command]
pub async fn list_buckets() -> Result<Vec<String>, ()> {
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

#[tauri::command]
pub async fn list_objects() -> Result<Vec<String>, ()> {
    let test_bucket_name = "grouper-client-test-bucket";
    let client = S3Client::get_client().await.unwrap();
    let objects = S3Client::list_objects(&client, &test_bucket_name)
        .await
        .unwrap();

    Ok(objects)
}

#[tauri::command]
pub async fn get_file_list() -> Result<Vec<String>, ()> {
    let handler = FileHandler::new();
    let file_list = handler
        .read_directory()
        .expect("Error retrieving file list");
    Ok(file_list)
}

#[tauri::command]
pub fn read_json(obj_name: &str) -> Result<String, ()> {
    println!("{}", obj_name);
    let handler = FileHandler::new();
    let json = handler.read_and_return_json(obj_name).unwrap();
    Ok(json)
}

#[tauri::command]
pub async fn check_connection() -> Result<bool, ()> {
    let has_connection = FileHandler::network_available();
    Ok(has_connection)
}

#[tauri::command]
pub fn delete_one_file(obj_name: &str) -> Result<String, ()> {
    let result_string = FileHandler::new().delete_file(obj_name).unwrap();
    Ok(result_string)
}

#[tauri::command]
pub async fn build_groups(obj_name: &str, group_size: u16) -> Result<String, ()> {
    let handler = FileHandler::new();
    let students = handler
        .read_and_return_students(obj_name)
        .expect("Failed to parse students from json ... ");

    let groups_map = GroupsMap::new(students.len() as u16, group_size);
    let sorted = Utils::sort_students(&students);
    let num_groups = Utils::num_groups(sorted.len() as u16, group_size);
    //
    let assigned = Utils::random_assignment(1, sorted, groups_map, num_groups);
    let avgs = Utils::group_avgs_map(assigned);
    for avg in avgs.iter() {
        println!("{:?}", avg);
    }
    //
    // Call grouper module
    // - parse file
    // - create groups by size
    //

    Ok("OK!".into())
}

//

//

fn read_record(idx: usize, row: Result<StringRecord, Error>) -> Student {
    let r = row.expect("Unable to parse string record");

    fn parse_avg(r: StringRecord) -> f32 {
        match r.get(42).unwrap().parse::<f32>() {
            Ok(val) => val,
            Err(_) => 0.0 as f32,
        }
    }

    StudentBuilder::new()
        .id(idx as u32)
        .name(r.get(0).unwrap().to_string())
        .email(r.get(2).unwrap().to_string())
        .avg(parse_avg(r))
        .group(0)
        .build()
}

//

//

#[tauri::command]
pub async fn get_file_s3(obj_name: &str) -> Result<String, ()> {
    let test_bucket_name = "grouper-client-test-bucket";
    let client = S3Client::get_client().await.unwrap();

    let object = S3Client::download_object(&client, &test_bucket_name, obj_name)
        .await
        .unwrap();
    let body = object.body.collect().await.unwrap();
    let stream = body.into_bytes();
    let cursor = Cursor::new(stream);

    let mut reader = ReaderBuilder::new().has_headers(true).from_reader(cursor);

    let mut serializable: Vec<Student> = Vec::new();

    for (idx, row) in reader.records().enumerate() {
        let student = read_record(idx, row);
        if student.avg > 0.0 {
            serializable.push(student);
        }
    }

    let json = serde_json::to_string(&serializable).unwrap();

    Ok(json)
}

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
        let student = read_record(idx, row);
        if student.avg > 0.0 {
            serializable.push(student);
        }
    }

    let client = S3Client::get_client().await.unwrap();

    let test_bucket_name = "grouper-client-test-bucket";
    let json_string = serde_json::to_string(&serializable).unwrap();
    if logged_in {
        S3Client::upload_object(&client, &test_bucket_name, &json_string, obj_name)
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
