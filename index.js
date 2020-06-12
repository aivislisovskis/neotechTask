const http = require('http');
const fs = require('fs');

const port = 3000;

const requestHandler = (request, response) => {
  let returnFile;

  switch (request.url) {
    case '/js/main.js':
      returnFile = './assets/main.js';
      break;
    case '/css/main.css':
      returnFile = './assets/main.css';
      break;
    default:
      returnFile = './index.html';
  }

  response.end(fs.readFileSync(returnFile));
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});