require("dotenv").config();
const http = require("http");
const url = require("url");
const calculator = require("./calculator");
const htmlWithCalculator = require("./htmlWithCalculator");
const errorHtml = require("./error");

const server = http.createServer();

const port = process.env.SERVER_PORT || 5000;

server.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});

server.on("request", (request, response) => {
  response.setHeader("Content-Type", "text/html");
  const current_url = `http://localhost:666/${request.url}`;

  if (request.url.includes("calculator")) {
    let searchParams = new URL(current_url).searchParams;
    let a = searchParams.get("a");
    let b = searchParams.get("b");
    if (isNaN(a) || isNaN(b)) {
      response.write(errorHtml());
      setTimeout(() => {
        process.exit(9);
      }, 1000);
    } else {
      let result = calculator(+a, +b);
      response.write(htmlWithCalculator(a, b, result));
    }
  }
  response.end();
});
