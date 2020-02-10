const { writeFile } = require('./file');

function filterInvalid(data) {
    return data.lat && data.lon && data.lat !== 0 && data.lon !== 0;
}

function makeFeature({ urn, name, comments, lat, lon }) {
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [ lat, lon ]
        },
        properties: { urn, name, comments },
    };
}

function makeFeatureCollection(data) {
    return {
        type: 'FeatureCollection',
        features: data.filter(filterInvalid).map(makeFeature).filter(_ => _),
    };
}

function writeGeoJson(file, { pretty = false } = {}) {
    const formatter = pretty ? (x) => JSON.stringify(x, null, 2) : (x) => JSON.stringify(x); 
    return (data) => {
        const output = makeFeatureCollection(data);
        writeFile(file, formatter(output));
        return data;
    }
}

function geojsonToCsv(data) {
    return data.features.map(
        ({
            properties,
            geometry: {
                coordinates: [ lat, lon ]
            }
        }) => ({ ...properties, lat: parseFloat(lat), lon: parseFloat(lon) }));
}

module.exports = {
    geojsonToCsv,
    writeGeoJson,
};
