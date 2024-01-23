// 責務：合致するSIDがあったら自動ログインさせてあげること
import { error } from "console";
import { createClient } from "redis";

export async function checkSessionManager(
  sessionId: string | undefined
): Promise<string | null> {
  const userName = await checkSessionManagerModel(String(sessionId));
  return userName;
}
export async function bindSessionToAccount(
  userName: string,
  sessionId: string
): Promise<void> {
  try {
    const client = createClient({
      url: "redis://127.0.0.1:6379",
    });
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();
    await client.set(sessionId, userName);
    const value = await client.get(String(sessionId));
    console.log("value:", value);
  } catch (error) {
    console.error("Error in redisPractice:", error);
    throw error;
  }
}

async function checkSessionManagerModel(
  sessionId: string
): Promise<string | null> {
  try {
    const client = createClient({
      url: "redis://127.0.0.1:6379",
    });
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();
    const value = await client.get(String(sessionId));
    return value;
  } catch (error) {
    console.error("Error in redisPractice:", error);
    throw error;
  }
}
