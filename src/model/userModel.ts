import mysql from "mysql2/promise";

export async function getUserNameModel(userId: number): Promise<string> {
  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "cookie-assignment-pw",
      database: "cookie-assignment",
    });

    const [userName]: any[] = await connection.execute(
      "SELECT name FROM user WHERE id = ?",
      [userId]
    );
    await connection.end();
    if (userName.length > 0) {
      return userName[0].name;
    } else {
      return "";
    }
  } catch (error) {
    console.log("データベースエラー");
    throw new Error();
  }
}
