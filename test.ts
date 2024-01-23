import { createClient } from "redis";

async function redisPractice() {
  try {
    const client = createClient({
      url: "redis://127.0.0.1:6379",
    });

    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();

    await client.set("ラーメン", "二郎");
    const value = await client.get("ラーメン");
    console.log(value);
  } catch (error) {
    console.error("Error in redisPractice:", error); // エラーの内容を出力
    throw error; // エラーを再スローする場合は、受け取ったエラーをそのまま使用
  }
}

redisPractice();
