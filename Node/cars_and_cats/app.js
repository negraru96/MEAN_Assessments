var http = require('http');
var fs = require('fs');
var server = http.createServer(function (request, response) {
  console.log('client request URL:', request.url);

  // if (request.url === '/cars') {
  //   fs.readFile('views/cars.html', 'utf8', function (errors, contents) {
  //       response.writeHead(200, { 'Content-Type': 'text/html' });
  //       response.write(contents);
  //       response.end();
  //     });
  // }
  //
  // if (request.url === '/cars/new') {
  //   fs.readFile('views/newcars.html', 'utf8', function (errors, contents) {
  //       response.writeHead(200, { 'Content-Type': 'text/html' });
  //       response.write(contents);
  //       response.end();
  //     });
  // }
  //
  // if (request.url === '/images/carpic.jpg') {
  //   fs.readFile('./images/carpic.jpg', 'utf8', function (errors, contents) {
  //       response.writeHead(200, { 'Content-Type': 'image/jpg' });
  //       response.write(contents);
  //       response.end();
  //     });

  if (request.url === '/cats') {
    fs.readFile('./views/cats.html', 'utf8', function (errors, contents) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(contents);
        response.end();
      });
  }

  if (request.url === '/images/catpic.jpg') {
    fs.readFile('./images/catpic.jpg', function (errors, contents) {
        response.writeHead(200, { 'Content-Type': 'image/jpg' });
        response.write(contents);
        response.end();
      });

  }  else {
    response.end('URL requested is not available');
  }
});

server.listen(6789);
console.log('Running in localhost at port 6789');
