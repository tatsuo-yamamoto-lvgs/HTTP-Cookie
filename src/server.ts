//責務：メソッドどURIによるルーティングおよび、レスポンスをクラインとに返すこと

import * as http from "http";
import renderMainPage from "./view/main";
import loginService from "./controller/loginService";
import { checkSessionManager } from "./middleware/sessionManager";

const server = http.createServer(async (req, res) => {
  const path = req.url;
  const method = req.method;
  const cookies = req.headers.cookie;
  const sessionId = parseCookie(cookies)["SID"];
  const body = await getRequestBody(req);
  const userName = await checkSessionManager(sessionId);
  console.log("userName:", userName);
  if (!userName && path !== "/login") {
    res.writeHead(307, {
      Location: "http://localhost:3000/login",
      "Cache-Control": "no-cache, no-store",
    });
    res.end();
    console.log("111111111111");
    return;
  } else if (!userName && path === "/login") {
    await loginService(method, body, res);
    console.log("222222222222");
    return;
  } else if (userName && path === "/login") {
    res.writeHead(303, {
      Location: "http://localhost:3000/",
      "Cache-Control": "no-cache, no-store",
    });
    res.end();
    return;
  } else if (userName && path !== "/login") {
    const contents = renderMainPage();
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });
    res.end(contents);
  }
});

const port = 3000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});

const getRequestBody = (req: http.IncomingMessage): Promise<string> =>
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      resolve(body);
    });
    req.on("error", (err) => {
      reject(err);
    });
  });

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
