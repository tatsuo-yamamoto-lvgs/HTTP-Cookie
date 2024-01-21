import mysql from "mysql2";

export function loginModel(username: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
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
        reject(error);
        return;
      }
      console.log("データベースに接続されました。");

      // SQLクエリの実行
      connection.query(
        "SELECT name FROM user WHERE name = ?",
        [username],
        (error, results: any[]) => {
          // データベース接続終了
          connection.end();
          console.log(results);

          if (error) {
            reject(error);
            return;
          }

          if (results.length > 0) {
            resolve(results[0].name);
          } else {
            resolve(null);
          }
        }
      );
    });
  });
}
