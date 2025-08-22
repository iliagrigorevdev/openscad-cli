#!/bin/bash
if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Usage: ./run.sh <input-file.scad | openscad-text> <output-file.stl>"
  exit 1
fi
node main.js "$1" "$2"