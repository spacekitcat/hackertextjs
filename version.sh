#!/bin/bash
cat package.json | head -n 10 | awk '/version/  {print $2}' | sed 's/,//g' | sed 's/"//g'

