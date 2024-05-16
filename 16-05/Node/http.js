const fs = require('fs');
const http = require('http');

const server = http.createServer(async (req, res) => {
    console.log("Enter ethod")
    if (req.url === '/index') {
        await fs.readFileSync(__dirname + '/index.html', "utf-8", (err, data) => {
            if (err) {
                console.log("err")
                console.log("Err in reading file..")
            } else {
                res.write(data);
                res.end();
            }
        })

    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const PORT = 3003;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
