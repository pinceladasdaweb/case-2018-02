import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import logger from 'morgan'
import api from './routes/api'

const app = express()

app.disable('x-powered-by')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(compression())

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

app.use('/api', api)

app.get('*', (req, res, next) => {
  if(!res.headersSent) {
    res.statusCode = 404
    res.send({
      success: false,
      message: `Route ${req.path} NOT FOUND`
    })
  } else {
    next()
  }
})

app.use((err, req, res, next) => {
  res.statusCode = 500
  let errorResponse = {
    success: false,
    data: [{
      error: err,
      stackTrace: err.stack
    }]
  }
  res.send(errorResponse)
})

export default app