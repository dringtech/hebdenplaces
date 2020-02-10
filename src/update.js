const { resolve } = require('path');
const { loadFile } = require('./utils/file');
const { geojsonToCsv, writeGeoJson } = require('./utils/geojson');
const { getBusinessData } = require('./utils/gsuite');

const inputGeojson = resolve(__dirname, 'hebden-places.geojson');

function mapNewData(f, u) {
    const { urn } = f.properties;
    const { name, comments } = u.find(x => x.urn === urn);
    f.properties = { ...f.properties, name, comments };
    return f;
}

function updateGeojson([g, u]) {
    g.features = g.features.map(f => mapNewData(f, u));
    return g;
}

function msg(message) {
    return (d) => {
        console.log(message);
        return d;
    }
}

Promise.all([
    loadFile(inputGeojson).then(JSON.parse).then(msg('Got GeoJson')),
    getBusinessData().then(msg('Got business data'))
])
    .then(updateGeojson).then(msg('Updated GeoJson'))
    .then(geojsonToCsv)
    .then(writeGeoJson(inputGeojson, { pretty: true }));