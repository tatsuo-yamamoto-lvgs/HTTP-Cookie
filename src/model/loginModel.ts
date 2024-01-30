import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
export async function loginModel(username: string): Promise<string | null> {
  try {
    // データベース接続設定
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    // SQLクエリの実行
    const [results]: any[] = await connection.execute(
      "SELECT name FROM user WHERE name = ?",
      [username]
    );
    console.log("results :", results);
    // データベース接続終了
    await connection.end();

    if (results.length > 0) {
      return results[0].name;
    } else {
      return null;
    }
  } catch (error) {
    console.log("データベースエラー");
    throw new Error();
  }
}
