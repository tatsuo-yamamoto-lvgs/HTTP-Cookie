// 責務：合致するSIDがあったら自動ログインさせてあげること
import { createClient } from "redis";

export async function checkSessionManager(
  sessionId: string | undefined
): Promise<string | null> {
  try {
    const client = await connectToRedis();
    const value = await client.get(String(sessionId));
    return value;
  } catch (error) {
    console.error("Error in redisPractice:", error);
    throw error;
  }
}

export async function bindSessionToAccount(
  userName: string,
  sessionId: string
): Promise<void> {
  try {
    const client = await connectToRedis();
    await client.set(sessionId, userName);
    const value = await client.get(String(sessionId));
    console.log("value:", value);
  } catch (error) {
    console.error("Error in redisPractice:", error);
    throw error;
  }
}

async function connectToRedis() {
  try {
    const client = createClient({
      url: process.env.REDIS_HOST,
    });
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();
    return client;
  } catch (error) {
    console.error("Error in redisPractice:", error);
    throw error;
  }
}
