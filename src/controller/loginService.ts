import { loginModel } from "../model/loginModel";
import * as http from "http";
import renderLoginPage from "../view/login";
import { bindSessionToAccount } from "../middleware/sessionManager";

export default async function loginService(
  method: string | undefined,
  userName: string,
  res: http.ServerResponse
): Promise<void> {
  let contents = renderLoginPage();
  if (method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });
    res.end(contents);
    return;
  } else if (method === "POST") {
    const accountData = await loginModel(userName);
    console.log("accountData:", accountData);
    if (accountData) {
      const sessionId: string = generateSessionId(20);
      await bindSessionToAccount(accountData, sessionId);
      res.writeHead(303, {
        "Set-Cookie": `SID=${sessionId};`,
        Location: "http://localhost:3000/",
      });
      res.end();
      return;
    } else {
      res.writeHead(303, {
        Location: "http://localhost:3000/login",
        "Cache-Control": "no-cache, no-store",
      });
      res.end();
    }
  }
}

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
