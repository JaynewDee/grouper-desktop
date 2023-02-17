pub mod files {
    use crate::models::Student;
    use serde::Deserialize;
    use std::io::Read;
    use std::net::TcpStream;
    use std::path::Path;
    use std::{
        env,
        fs::{create_dir, read_dir, File},
        io::Write,
    };
    //
    ////////////////////////
    // Handles os-based i/o
    ////////////////////////
    //

    #[derive(Deserialize)]
    pub struct FileHandler {
        pub temp_path: String,
    }

    impl FileHandler {
        pub fn new() -> FileHandler {
            FileHandler {
                temp_path: format!(
                    "{}grouper-data",
                    env::temp_dir().to_string_lossy().into_owned()
                ),
            }
        }

        pub fn init_base_dir(&self) -> std::io::Result<()> {
            let path = format!("{}", self.get_temp_path());
            create_dir(path)?;
            Ok(())
        }

        pub fn read_and_return_json(
            &self,
            filename: &str,
        ) -> Result<String, Box<dyn std::error::Error>> {
            let temp_path = self.get_temp_path();
            let full_path = format!("{}\\{}", &temp_path, &filename);
            println!("{}", full_path);
            let mut file = File::open(full_path).expect("Failed to read json file");
            let mut file_contents = String::new();
            file.read_to_string(&mut file_contents)
                .expect("Failed to read json file.");

            Ok(file_contents)
        }

        pub fn write_json(
            &self,
            data: Vec<Student>,
            filename: &str,
        ) -> Result<String, Box<dyn std::error::Error>> {
            if let false = self.check_for_dir() {
                println!("Creating base directory for Grouper Desktop user.");
                self.init_base_dir().unwrap();
            } else {
                println!("Base directory found. Proceeding to write file.");
            }
            let write_path = format!("{}\\{}.json", self.get_temp_path(), filename);
            let mut file = File::create(&write_path)?;

            let json = serde_json::to_string(&data)?;
            file.write_all(json.as_bytes())?;

            Ok(format!(
                "SUCCESS writing JSON to temp directory ::: @ ::: {}",
                write_path
            ))
        }

        fn get_temp_path(&self) -> String {
            format!("{}", self.temp_path.clone())
        }

        fn check_for_dir(&self) -> bool {
            let temp = &self.get_temp_path();
            let path = Path::new(temp);
            path.is_dir()
        }

        pub fn read_directory(&self) -> Result<Vec<String>, Box<dyn std::error::Error>> {
            let path = self.get_temp_path();
            let dir = read_dir(path).unwrap();

            let mut file_list: Vec<String> = Vec::new();

            for file in dir {
                let file_name = file.unwrap().file_name();
                println!("{:?}", file_name);
                file_list.push(file_name.into_string().expect("Failed to parse file name."));
            }
            Ok(file_list)
        }

        pub fn network_available() -> bool {
            match TcpStream::connect("8.8.8.8:53") {
                Ok(_) => true,
                Err(_) => false,
            }
        }

        pub fn temp_data_available(&self) -> bool {
            let path = format!("{}{}", self.get_temp_path(), "\\grouper-students.json");
            let file_path = Path::new(&path);
            if file_path.exists() {
                return true;
            } else {
                return false;
            }
        }
    }
}

pub mod models {
    use serde::{Deserialize, Serialize};
    use std::collections::BTreeMap;

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Student {
        id: u32,
        name: String,
        avg: f32,
        group: u16,
        email: String,
    }

    impl Student {
        pub fn get_id(&self) -> u32 {
            self.id.clone()
        }
        pub fn set_id(&mut self, id: u32) {
            self.id = id;
        }
        pub fn get_name(&self) -> String {
            self.name.clone()
        }
        pub fn set_name(&mut self, name: String) {
            self.name = name;
        }
        pub fn get_avg(&self) -> f32 {
            self.avg.clone()
        }
        pub fn set_avg(&mut self, avg: f32) {
            self.avg = avg;
        }
        pub fn get_group(&self) -> u16 {
            self.group.clone()
        }
        pub fn set_group(&mut self, group: u16) {
            self.group = group;
        }
        pub fn get_email(&self) -> String {
            self.email.clone()
        }
        pub fn set_email(&mut self, email: String) {
            self.email = email;
        }
        pub fn clone(&self) -> Student {
            Student {
                id: self.get_id(),
                name: self.get_name(),
                avg: self.get_avg(),
                group: self.get_group(),
                email: self.get_email(),
            }
        }
    }

    impl From<Template> for Student {
        fn from(value: Template) -> Self {
            match value {
                value if (!value.name.is_empty() && !value.email.is_empty()) => Student {
                    id: value.id,
                    name: value.name,
                    avg: value.avg,
                    group: value.group,
                    email: value.email,
                },
                _ => {
                    let default = Template::default();
                    Student {
                        id: default.id,
                        name: default.name,
                        avg: default.avg,
                        group: default.group,
                        email: default.email,
                    }
                }
            }
        }
    }

    pub struct Template {
        id: u32,
        name: String,
        avg: f32,
        group: u16,
        email: String,
    }

    impl Default for Template {
        fn default() -> Self {
            Template {
                id: 0,
                name: "".into(),
                avg: 0.0,
                group: 0,
                email: "".into(),
            }
        }
    }

    pub struct GroupsMap(BTreeMap<f32, Vec<Student>>);

    impl GroupsMap {
        pub fn new() -> GroupsMap {
            GroupsMap(BTreeMap::new())
        }
    }
}

pub mod encryption {
    // use chacha20poly1305::{
    //     aead::{rand_core::RngCore, Aead, OsRng},
    //     ChaCha20Poly1305, KeyInit, XChaCha20Poly1305,
    // };
    pub struct Cipher {}

    impl Cipher {
        fn _encrypt_file(
            &self,
            _obj_name: &str,
            _json_data: String,
        ) -> Result<Vec<u8>, Box<dyn std::error::Error>> {
            // let mut nonce = [0u8; 24];
            // OsRng.fill_bytes(&mut key);
            // OsRng.fill_bytes(&mut nonce);

            // let cipher = XChaCha20Poly1305::new();

            // let encrypted_file = cipher
            //     .encrypt(&nonce.into(), json_data.as_ref())
            //     .expect("Error during file encryption.");
            // Ok(encrypted_file)
            Ok([0].to_vec())
        }
    }
}
