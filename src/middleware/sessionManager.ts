// 責務：合致するSIDがあったら自動ログインさせてあげること
import { error } from "console";
import { createClient } from "redis";

export async function checkSessionManager(
  sessionId: string | undefined
): Promise<number | null> {
  const userId = await checkSessionManagerModel(String(sessionId));
  return userId;
}
export async function bindSessionToAccount(
  userId: number,
  sessionId: string
): Promise<void> {
  try {
    const client = createClient({
      url: "redis://127.0.0.1:6379",
    });
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();
    await client.set(sessionId, userId);
    const value = await client.get(String(sessionId));
    console.log("value:", value);
  } catch (error) {
    console.error("Error in redisPractice:", error);
    throw error;
  }
}

async function checkSessionManagerModel(
  sessionId: string
): Promise<number | null> {
  try {
    const client = createClient({
      url: "redis://127.0.0.1:6379",
    });
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();
    const value = await client.get(String(sessionId));
    return value !== null ? Number(value) : null;
  } catch (error) {
    console.error("Error in redisPractice:", error);
    throw error;
  }
}
