const path = require('path');
const fs = require('fs');
const util = require('util');

class DB {
    constructor() {
        this.dirPath =  path.join(__dirname, '../../db');
        this.filePath = path.join(this.dirPath, 'database.json');

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([{a: 'tetst'}, {a: 'test2'}]));
        }

        console.log(this.filePath);
    }

    async getItems() {
        const readFileAsync = util.promisify(fs.readFile);
        // 1. read file content
        const fileContent = await readFileAsync(path.join(__dirname, '../../db/database.json'));
        // 2. parse data
        const parsedData = fileContent.toString();
        // 3. return data
        return JSON.parse(parsedData);
    }
}

module.exports = DB;