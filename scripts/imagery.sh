#!/bin/bash

mkdir imagery
gshuf -n 1000 data/z16.txt | xt | ./lib/get-imagery.js
