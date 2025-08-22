
import OpenSCAD from './openscad.wasm.js';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

if (process.argv.length < 4) {
  console.log("Usage: node main.js <input-file.scad> <output-file.stl>");
  process.exit(1);
}

const scadFileName = process.argv[2];
const stlFileName = process.argv[3];

const scadFilePath = path.join(__dirname, scadFileName);
const stlFilePath = path.join(__dirname, stlFileName);

const scadFileContent = fs.readFileSync(scadFilePath, 'utf8');

const wasmBinary = fs.readFileSync(path.join(__dirname, 'openscad.wasm'));

const instance = await OpenSCAD({
  wasmBinary,
  noInitialRun: true,
});

instance.FS.writeFile(scadFileName, scadFileContent);

const mainArgs = [scadFileName, '-o', stlFileName];
const result = instance.callMain(mainArgs);

if (result === 0) {
  const stlContent = instance.FS.readFile(stlFileName, { encoding: 'binary' });
  fs.writeFileSync(stlFilePath, stlContent);
  console.log('Export successful!');
} else {
  console.error('Export failed.');
}
