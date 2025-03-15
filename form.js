const http = require('http');
const fs = require('fs');
const { URLSearchParams } = require('url');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Serve the HTML form
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <form action="/submit" method="POST">
                <input type="text" name="username" placeholder="Enter Name" required />
                <button type="submit">Submit</button>
            </form>
        `);
    } else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString(); // Collect incoming data
        });

        req.on('end', () => {
            const params = new URLSearchParams(body);
            const username = params.get('username');

            // Write to file
            fs.appendFile('userdata.txt', `Username: ${username}\n`, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error writing file');
                    return;
                }
                
                // Redirect with 302
                res.writeHead(302, { 'Location': '/thank-you' });
                res.end();
            });
        });
    } else if (req.method === 'GET' && req.url === '/thank-you') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Thank you! Your data has been saved.</h1>');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

server.listen(3000, () => console.log('Server running on port 3000'));
