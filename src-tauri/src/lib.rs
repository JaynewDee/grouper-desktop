pub mod files {

    use tempdir::TempDir;

    fn write_file() {}
    fn create_temp_dir() -> Result<TempDir, std::io::Error> {
        let new_temp = TempDir::new("grouper");
        if let Err(temp_creation_error) = new_temp {
            Err(temp_creation_error)
        } else {
            new_temp
        }
    }
}

pub mod parse {
    use serde::{Deserialize, Serialize};
    use std::{collections::BTreeMap, fs, io};

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Student {
        name: String,
        avg: f32,
        group: u16,
        email: String,
    }

    impl Student {
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
        pub fn set_group(&mut self, group: u16) {
            self.group = group;
        }
        pub fn set_email(&mut self, email: String) {
            self.email = email;
        }
    }
    impl From<Template> for Student {
        fn from(value: Template) -> Self {
            match value {
                value if (!value.name.is_empty() && !value.email.is_empty()) => Student {
                    name: value.name,
                    avg: value.avg,
                    group: value.group,
                    email: value.email,
                },
                _ => {
                    let default = Template::default();
                    Student {
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
        name: String,
        avg: f32,
        group: u16,
        email: String,
    }
    impl Default for Template {
        fn default() -> Self {
            Template {
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
