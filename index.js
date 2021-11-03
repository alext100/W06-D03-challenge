require("dotenv").config();
const http = require("http");
const url = require("url");

const server = http.createServer();

const port = process.env.SERVER_PORT || 5000;

server.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});

server.on("request", (request, response) => {
  response.setHeader("Content-Type", "text/plain");
  const current_url = `http://localhost:666/${request.url}`;

  if (request.url.includes("calculator")) {
    let searchParams = new URL(current_url).searchParams;
    let a = searchParams.get("a");
    let b = searchParams.get("b");
    response.write(
      JSON.stringify(`Calculadora va a venir con numeros ${a} y ${b}`)
    );
  }

  response.end();
});
