const { writeFile } = require('./file');

function filterInvalid(data) {
    return data.lat && data.lon;
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

function writeGeoJson(file) {
    return (data) => {
        const output = makeFeatureCollection(data);
        writeFile(file, JSON.stringify(output));
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
