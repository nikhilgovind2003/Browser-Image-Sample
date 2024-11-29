const http = require('http');
const fs = require('fs');
const path = require('path');

// Middleware to inject an image into HTML content
const injectImageMiddleware = (req, res, next) => {
  const pagesToInjectImage = ['/', '/home', '/about', '/contact'];
  if (pagesToInjectImage.includes(req.url)) {
    const pageName = req.url === '/' ? 'home.html' : `${req.url.substring(1)}.html`;
    fs.readFile(pageName, 'utf8', (err, data) => {
      if (err) {
        next(404, 'text/plain', '404 - Page Not Found');
      } else {
        next(200, 'text/html', data);
      }
    });
  } else {
    next();
  }
};






// Serve static files (CSS, JS, Images, etc.)
const serveStaticFile = (req, res, next) => {
  const filePath = path.join(__dirname, req.url);
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      next();
    } else {
      const ext = path.extname(filePath);
      const mimeTypes = {
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
      };
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 - Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(data);
        }
      });
    }
  });
};

// Middleware wrapper
const middlewareWrapper = (middleware, handler) => {
  return (req, res) => {
    middleware(req, res, (statusCode = 404, contentType = 'text/plain', content = '404 - Page Not Found') => {
      handler(req, res, statusCode, contentType, content);
    });
  };
};

// Main request handler
const requestHandler = (req, res, statusCode, contentType, content) => {
  if (statusCode !== 404) {
    res.writeHead(statusCode, { 'Content-Type': contentType });
    res.end(content);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Page Not Found');
  }
};

// Create the server
const server = http.createServer(middlewareWrapper(injectImageMiddleware, (req, res, statusCode, contentType, content) => {
  serveStaticFile(req, res, () => requestHandler(req, res, statusCode, contentType, content));
}));

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
