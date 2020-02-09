const { parse, stringify } = require('csv');
const { writeFile } = require('./file');

function parseCsv(string) {
    const options = {
        columns: true,
        cast: (value, { column }) => {
            if(['lat', 'lon'].includes(column)){
                return parseFloat(value);
            }
            return value;
        },
    }
    const tracker = new Promise((resolve, reject) => {
        parse(string, options, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    });

    return tracker;
}

function writeCsv(path) {
    return async (data) => {
        const options = {
            header: true, 
            columns: [ 'urn', 'name', 'comments', 'lat', 'lon' ],
        };
        const tracker = new Promise((resolve, reject) => {
            stringify(data, options, async (err, output) => {
                if (err) reject(err);
                await writeFile(path, output);
                resolve(data);
            });    
        })
        return tracker;
    }
}

module.exports = {
    parseCsv,
    writeCsv,
}