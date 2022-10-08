const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const port = parseInt(process.env.MOCK_PORT || '3001')

const app = express()
  .use(cors())
  .use(express.json({ type: '*/*' }))
  .use(morgan('dev'))

const calls = []

app.get('/cities', (_, res) => {
  res.json({ cities: [{ _id: '123abc', name: 'London' }] })
})

app.post('/volunteer', (req, res) => {
  calls.push({
    method: 'POST',
    path: '/volunteer',
    body: req.body,
    headers: req.headers
  })
  res.json({ volunteer: req.body })
})

app.get('/_calls', (req, res) => {
  res.json(calls)
})

app.post('/_reset', (req, res) => {
  calls.splice(0, calls.length)
  res.sendStatus(204)
})

app.use((req, res) => {
  const call = {
    body: req.body,
    headers: req.headers,
    method: req.method,
    path: req.path
  }
  calls.push(call)
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
