use super::s3::S3Client;
use serde::Serialize;

use csv::ReaderBuilder;
use src_tauri::files::FileHandler;
use src_tauri::parse::{assign_groups, Student, Template};
use std::io::Cursor;

///
///////////////////
/// Handles messages received from client
///////////////////
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
pub async fn create_bucket() -> String {
    "'Create bucket' reached!".into()
}

#[tauri::command]
pub async fn list_objects() -> String {
    let test_bucket_name = String::from("grouper-client-test-bucket");
    let client = S3Client::get_client().await.unwrap();
    let _objects = S3Client::list_objects(&client, &test_bucket_name)
        .await
        .unwrap();
    // .contents();

    "'List object' reached!".into()
}

#[derive(Debug, Serialize)]
pub struct GetResponse {
    res: String,
}

#[tauri::command]
pub async fn get_object() -> Result<String, ()> {
    let test_bucket_name = String::from("grouper-client-test-bucket");
    let client = S3Client::get_client().await.unwrap();

    let object = S3Client::download_object(&client, &test_bucket_name, "test-bcs.csv")
        .await
        .unwrap();
    let body = object.body.collect().await.unwrap();
    let stream = body.into_bytes();
    let cursor = Cursor::new(stream);

    let mut reader = ReaderBuilder::new().has_headers(true).from_reader(cursor);

    let mut collection: Vec<Student> = Vec::new();
    let mut serializable: Vec<Student> = Vec::new();

    for (idx, row) in reader.records().enumerate() {
        let r = row.expect("Unable to parse string record");
        let mut student = Student::from(Template::default());
        match r.get(42).unwrap().parse::<f32>() {
            Ok(float) => student.set_avg(float),
            Err(_) => student.set_avg(0.0),
        }
        student.set_id(idx as u32);
        student.set_email(r.get(2).unwrap().to_string());
        student.set_name(r.get(0).unwrap().to_string());

        if student.get_avg() > 0.0 {
            collection.push(student.clone());
            serializable.push(student.clone());
        }
    }
    let handler = FileHandler::new();
    handler.write_json(collection).unwrap();
    // let _grouped = assign_groups(&collection);
    let json = serde_json::to_string(&serializable).unwrap();
    Ok(json)
}
