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

const sessionId: string = generateSessionId(20);

const server = http.createServer((req, res) => {
  const cookies = req.headers.cookie;

  if (!cookies || !cookies.includes("SID")) {
    res.setHeader("Set-Cookie", `SID=${sessionId}`);
    //本当はuuidを使いたかったけど、要件に使ってはいけないとあったので、コードの書き方の勉強も含めてランダム値で
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
