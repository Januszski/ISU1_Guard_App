import { initDbConnection } from "./initDbConnection";

export const getAllMessagesDb = async () => {
  const db = await initDbConnection();

  const result = await db.select("SELECT * from messages");

  return result;
};

export const deleteMessageByIdDb = async (messageId) => {
  const db = await initDbConnection();

  const result = await db.execute("DELETE FROM messages WHERE messageId = ?", [
    messageId,
  ]);

  return result;
};
