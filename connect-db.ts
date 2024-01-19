import mysql, { Connection, FieldPacket, RowDataPacket } from "mysql2";

// データベース接続設定
const connection: Connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "cookie-assignment-pw",
  database: "cookie-assignment",
});

// データベースへの接続
connection.connect((error: mysql.QueryError | null) => {
  if (error) {
    console.error("データベース接続エラー: " + error.stack);
    return;
  }
  console.log("データベースに接続されました。");
});

// テーブルの作成
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

connection.query(
  createUserTableQuery,
  (
    error: mysql.QueryError | null,
    results: RowDataPacket[],
    fields: FieldPacket[]
  ) => {
    if (error) {
      console.error("ユーザーテーブル作成エラー: " + error.stack);
      return;
    }
    console.log("ユーザーテーブルが作成されました。");
  }
);

connection.query(
  createPostTableQuery,
  (
    error: mysql.QueryError | null,
    results: RowDataPacket[],
    fields: FieldPacket[]
  ) => {
    if (error) {
      console.error("ポストテーブル作成エラー: " + error.stack);
      return;
    }
    console.log("ポストテーブルが作成されました。");
  }
);

// データベース接続終了
connection.end();
