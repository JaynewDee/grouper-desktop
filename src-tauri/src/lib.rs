pub mod files {

    use serde::Deserialize;
    use std::{collections::BTreeMap, env, fs::File, io::Write};
    use tempdir::TempDir;

    use crate::parse::Student;

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
        pub fn write_json(&self, data: Vec<Student>) -> Result<(), Box<dyn std::error::Error>> {
            let write_path = format!("{}{}", self.get_temp(), "grouper-students.json");
            println!("{:?}", write_path);
            let mut file = File::create(&write_path)?;
            let json = serde_json::to_string(&data)?;
            file.write_all(json.as_bytes())?;

            Ok(())
        }
        pub fn get_temp(&self) -> String {
            self.temp_path.clone()
        }
    }
}

pub mod parse {
    use serde::{Deserialize, Serialize};

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

    pub fn assign_groups(students: &Vec<Student>) {
        for student in students.iter() {
            println!("{:?}", student);
        }
    }
}
