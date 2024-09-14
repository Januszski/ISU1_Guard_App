import { initDbConnection } from "./initDbConnection";

export const lockCellDb = async (cellId) => {
  const db = await initDbConnection();

  await db.execute("UPDATE cells SET opened = ? WHERE id = ?", [0, cellId]);

  // db.close();
};

export const unlockCellDb = async (cellId) => {
  const db = await initDbConnection();

  await db.execute("UPDATE cells SET opened = ? WHERE id = ?", [1, cellId]);

  // db.close();
};

export const getAllCellsDb = async () => {
  const db = await initDbConnection();

  const result = await db.select("SELECT * from cells");

  // db.close();

  return result;
};

export const getCellNameFromCellIdDb = async (cellId) => {
  const db = await initDbConnection();

  const result = await db.select("SELECT cell_number FROM cells WHERE id = ?", [
    cellId,
  ]);

  // db.close();

  return result;
};

export const getCellIdFromCellNameDb = async (cellName) => {
  const db = await initDbConnection();

  const result = await db.select("SELECT id FROM cells WHERE cell_number = ?", [
    cellName,
  ]);

  // db.close();

  return result;
};

export const getCellNameFromPrisonerIdDb = async (prisonerId) => {
  const db = await initDbConnection();

  const result = await db.select(
    "SELECT c.cell_number FROM cells c JOIN prisoner_cells pc ON c.id = pc.cell_id WHERE pc.prisoner_id = ?",
    [prisonerId]
  );

  // db.close();

  return result;
};

export const movePrisonerInCellDb = async (cellId, prisonerId) => {
  const db = await initDbConnection();

  const result = await db.execute(
    "UPDATE prisoner_cells SET cell_id = ? WHERE prisoner_id = ?",
    [cellId, prisonerId]
  );

  // db.close();

  return result;
};
