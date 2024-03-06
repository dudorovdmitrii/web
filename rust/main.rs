extern crate chrono;
use std::{fs::OpenOptions, io::{BufReader, BufWriter, Read, Write}, net::{TcpListener, TcpStream}, str::FromStr, thread, time::{Duration, SystemTime}};
use chrono::offset::Utc;
use chrono::DateTime;

const TIMEOUT: u64 = 1000;
const SERVER_OWNER_MESSAGE: &str = "Сервер написан Дудоровым Д.А. М3О-310Б-21";

fn get_current_time() -> String {
    let system_time = SystemTime::now();
    let datetime: DateTime<Utc> = system_time.into();

    datetime.to_string()
}

fn update_log(key: &str, value: &str) {
    let mut str = String::from_str(key).unwrap();
    str.push_str(value);

    let mut file = OpenOptions::new()
        .write(true)
        .append(true)
        .open("log.txt")
        .unwrap();
    
    file.write(str.as_bytes()).unwrap();
}

fn main() {
    let listener = TcpListener::bind("127.0.0.1:3000").unwrap();
    update_log("\nВремя запуска сервера: ", get_current_time().as_str());

    fn handle_client(stream: TcpStream) {
        println!("A client connected");

        loop {
            let mut reader = BufReader::new(&stream);
            let mut buffer = [0; 512];
    
            reader.read( &mut buffer).expect("could not read");
            let request = String::from_utf8_lossy(&buffer);

            let mut message: String = "".to_owned();
            for item in request.chars() {
                if item != '\0' {
                    message.push(item)
                }
                else {
                    break;
                }
            }

            let mut is_empty: bool = true;
            for item in buffer {
                if item != 0 {
                    is_empty = false;
                    break;
                }
            }

            if is_empty {
                update_log("\nВремя отключения клиента от сервера: ", get_current_time().as_str());
                println!("A client disconnected");
                return;
            }

            update_log("\nВремя получения сообщения: ", get_current_time().as_str());
            update_log("\nСообщение: ", message.to_string().as_str());

            thread::sleep(Duration::from_millis(TIMEOUT));

            let mut response = message.chars().rev().collect::<String>();
            response.push_str(" ");
            response.push_str(SERVER_OWNER_MESSAGE);

            let mut writer = BufWriter::new(&stream);
            writer.write_all(response.as_bytes()).expect("could not write");
            writer.flush().expect("could not flush");

            update_log("\nВремя отправки сообщения: ", get_current_time().as_str());
            update_log("\nСообщение: ", response.to_string().as_str());

        }
    }

    for stream in listener.incoming() {
        match stream {
            Ok(_) => {
                update_log("\nВремя подсоединения клиента: ", get_current_time().as_str());
                // thread::spawn(|| {
                //     handle_client(stream.unwrap());
                // });
                handle_client(stream.unwrap());
            },
            Err(_) => println!("Ошибка подсоединения клиента!"),
        }
    }
}