import mustache from "mustache";

export default function renderLoginPage(): string {
  let contents: string = "";
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
  return contents;
}
