use aws_smithy_http::body::SdkBody;

use aws_config::meta::region::RegionProviderChain;
use aws_sdk_s3::{
    error::{
        CreateBucketError, DeleteBucketError, GetBucketLocationError, GetObjectError,
        ListObjectsError, PutObjectError,
    },
    model::CreateBucketConfiguration,
    output::{CreateBucketOutput, GetObjectOutput, ListBucketsOutput, PutObjectOutput},
    types::{ByteStream, SdkError},
    Client,
};

pub struct S3Client {}

impl S3Client {
    pub async fn get_client() -> Result<Client, ()> {
        let region_provider = RegionProviderChain::default_provider().or_else("us-east-2");
        let config = aws_config::from_env().region(region_provider).load().await;

        let client = Client::new(&config);

        Ok(client)
    }
    pub async fn _create_bucket(
        client: &Client,
        bucket_name: &str,
    ) -> Result<CreateBucketOutput, SdkError<CreateBucketError>> {
        let cfg = CreateBucketConfiguration::builder().build();
        client
            .create_bucket()
            .create_bucket_configuration(cfg)
            .bucket(bucket_name)
            .send()
            .await
    }

    pub async fn _delete_bucket(
        client: &Client,
        bucket_name: &str,
    ) -> Result<(), SdkError<DeleteBucketError>> {
        client.delete_bucket().bucket(bucket_name).send().await?;
        println!("Bucket deleted");
        Ok(())
    }

    pub async fn show_buckets(
        client: &Client,
    ) -> Result<ListBucketsOutput, SdkError<GetBucketLocationError>> {
        let resp = client.list_buckets().send().await.unwrap();
        Ok(resp)
    }

    pub async fn list_objects(
        client: &Client,
        bucket_name: &str,
    ) -> Result<Vec<String>, ListObjectsError> {
        let objects = client
            .list_objects_v2()
            .bucket(bucket_name)
            .send()
            .await
            .unwrap();
        println!("Objects in bucket:");
        let mut keys: Vec<String> = vec![];
        for obj in objects.contents().unwrap_or_default() {
            println!("{:?}", obj.key().unwrap());
            keys.push(obj.key().unwrap().to_owned())
        }

        Ok(keys)
    }

    pub async fn download_object(
        client: &Client,
        bucket_name: &str,
        key: &str,
    ) -> Result<GetObjectOutput, SdkError<GetObjectError>> {
        client
            .get_object()
            .bucket(bucket_name)
            .key(key)
            .response_content_type("text/csv")
            .send()
            .await
    }

    pub async fn upload_object(
        client: &Client,
        bucket_name: &str,
        json_string: &str,
        obj_name: &str,
    ) -> Result<PutObjectOutput, SdkError<PutObjectError>> {
        let stream = ByteStream::new(SdkBody::from(json_string));
        client
            .put_object()
            .bucket(bucket_name)
            .key(obj_name)
            .body(stream)
            .send()
            .await
    }
}
