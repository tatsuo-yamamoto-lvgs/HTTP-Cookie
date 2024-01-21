import mustache from "mustache";

export default function renderMainPage(sessionId: string): string {
  //TODO:もしsessionIDがあれば、そのIDで自動ログインするってわけ
  //TODO:セッションハイジャックされたら終わりってわけ。だからjwtで実装してね（課題4）
  let template: string = "";
  console.log(`sessionIdは${sessionId}`);

  template = `
    <html>
      <head><title>{{title}}</title></head>
      <body>
        <h1>{{heading}}</h1>
        <p>{{message}}</p>
      </body>
    </html>
  `;

  const data = {
    title: "My Page",
    heading: "Welcome to My Page",
    message: "This is a page rendered using Mustache.",
  };
  const contents = mustache.render(template, data);

  return contents;
}
