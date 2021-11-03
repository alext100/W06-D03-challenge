require("dotenv").config();
const http = require("http");
const calculator = require("./calculator");
const htmlWithCalculator = require("./htmlWithCalculator");
const errorHtml = require("./error");
const { program } = require("commander");
const notFoundPage = require("./404");
program.version("0.0.1");

program.option("-p, --port <type>", "port number");
program.parse(process.argv);
const options = program.opts();

const server = http.createServer();

const port = options.port || process.env.SERVER_PORT || 5000;

server.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});

server.on("request", (request, response) => {
  response.setHeader("Content-Type", "text/html");
  const current_url = `http://localhost/${request.url}`;

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
  } else if (!request.url.includes("calculator")) {
    response.write(notFoundPage());
    response.statusCode = 404;
  }
  response.end();
});
