// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');
const filePath = path.join('db.json');
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const server = jsonServer.create();

// Use the data read from db.json for the router
const router = jsonServer.router(db);

const middlewares = jsonServer.defaults();

server.use(middlewares);

// Rewriting URLs to match the API structure
server.use(jsonServer.rewriter({
    '/api/*': '/$1', // Rewrite /api/* routes to match db.json
}));

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});

// Export the Server API
module.exports = server;