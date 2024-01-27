import mysql from "mysql2/promise";

export async function loginModel(username: string): Promise<number | null> {
  try {
    // データベース接続設定
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "cookie-assignment-pw",
      database: "cookie-assignment",
    });

    // SQLクエリの実行
    const [results]: any[] = await connection.execute(
      "SELECT id FROM user WHERE name = ?",
      [username]
    );
    console.log("results :", results);
    // データベース接続終了
    await connection.end();

    if (results.length > 0) {
      return results[0].id;
    } else {
      return null;
    }
  } catch (error) {
    console.log("データベースエラー");
    throw new Error();
  }
}
