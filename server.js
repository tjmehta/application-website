const fs = require('fs')
const https = require('https')
const path = require('path')

const busboy = require('express-busboy')
const envIs = require('101/env-is')
const express = require('express')
const horizon = require('@horizon/server')
const map = require('object-loops/map')

const config = require('./webpack.config.dev')
const publicDir = path.join(__dirname, 'public')

const PORT = process.env.PORT || 3000

const app = express()

if (envIs('development')) {
  const webpack = require('webpack')
  const compiler = webpack(config)
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
  app.use(require('webpack-hot-middleware')(compiler))
}

// express plugins
busboy.extend(app, {
  upload: true,
  path: path.join(__dirname, 'public', 'uploads'),
  allowedPath: /.*/
})

// static files
app.use('/-', express.static('public'))

// api routes
app.post('/-/api/applications', function (req, res) {
  console.log('UPLOADED FILES', req.files)
  const files = map(req.files || {}, function (fileInfo) {
    return path.relative(publicDir, fileInfo.file)
  })
  res.send(JSON.stringify(files))
})

// view routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// SSL
const ssl = {
  key: fs.readFileSync('/Users/tjmehta/Developer/_certs/localhost/ca-key.pem'),
  cert: fs.readFileSync('/Users/tjmehta/Developer/_certs/localhost/ca.pem')
}

const server = https.createServer(ssl, app).listen(PORT, err => {
  if (err) {
    throw err
  }
  console.log('Listening at http://localhost:' + PORT)
})

const options = require('./config.json')
const secrets = require('./config-secrets.json')
const horizonServer = horizon(server, options)
Object.keys(secrets).forEach(function (name) {
  const opts = Object.assign({ path: name }, secrets[name])
  horizonServer.add_auth_provider(horizon.auth[name], opts)
})

