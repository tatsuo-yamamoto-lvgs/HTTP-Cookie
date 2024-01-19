import mustache from "mustache";

export default function renderLoginPage(
  method: string | undefined,
  body: string
): string {
  let contents: string = "";
  if (method === "GET") {
    contents = `
        <html>
            <div>
                <h2>ログイン</h2>
                <form action="/login" method="post">
                    <div>
                        <label for="username">ユーザー名:</label>
                        <input type="text" id="username" name="username" required>
                    </div>
                    <button type="submit">ログイン</button>
                </form>
            </div>
        </html>
      `;
  } else if (method === "Post") {
    console.log(`body=${body}`);
    contents = `
        <html>
            <div>
                <h2>ログイン後</h2>
            </div>
        </html>
        `;
  }
  return contents;
}
