#!/usr/bin/env node

/**
 * An HTTP server to serve classification requests
 *
 * Usage:
 * % export MAPBOX_ACCESS_TOKEN="pk.foo" ./lib/server.js
 * Routes:
 * GET /?tile=z/x/y
 *
 * NOTES:
 * - should run inside rodowi/inception_serving container
 * - listens in port 3000
 *
 */

const fs = require('fs')
const execFile = require('child_process').execFile
const express = require('express')
const app = express()

const port = 3000
const url = 'https://b.tiles.mapbox.com/v4/mapbox.satellite'
const token = process.env.MAPBOX_ACCESS_TOKEN

app.use('/', function (req, res, next) {
  var zxy = req.query.tile
  var tileformat = /^\d+\/\d+\/\d+$/
  if (zxy && zxy.match(tileformat)) return next()
  res.status(400).send('Bad request, expecting parameter tile=z/x/y')
})

app.get('/', function (req, res) {
  var zxy = req.query.tile

  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  console.log('predicting class for tile', zxy)
  tilecache(zxy, (err, filename) => {
    if (err) return res.send(err)
    predict(filename, (err, label) => {
      if (err) return res.send(err)
      res.send(label)
      console.log('sending result for tile', zxy)
    })
  })
})

function filepath (tile) {
  return `${process.env.PWD}/imagery/${tile.replace(/\//g, '-')}.jpg`
}

function tilecache (tile, done) {
  var filename = filepath(tile)
  fs.stat(filename, function (err, stat) {
    if (err) return download(tile, done)
    console.log('caching', filename)
    done(null, filename)
  })
}

function download (tile, done) {
  var filename = filepath(tile)
  var command = 'curl'
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
  var cmd = '/serving/tensorflow/bazel-bin/tensorflow/examples/label_image/label_image'
  var params = [
    '--graph=/tf_files/retrained_graph.pb',
    '--labels=/tf_files/retrained_labels.txt',
    '--output_layer=final_result',
    '--image=' + filename
  ]
  execFile(cmd, params, (err, stdout, stderr) => {
    done(err, stderr + stdout)
  })
}

app.listen(port)
console.log('Listening for tile requests in port', port)
