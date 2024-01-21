import { loginModel } from "../model/loginModel";
import renderLoginPage from "../view/login";
import renderMainPage from "../view/main";

export default async function loginService(
  method: string | undefined,
  body: string
): Promise<string> {
  let contents = "";
  let sessionId = "";
  if (method === "GET") {
    contents = renderLoginPage();
  } else if (method === "POST") {
    const username = parseBody(body);
    const accountData = await loginModel(username);
    if (accountData) {
      contents = renderMainPage(sessionId);
    } else {
      contents = renderLoginPage();
    }
  }
  return contents;
}

function parseBody(rawBody: string): string {
  const userName: string[] = rawBody.split("=");
  return userName[1];
}
