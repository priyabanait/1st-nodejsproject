const http = require('http');
const fs = require('fs');
const { URLSearchParams } = require('url');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Read the file and show messages
        fs.readFile('userdata.txt', 'utf8', (err, data) => {
            let messages = data ? data.split('\n').filter(line => line.trim() !== '') : [];
            messages.reverse(); // Show newest message first

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <h2>Messages:</h2>
                <ul>
                    ${messages.map(msg => `<li>${msg}</li>`).join('')}
                </ul>
                <form action="/submit" method="POST">
                    <input type="text" name="username" placeholder="Enter Name" required />
                    <button type="submit">Submit</button>
                </form>
            `);
        });

    } else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const params = new URLSearchParams(body);
            const username = params.get('username');

            // Prepend new message (so it's at the top)
            fs.readFile('userdata.txt', 'utf8', (err, data) => {
                let newContent = `Username: ${username}\n` + (data || '');

                fs.writeFile('userdata.txt', newContent, (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error writing file');
                        return;
                    }

                    // Redirect back to homepage after saving
                    res.writeHead(302, { 'Location': '/' });
                    res.end();
                });
            });
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

server.listen(3000, () => console.log('Server running on port 3000'));
