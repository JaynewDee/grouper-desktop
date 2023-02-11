extern crate tempdir;
use std::fs;
use std::io;
pub mod files {
    use tempdir::TempDir;

    fn write_file() {}
    fn main() {
        let temp = TempDir::new("grouper").unwrap();
        println!("{:?}", temp);
    }
}
