#!/bin/bash
if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Usage: ./export.sh <input-file.scad | openscad-text> <output-file.stl>"
  exit 1
fi
node export.js "$1" "$2"
