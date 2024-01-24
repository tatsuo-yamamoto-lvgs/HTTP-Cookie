import mysql, { Connection, FieldPacket, RowDataPacket } from "mysql2";

const connection: Connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "cookie-assignment-pw",
  database: "cookie-assignment",
});

const createUserTableQuery: string = `
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const createPostTableQuery: string = `
CREATE TABLE IF NOT EXISTS post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id)
)`;

function createTable(query: string) {
  return new Promise((reject) => {
    connection.query(query, (error: mysql.QueryError | null) => {
      if (error) {
        reject("テーブル作成エラー: " + error.stack);
      }
    });
  });
}

function connectDatabase() {
  return new Promise((reject) => {
    connection.connect((error: mysql.QueryError | null) => {
      if (error) {
        reject("データベース接続エラー: " + error.stack);
      }
    });
  });
}

async function main(): Promise<void> {
  try {
    await connectDatabase();
    console.log("データベース接続成功");
    await createTable(createUserTableQuery);
    console.log("userテーブル作成成功");
    await createTable(createPostTableQuery);
    console.log("postテーブル作成成功");
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
}

main();
