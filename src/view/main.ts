import mustache from "mustache";

export default function renderMainPage(): string {
  const template = `
    <!DOCTYPE html>
      <title>{{title}}</title>
        <h1>{{heading}}</h1>
        <p>{{message}}</p>
  `;

  const data = {
    title: "My Page",
    heading: "Welcome to My Page",
    message: "This is a page rendered using Mustache.",
  };
  const contents = mustache.render(template, data);

  return contents;
}
