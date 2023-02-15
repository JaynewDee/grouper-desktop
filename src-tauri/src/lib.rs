pub mod files {
    use serde::Deserialize;
    use std::net::TcpStream;
    use std::path::Path;
    use std::{env, fs::File, io::Write};

    use crate::parse::Student;

    //
    ////////////////////////
    // Handles os-based i/o
    ////////////////////////
    //

    #[derive(Deserialize)]
    pub struct FileHandler {
        temp_path: String,
    }

    impl FileHandler {
        pub fn new() -> FileHandler {
            FileHandler {
                temp_path: env::temp_dir().to_string_lossy().into_owned(),
            }
        }

        pub fn write_json(&self, data: Vec<Student>) -> Result<String, Box<dyn std::error::Error>> {
            let write_path = format!("{}{}", self.get_temp_path(), "grouper-students.json");
            let mut file = File::create(&write_path)?;

            let json = serde_json::to_string(&data)?;
            file.write_all(json.as_bytes())?;

            Ok(format!(
                "SUCCESS writing JSON to temp directory ::: @ ::: {}",
                write_path
            ))
        }

        fn get_temp_path(&self) -> String {
            self.temp_path.clone()
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

pub mod parse {
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
