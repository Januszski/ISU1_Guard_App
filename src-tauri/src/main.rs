// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use ldap3::{LdapConn, Scope, SearchEntry};
use tauri::Manager;

#[tauri::command]
fn authenticate_ad(username: String, password: String) -> Result<String, String> {
    let ldap_url = "ldap://localhost:389"; // Update with your AD server URL
                                           // let user_dn = format!("CN={},CN=Users,DC=your-domain,DC=com", username); // Update with your AD structure
    let user_dn = format!("uid={},ou=users,dc=example,dc=com", username); // Matches your successful command

    log::info!("Attempting to connect to LDAP server at: {}", ldap_url);
    log::info!("Using DN: {}", user_dn);
    // Attempt to connect to the LDAP server
    // let mut ldap =
    //     LdapConn::new(ldap_url).map_err(|e| format!("Failed to connect to LDAP: {}", e))?;

    let mut ldap = match LdapConn::new(ldap_url) {
      Ok(conn) => {
        log::info!("Successfully connected to LDAP server.");
          conn
      }
      Err(e) => {
        log::info!("Failed to connect to LDAP: {}", e);
          return Err(format!("Failed to connect to LDAP: {}", e));
      }
  };
        

  log::info!("Attempting to bind with username: {} and password: {}", username, password);

    // Attempt to bind the user with the given credentials
    ldap.simple_bind(&user_dn, &password)
        .map_err(|e| format!("Authentication failed: {}", e))?
        .success()
        .map_err(|e| format!("Bind failed: {}", e))?;

    Ok("Authentication successful".to_string())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new().level(log::LevelFilter::Info)
        .build())
        .plugin(tauri_plugin_sql::Builder::new().build())
        .invoke_handler(tauri::generate_handler![authenticate_ad]) // Register the command
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// #[tauri::command]
// fn greet(name: &str) -> String {
//    format!("Test, {}!", name)
// }

// fn main() {
//   tauri::Builder::default()
//     .run(tauri::generate_context!())
//     .expect("error while running tauri application");
// }
