const express = require('express')
const cors = require('cors')

const port = parseInt(process.env.MOCK_PORT || '3001')

const app = express()
  .use(cors())
  .use(express.json({ type: '*/*' }))

const calls = []

app.get('/cities', (_, res) => {
  res.json({ cities: [{ _id: '123abc', name: 'London' }] })
})

app.post('/volunteer', (req, res) => {
  console.log({
    body: req.body,
    headers: req.headers
  })
  calls.push({
    body: req.body,
    headers: req.headers
  })
  res.json({ volunteer: req.body })
})

app.get('/_calls', (req, res) => {
  res.json(calls)
})

app.post('/_reset', (req, res) => {
  while (calls.length > 0) {
    calls.pop()
  }
  res.sendStatus(204)
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
