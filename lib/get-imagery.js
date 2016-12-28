#!/usr/bin/env node

/**
 * Download tiles of satellite imagery
 *
 * Usage:
 * % export MAPBOX_ACCESS_TOKEN=pk.1001.foobar
 * % cat data/tiles.txt | head -n1000 | xt | ./lib/get-imagery.js
 *
 */

const exec = require('child_process').exec
const readline = require('readline')
var q = require('d3-queue')

var queue = q.queue(4)
var invocations = 0
const url = 'https://b.tiles.mapbox.com/v4/mapbox.satellite'
const token = process.env.MAPBOX_ACCESS_TOKEN
const delay = 4000

function wget (tile, callback) {
  console.log('%d downloading %s', ++invocations, tile)
  var zxy = tile.split('/')
  var name = `imagery/${zxy[1]}-${zxy[2]}-${zxy[0]}.jpg`
  var command = `wget -O ${name} ${url}/${tile}@2x.png?access_token=${token}`
  exec(`${command}`, (err, stdout, stderr) => {
    if (err) console.error(`exec error: ${err}`)
    if (invocations % 4 === 0) setTimeout(() => callback(err), delay)
    else callback(err)
  })
}

const rl = readline.createInterface({ input: process.stdin })
rl.on('line', tile => queue.defer(wget, tile))
