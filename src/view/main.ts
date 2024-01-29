import mustache from "mustache";

export default function renderMainPage(): string {
  const template = `
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
