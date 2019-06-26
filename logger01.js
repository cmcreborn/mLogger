'use strict'

var app = require('express')()
var exPino = require('express-pino-logger')()
var pino = require('pino')
const logger = pino(pino.destination('./my-file'))

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var cors = require('cors');
var corsOption = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials":true
};
app.use(cors(corsOption));

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

// post /error for debug
app.post('/error', function (req, res) {
    console.log('data from error')
    var dataA = req.body
    var dataB = {
        "test": "testString",
        "test2": "testString2",
        "test3": {
            "key1": "value1",
            "key2": "value2"
        }
    }
    var dataC = {"BetInfo":{"event":true,"LineNum":"8","LineBet":"1","BetBalanceRate":"1","BetCreditRate":"1","BetCredit":8},"PayTotal":10,"BetTotal":8,"Credit":499992,"WagersID":"310616168187","hasAllCards":false,"Bell3Times":5,"Cherry3Times":1,"Star97_A7":{"1:1":4512.98},"Star97_AB":{"1:1":4683.98},"Star97_AE":{"1:1":1574.86},"isAllCardsJackpot":false,"hasError":false,"Cards":["4","6","5","7","3","2","7","4","4"],"hasScatter":false,"hasFreeGame":false,"hasLine":true,"Lines":[{"LineID":4,"GridNum":3,"Grids":["1","5","9"],"Payoff":10,"Element":["4","3","4"],"ElementID":"4","Grid":["1","5","9"]}],"LinePayoff":10,"isHitJackpot":false}
    console.log("dataB = ")
    console.log(dataB)
    console.log("dataB json string = ")
    console.log(JSON.stringify(dataB))
    console.log("dataA = ")
    console.log(dataA)
    console.log("dataB.test = " + dataB.test)
    console.log("dataB.test2 = " + dataB.test2)
    console.log("dataB.test3 = " + dataB.test3)
    logger.error(dataB)
    logger.error(dataA)
    logger.error(dataC)
    

    // json-string convert to Json. dataA.username as a json-string.
    //logger.error(JSON.parse(dataA.username))
    res.end("done")
})

app.post('/info', function (req, res) {
    console.log('data from info')
    var dataA = req.body
    logger.info(dataA)
    res.end("done")
})

app.listen(3000)