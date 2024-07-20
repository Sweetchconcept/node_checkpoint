
const http = require('http')
console.log('Connecting to Server....')

const hostname = 'localhost'
const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.writeHead('Content-Type', 'text/html')
    res.end('Hello, World')
})

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})