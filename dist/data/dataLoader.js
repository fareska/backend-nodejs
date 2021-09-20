const fs = require('fs')
const csvToObject = require('../functions/csvToObject')

class DataLoader {
    constructor(dataManager) {
        this.dataManager = dataManager
    }

    convertCSVFile = (fileName) => {
        const csv = fs.readFileSync(fileName)
        let data = csvToObject(csv)
        return data
    }

    insertFilesDataToDataManager = (filePath) => {
        let convertedData = this.convertCSVFile(filePath)
        for (let i = 0; i < convertedData.length; i++) {
            this.dataManager.addMatch(convertedData[i])
        }
    }
}
module.exports = DataLoader