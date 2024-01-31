import mustache from "mustache";

export default function renderMainPage(allPost: PostData[]): string {
  //TODO:セッションハイジャックとjwtは関係ないよ
  const template = `
  <!DOCTYPE html>
    <html lang="ja">
      <head></head>
      <body>
        <form action="" method="post">
            <div>
              <label for="username">つぶやき:</label>
              <input type="text" id="tweet" name="tweet" required>
            </div>
          <button type="submit">投稿する</button>
        </form>
      </body>
      <h2>つぶやき一覧</h2>
      {{#allPost}}
        <div>
          <p>User ID: {{userId}}</p>
          <p>Body: {{body}}</p>
          <p>Created At: {{createdAt}}</p>
        </div>
      {{/allPost}}
    </html>
  `;
  // ここを{{{body}}}にするとhtmlエスケープされない→XSSできるようになる

  const contents = mustache.render(template, { allPost });
  console.log(contents);

  return contents;
}

type PostData = {
  userId: number;
  body: string;
  createdAt: Date;
};
