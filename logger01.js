'use strict'
 
var app = require('express')()
var exPino = require('express-pino-logger')()
var pino = require('pino')
const logger = pino(pino.destination('./my-file'))

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
app.use(exPino)
 
app.get('/', function (req, res) {
  // each request has its own id
  // so you can track the log of each request
  // by using `req.log`
  // the ids are cycled every 2^31 - 2
  req.log.info('something else')
  res.send('hello world')
})

app.get('/info', function (req, res) {
    // each request has its own id
    // so you can track the log of each request
    // by using `req.log`
    // the ids are cycled every 2^31 - 2
    logger.info('from /info')
    res.send('hello info')
})

app.get('/error', function (req, res) {
    // each request has its own id
    // so you can track the log of each request
    // by using `req.log`
    // the ids are cycled every 2^31 - 2
    
    console.log('get from error data = ')
    console.log(req.query.data)
    logger.error(req.query.data)
    res.send('hello error')
})

app.post('/error', function (req, res) {
  console.log('data from error')
  var dataA = req.body
  console.log(dataA)
  logger.error(dataA)
  res.end("done")
})
 
app.listen(3000)