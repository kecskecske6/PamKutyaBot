const express = require('express');

const server = express();

server.all('/', (req, res) => {
    res.send('A bot fut!');
});

function keepAlive() {
    server.listen(3000, () => {
        console.log('A szerver készenáll!');
    });
}

module.exports = {
    keepAlive: keepAlive
};