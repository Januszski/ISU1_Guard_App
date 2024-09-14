import { initDbConnection } from "./initDbConnection";

export const getAllPrisonsersDb = async () => {
  const db = await initDbConnection();

  const result = await db.select("SELECT * from prisoners");

  // db.close();

  return result;
};

export const getPrisonerDb = async (prisonerId) => {
  const db = await initDbConnection();

  const result = await db.select("SELECT * FROM prisoners WHERE id = ?", [
    prisonerId,
  ]);
  // db.close();

  return result;
};

export const getPrisonersFromCellIdDb = async (cellId) => {
  const db = await initDbConnection();

  const result = await db.select(
    "SELECT prisoners.* FROM prisoners JOIN prisoner_cells ON prisoners.id = prisoner_cells.prisoner_id WHERE prisoner_cells.cell_id = ?",
    [cellId]
  );

  // db.close();

  return result;
};

export const updatePrisonerNotesDb = async (prisonerId, notes) => {
  const db = await initDbConnection();

  const result = await db.execute(
    "UPDATE prisoners SET notes = ? WHERE id = ?",
    [notes, prisonerId]
  );

  return result;
};
