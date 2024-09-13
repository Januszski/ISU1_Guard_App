// src/dbSetup.js
import Database from "@tauri-apps/plugin-sql";

export async function setupDatabase() {
  console.log("CALLED HERE");
  try {
    const db = await Database.load(
      "mysql://warden:password@localhost/iseage_test1"
    );

    await db.execute(`
      CREATE TABLE IF NOT EXISTS prisoners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        sentence_start DATE NOT NULL,
        sentence_end DATE NOT NULL,
        crime VARCHAR(255),
        notes TEXT
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS cells (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cell_number VARCHAR(50) UNIQUE NOT NULL,
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS prisoner_cells (
        prisoner_id INT,
        cell_id INT,
        FOREIGN KEY (prisoner_id) REFERENCES prisoners(id) ON DELETE CASCADE,
        FOREIGN KEY (cell_id) REFERENCES cells(id) ON DELETE CASCADE,
        PRIMARY KEY (prisoner_id, cell_id)
      );
    `);

    console.log("Database schema created successfully.");
  } catch (error) {
    console.error("Error setting up database:", error);
  }
}
