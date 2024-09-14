import Database from "@tauri-apps/plugin-sql";

export const initDbConnection = async () => {
  return await Database.load(process.env.REACT_APP_MYSQL_CONNECTION_URI);
};
