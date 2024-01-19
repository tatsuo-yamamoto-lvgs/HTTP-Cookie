import mysql from "mysql2";

// データベース接続設定
const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "cookie-assignment-pw",
  database: "cookie-assignment",
});

// データベースへの接続
connection.connect((error) => {
  if (error) {
    console.error("データベース接続エラー: " + error.stack);
    return;
  }
  console.log("データベースに接続されました。");
});

// データベース接続終了
connection.end();
