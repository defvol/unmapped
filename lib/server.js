#!/usr/bin/env node

/**
 * An HTTP server to serve classification requests
 *
 * Usage:
 * % export MAPBOX_ACCESS_TOKEN="pk.foo" ./server.js
 * Routes:
 * GET /classify?tile=z/x/y
 *
 * NOTES:
 * - should run inside rodowi/inception_serving container
 * - listens in port 3000
 *
 */

const execFile = require('child_process').execFile
const express = require('express')
const app = express()

const port = 3000
const url = 'https://b.tiles.mapbox.com/v4/mapbox.satellite'
const token = process.env.MAPBOX_ACCESS_TOKEN

app.get('/', function (req, res) {
  var zxy = req.query.tile
  download(zxy, (err, filename) => {
    if (err) return res.send(err)
    predict(filename, (err, label) => {
      if (err) return res.send(err)
      res.send('CAT\n')
    })
  })
})

function download (tile, done) {
  var filename = `imagery/${tile.replace(/\//g, '-')}.jpg`
  var command = `curl ${url}/${tile}@2x.png?access_token=${token} > ${filename}`
  command = 'curl'
  var params = [
    `${url}/${tile}@2x.png?access_token=${token}`,
    '-o',
    filename
  ]
  execFile(command, params, (err, stdout, stderr) => {
    done(err, filename)
  })
}

function predict (filename, done) {
  var command = '/serving/bazel-bin/tensorflow_serving/example' +
    '/inception_client --server=localhost:9000 ' +
    '--image=' + filename
  execFile(`${command}`, (err, stdout, stderr) => {
    done(err, stderr + stdout)
  })
}

app.listen(port)
console.log('Listening for tile requests in port', port)
