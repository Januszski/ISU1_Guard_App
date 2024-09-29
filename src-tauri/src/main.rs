// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use ldap3::{LdapConn, Scope, SearchEntry};
use tauri::Manager;

#[tauri::command]
fn authenticate_ad(username: String, password: String) -> Result<String, String> {
    let ldap_url = "ldap://<LDAP_IP_ADDR>"; 
                                           
    let user_dn = format!("{}@team40.isucdc.com",username);

    log::info!("Attempting to connect to LDAP server at: {}", ldap_url);
    log::info!("Using DN: {}", user_dn);

   

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

    if username.to_lowercase() != "chalice.maurice" && username.to_lowercase() != "jess.cybill" {
        return Err("User is not a warden".to_string())
    }

    log::info!(
        "Attempting to bind with username: {} and password: {}",
        username,
        password
    );

    // Attempt to bind the user with the given credentials
    ldap.simple_bind(&user_dn, &password)
        .map_err(|e| format!("Authentication failed: {}", e))?
        .success()
        .map_err(|e| format!("Bind failed: {}", e))?;

    Ok("Authentication successful".to_string())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(
            tauri_plugin_log::Builder::new()
                .level(log::LevelFilter::Info)
                .build(),
        )
        .plugin(tauri_plugin_sql::Builder::new().build())
        .invoke_handler(tauri::generate_handler![authenticate_ad]) 
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

