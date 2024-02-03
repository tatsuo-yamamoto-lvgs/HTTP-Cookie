//責務：メソッドどURIによるルーティングおよび、レスポンスをクラインとに返すこと

import * as http from "http";
import renderMainPage from "./view/main";
import loginService from "./controller/loginService";
import { checkSessionManager } from "./middleware/sessionManager";
import { postService } from "./controller/postService";
import { userService } from "./controller/userService";
const postServiceInstance = new postService();
const userServiceInstance = new userService();

const server = http.createServer(async (req, res) => {
  const path = req.url;
  const method = req.method;
  const cookies = req.headers.cookie;
  const sessionId = parseCookie(cookies)["SID"];
  const body = await getRequestBody(req);
  const userId = await checkSessionManager(sessionId);
  if (!userId && path !== "/login") {
    res.writeHead(307, {
      Location: "http://localhost:3000/login",
      "Cache-Control": "no-cache, no-store",
    });
    res.end();
    return;
  } else if (!userId && path === "/login") {
    const userName = parseBody(body);
    await loginService(method, userName, res);
    return;
  } else if (userId && path === "/login") {
    res.writeHead(303, {
      Location: "http://localhost:3000/",
      "Cache-Control": "no-cache, no-store",
    });
    res.end();
    return;
  } else if (userId && path !== "/login") {
    if (method === "GET") {
      //TODO:後で名前だけじゃなくてデータ全体を取得するように変更
      const userName = await userServiceInstance.getUserData(userId);
      const allPosts = await postServiceInstance.fetchAllPostsService();
      const contents = await renderMainPage(allPosts);
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
      });
      res.end(contents);
    } else if (method === "POST") {
      const post = parseBody(body);
      await postServiceInstance.createPostService(userId!, post);
      //TODO:成功した200を返し、失敗したら400を返す
      res.writeHead(303, {
        Location: "http://localhost:3000/",
        "Cache-Control": "no-cache, no-store",
      });
      res.end();
    }
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

function parseBody(rawBody: string): string {
  const userName: string[] = rawBody.split("=");
  return userName[1];
}
