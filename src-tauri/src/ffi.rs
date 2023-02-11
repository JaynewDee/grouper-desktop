use super::s3::S3Client;
use serde::Serialize;

///
///////////////////
/// Handles messages received from client
///////////////////
///

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", &name)
}
#[derive(Serialize)]
struct BucketDetails {
    name: String,
    created: i64,
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
        println!(
            "{:?}\n{:?}",
            buck.name().unwrap(),
            buck.creation_date().unwrap().secs()
        );
    }
    Ok(results)
}
