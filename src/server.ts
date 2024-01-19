//このファイルの責務：メソッドどURIによるルーティングおよび、レスポンスをクラインとに返すこと

import * as http from "http";
import renderLoginPage from "./view/main";
import renderMainPage from "./view/login";

// セッションIDを生み出す関数
function generateSessionId(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// リクエストボディを取得する関数
const getRequestBody = (req: http.IncomingMessage) =>
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => resolve(body));
    req.on("error", (err) => reject(err));
  });

const server = http.createServer((req, res) => {
  const path = req.url;
  const method = req.method;
  const body = getRequestBody(req);
  console.log("ボディ:", body);
  if (path === "/login") {
    const contents = renderLoginPage(method, body);
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });
    res.end(contents);
  } else if (path === "") {
    const cookies = req.headers.cookie;
    let sessionId = "";
    // 型推論があるので、明示的に型宣言しなくていい（req.header.cookieはstring | undefinedを返す。""の時点でstring型）

    if (cookies) {
      const cookiesArray: string[] = cookies.split(";");
      cookiesArray.forEach((cookie) => {
        const [name, value] = cookie.split("=").map((c) => c.trim());
        // TODO：ここの処理の意味よくわからないのでなんとかしろって言ってんの
        if (name === "SID") {
          sessionId = value;
        }
      });
    }

    const contents = renderMainPage(sessionId);

    if (!sessionId) {
      res.writeHead(307, {
        Location: "http://localhost:3000/login",
        "Cache-Control": "no-cache, no-store",
        // no-cache:キャッシュがあっても絶対サーバにきけ
        // no-store:キャッシュするな
      });
      res.end();
      return;

      // sessionId = generateSessionId(20); // 新しいセッションIDを生成
      // res.setHeader("Set-Cookie", `SID=${sessionId}`);
    }

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });
    //もしヘッダーとかフッターとか普遍のものがあるならres.writeで追加してもいいね
    res.end(contents);
  }
});
// http.createServerは<http.Server>オブジェクトを返す。

const port = 3000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
