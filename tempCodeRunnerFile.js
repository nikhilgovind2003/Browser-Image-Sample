const http = require('http');
// const fs = require('fs');

// // const port = 3000;

// // const server = http.createServer((req, res) => {
// //     let fileName = 'index.html'; // Default to index.html for the root route

// //     // Map URL paths to HTML files
// //     if (req.url === '/about') {
// //         fileName = 'about.html';
// //     } else if (req.url === '/') {
// //         fileName = 'home.html';
// //     } else if (req.url !== '/') {
// //         fileName = 'contact.html';
// //     } else if (req.url !== '/') {
// //         fileName = null; // For unknown routes, return a 404
// //     }

// //     if (fileName) {
// //         fs.readFile(fileName, (err, data) => {
// //             if (err) {
// //                 res.writeHead(500, { 'Content-Type': 'text/plain' });
// //                 res.end('500 - Internal Server Error');
// //             } else {
// //                 res.writeHead(200, { 'Content-Type': 'text/html' });
// //                 res.end(data);
// //             }
// //         });
// //     } else {
// //         // 404 for unknown routes
// //         res.writeHead(404, { 'Content-Type': 'text/plain' });
// //         res.end('404 - Page Not Found');
// //     }
// // });

// // server.listen(port, () => {
// //     console.log(`Server running at http://localhost:${port}`);
// // });


// // Middleware to add an image to the HTML response
// function addImageMiddleware(req, res, next) {
//   if (req.url === '/') { // Targeting the root URL
//     const htmlPath = path.join(__dirname, 'home.html');
//     fs.readFile(htmlPath, 'utf8', (err, data) => {
//       if (err) {
//         res.statusCode = 500;
//         res.end('Error reading HTML file');
//         return;
//       }

//       // Insert an image into the HTML content
//       const modifiedHtml = data.replace(
//         '</body>',
//         '<img src="image.jpg" alt="Sample Image" /><br /></body>'
//       );

//       res.setHeader('Content-Type', 'text/html');
//       res.end(modifiedHtml);
//     });
//   } else {
//     next();
//   }
// }

// // Middleware to serve static files (like images)
// function staticFileMiddleware(req, res, next) {
//   const staticDir = path.join(__dirname, 'static');
//   const filePath = path.join(staticDir, req.url);

//   if (fs.existsSync(filePath)) {
//     fs.readFile(filePath, (err, data) => {
//       if (err) {
//         res.statusCode = 500;
//         res.end('Error serving static file');
//         return;
//       }

//       const ext = path.extname(filePath);
//       const mimeTypes = {
//         '.jpg': 'image/jpeg',
//         '.png': 'image/png',
//         '.html': 'text/html',
//       };

//       res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
//       res.end(data);
//     });
//   } else {
//     next();
//   }
// }

// // Middleware runner
// function runMiddlewares(req, res, middlewares) {
//   let i = 0;

//   function next() {
//     if (i < middlewares.length) {
//       const middleware = middlewares[i];
//       i++;
//       middleware(req, res, next);
//     } else {
//       res.statusCode = 404;
//       res.end('Not Found');
//     }
//   }

//   next();
// }

// // Create the HTTP server
// const server = http.createServer((req, res) => {
//   const middlewares = [addImageMiddleware, staticFileMiddleware];
//   runMiddlewares(req, res, middlewares);
// });

// server.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });