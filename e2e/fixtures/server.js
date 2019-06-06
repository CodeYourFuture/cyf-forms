const bodyParser = require('body-parser');
const express = require('express');

const port = parseInt(process.env.MOCK_PORT || '3100');

const app = express();

app.use(bodyParser.text());

const calls = [];

app.post('/', (req, res) => {
    calls.push({
        body: JSON.parse(req.body),
        headers: req.headers,
    });
    res.sendStatus(204);
});

app.get('/_calls', (req, res) => {
    res.json(calls);
});

app.post('/_reset', (req, res) => {
    while(calls.length > 0) {
        calls.pop()
    }
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
