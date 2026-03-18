// 簡単なサーバーを作る
const http = require('http');
const fs = require('fs');
const path = require('path');

class Server {
    constructor(port) {
        this.port = port;
    }

    start() {
        const server = http.createServer((req, res) => {
            const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : decodeURIComponent(req.url));
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('File not found');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        });

        server.listen(this.port, () => {
            console.log(`Server running at http://localhost:${this.port}/`);
        });
    }
}
module.exports = Server;

if (require.main === module) {
    const port = process.argv[2] || 3000;
    const server = new Server(port);
    server.start();
}