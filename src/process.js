const { resolve } = require('path');
const { loadFile } = require('./utils/file');
const { parseCsv, writeCsv } = require('./utils/csv');
const { geojsonToCsv, writeGeoJson } = require('./utils/geojson');

const inputGeojson = resolve(__dirname, 'hebden-places.geojson');
const outputCsv = resolve(__dirname, '../docs/hebden-places.csv');
const geojsonFilename = resolve(__dirname, '../docs/hebden-places.geojson');

loadFile(inputGeojson)
    .then(JSON.parse)
    .then(geojsonToCsv)
    .then(writeCsv(outputCsv))
    .then(writeGeoJson(geojsonFilename));
