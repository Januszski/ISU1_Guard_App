import { initDbConnection } from "./initDbConnection";

export const lockCellDb = async (cellId) => {
  const db = await initDbConnection();

  await db.execute("UPDATE cells SET opened = ? WHERE id = ?", [0, cellId]);
};

export const unlockCellDb = async (cellId) => {
  const db = await initDbConnection();

  await db.execute("UPDATE cells SET opened = ? WHERE id = ?", [1, cellId]);
};

export const getAllCellsDb = async () => {
  const db = await initDbConnection();

  const result = await db.select("SELECT * from cells");

  return result;
};

export const getCellNameFromCellIdDb = async (cellId) => {
  const db = await initDbConnection();

  const result = await db.select("SELECT cell_number FROM cells WHERE id = ?", [
    cellId,
  ]);

  return result;
};

export const getCellIdFromCellNameDb = async (cellName) => {
  const db = await initDbConnection();

  const result = await db.select("SELECT id FROM cells WHERE cell_number = ?", [
    cellName,
  ]);

  return result;
};

export const getCellNameFromPrisonerIdDb = async (prisonerId) => {
  const db = await initDbConnection();

  const result = await db.select(
    "SELECT c.cell_number FROM cells c JOIN prisoner_cells pc ON c.id = pc.cell_id WHERE pc.prisoner_id = ?",
    [prisonerId]
  );

  return result;
};

export const movePrisonerInCellDb = async (cellId, prisonerId) => {
  const db = await initDbConnection();

  const result = await db.execute(
    "UPDATE prisoner_cells SET cell_id = ? WHERE prisoner_id = ?",
    [cellId, prisonerId]
  );

  return result;
};
