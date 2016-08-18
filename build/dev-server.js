var path = require('path')
var bodyParser = require('body-parser')
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.dev.conf')
var request = require('superagent')
var mathRouter = require('./router/mathRouter')
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
//  parse application/json
app.use(bodyParser.json())

var compiler = webpack(config)
// 设置资源目录
app.use('/static', express.static(path.join(__dirname, '../src')))
app.use('/math/static', express.static(path.join(__dirname, '../dist/static')))

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler))

app.use('/math', mathRouter)

app.listen(3000, '127.0.0.1', function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://127.0.0.1:8000')
})
