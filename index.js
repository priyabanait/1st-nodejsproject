const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain'); // Set response type

    if (req.url === '/') {
        res.end('Hello World');
    } else if (req.url === '/pizza') {
        res.end('This is your pizza');
    } else if (req.url === '/home') {
        res.end('Welcome home');
    } else if (req.url === '/about') {
        res.end('Welcome to About Us');
    } else if (req.url === '/node') {
        res.end('Welcome to my Node Js project');
    } else {
        res.statusCode = 404; // Set 404 status for unknown pages
        res.end('Page Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
