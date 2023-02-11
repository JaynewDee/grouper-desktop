use aws_config::meta::region::RegionProviderChain;
use aws_sdk_s3::{
    error::{CreateBucketError, DeleteBucketError, GetBucketLocationError, ListBucketsError},
    model::{Bucket, BucketLocationConstraint, CreateBucketConfiguration},
    output::{CreateBucketOutput, ListBucketsOutput},
    types::SdkError,
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
    pub async fn create_bucket(
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

    pub async fn delete_bucket(
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
}
