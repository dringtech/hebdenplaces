const { GoogleSpreadsheet } = require('google-spreadsheet');

const sheetId = '11OViC02iF_LXCBOKWBbFQv2QytMbO2EQ7f7avNIIzfA';
const { API_KEY: apiKey } = process.env;

const doc = new GoogleSpreadsheet(sheetId);
doc.useApiKey(apiKey);

// spreadsheet key is the long id in the sheets URL
async function getBusinessData() {
    try {
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
        var rows = await sheet.getRows();
    } catch(err) {
        throw err;
    }
    return rows.map(({urn, Property, Business}) => ({ urn, name: Property, comments: Business }));
}

module.exports = {
    getBusinessData,
};
