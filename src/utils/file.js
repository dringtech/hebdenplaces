const { promisify } = require('util');
const fs = require('fs');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function loadFile(path) {
    const data = await readFile(path, 'utf-8');
    return data;
};

module.exports = {
    loadFile,
    writeFile,
};
