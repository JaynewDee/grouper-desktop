use super::s3::S3Client;
use aws_sdk_s3::types::AggregatedBytes;
use bytes::{Buf, Bytes};
use serde::Serialize;

///
///////////////////
/// Handles messages received from client
///////////////////
///

#[derive(Serialize)]
struct BucketDetails {
    name: String,
    created: i64,
}

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", &name)
}

#[tauri::command]
pub async fn list_buckets() -> Result<Vec<String>, ()> {
    let client = S3Client::get_client().await.unwrap();
    let res = S3Client::show_buckets(&client).await.unwrap();
    let buckets = res.buckets().unwrap();

    let mut results: Vec<String> = vec![];

    for buck in buckets {
        let details = BucketDetails {
            name: buck.name().unwrap().to_string(),
            created: buck.creation_date().unwrap().secs(),
        };
        let json = serde_json::to_string(&details).unwrap();
        results.push(json);
    }

    Ok(results)
}

#[tauri::command]
pub async fn create_bucket() -> String {
    "'Create bucket' reached!".into()
}

#[tauri::command]
pub async fn list_objects() -> String {
    let test_bucket_name = String::from("grouper-client-test-bucket");
    let client = S3Client::get_client().await.unwrap();
    let objects = S3Client::list_objects(&client, &test_bucket_name)
        .await
        .unwrap();
    println!("{:?}", objects);
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
    let stream = object.body.collect().await.unwrap().into_bytes();

    let json = String::from_utf8_lossy(&stream);
    let response = GetResponse {
        res: json.to_string(),
    };
    let serialized = serde_json::to_string(&response).unwrap();
    Ok(serialized)
}
