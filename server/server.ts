import * as http from "http";
// `* as`をつけることでモジュールのすべてのエクスポートにアクセス可能。逆につけないとデフォルトエクスポートだけ

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

function parseCookie(rawCookie: string | undefined): Record<string, string> {
  const cookieIngredients: Record<string, string> = {};
  if (rawCookie) {
    const cookiePairs = rawCookie.split("; ");
    cookiePairs.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      cookieIngredients[name] = value;
    });
  }
  return cookieIngredients;
}

const sessionId: string = generateSessionId(20);

const server = http.createServer((req, res) => {
  const cookies = req.headers.cookie;
  const cookieIngredients = parseCookie(cookies);
  if (!cookies || !cookieIngredients["SID"]) {
    const sessionId: string = generateSessionId(20);
    res.setHeader("Set-Cookie", `SID=${sessionId}`);
  }

  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  res.end("Hello World\n");
});
// http.createServerは<http.Server>オブジェクトを返す。

const port = 3000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
