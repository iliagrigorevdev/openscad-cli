#!/usr/bin/env node

import OpenSCAD from './openscad.wasm.js';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

if (process.argv.length < 4) {
  console.log("Usage: openscad-cli <input-file.scad | openscad-text> <output-file.stl | stl>");
  process.exit(1);
}

const scadInput = process.argv[2];
const outputFileName = process.argv[3];

let outputFormat;
let outputFilePath;
let writeToFile = true;

if (path.extname(outputFileName) === '') {
  outputFormat = outputFileName;
  outputFilePath = `out.${outputFormat}`;
  writeToFile = false;
} else {
  outputFormat = path.extname(outputFileName).slice(1);
  outputFilePath = outputFileName;
}

let scadFileContent;
let scadFileName;

if (scadInput.endsWith('.scad')) {
  scadFileName = scadInput;
  const scadFilePath = scadFileName;
  scadFileContent = fs.readFileSync(scadFilePath, 'utf8');
} else {
  scadFileName = 'in.scad';
  scadFileContent = scadInput;
}

const wasmBinary = fs.readFileSync(path.join(__dirname, 'openscad.wasm'));

const openSCADOptions = {
  wasmBinary,
  noInitialRun: true,
};

if (!writeToFile) {
  openSCADOptions.print = () => {};
  openSCADOptions.printErr = () => {};
}

const instance = await OpenSCAD(openSCADOptions);

instance.FS.writeFile(scadFileName, scadFileContent);

const mainArgs = [scadFileName, '-o', outputFilePath];
const result = instance.callMain(mainArgs);

if (result === 0) {
  if (writeToFile) {
    if (instance.FS.findObject(outputFilePath)) {
        const outputContent = instance.FS.readFile(outputFilePath);
        fs.writeFileSync(outputFilePath, outputContent);
        console.log('Export successful!');
    } else {
        console.error('Export failed: Output file not found.');
    }
  } else {
    const outputContent = instance.FS.readFile(outputFilePath, { encoding: 'utf8' });
    console.log(outputContent);
  }
} else {
  console.error('Export failed.');
}