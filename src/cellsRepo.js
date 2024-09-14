import Database from "@tauri-apps/plugin-sql";

export const initDbConnection = async () => {
  return await Database.load("mysql://warden:password@localhost/iseage_test1");
};
