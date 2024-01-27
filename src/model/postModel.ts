import mysql from "mysql2/promise";

export async function createPostModel(
  userId: number,
  post: string
): Promise<null> {
  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "cookie-assignment-pw",
      database: "cookie-assignment",
    });
    console.log("Post:", post);
    await connection.execute("INSERT INTO post (user_id, body) VALUES (?, ?)", [
      userId,
      post,
    ]);
    await connection.end();
    return null;
  } catch (error) {
    console.log("データベースエラー");
    throw new Error();
  }
}

export async function fetchAllPostModel(): Promise<Post[]> {
  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "cookie-assignment-pw",
      database: "cookie-assignment",
    });

    const [rows] = await connection.execute(
      "SELECT * FROM post ORDER BY created_at DESC"
    );
    return rows as Post[];
  } catch (error) {
    console.log("データベースエラー");
    throw new Error();
  }
}

type Post = {
  id: number;
  user_id: number;
  body: string;
  created_at: Date;
};
