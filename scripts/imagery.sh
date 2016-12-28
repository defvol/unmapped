#!/bin/bash

mkdir imagery
cat data/z16.txt | head -n1000 | xt | ./lib/get-imagery.js
