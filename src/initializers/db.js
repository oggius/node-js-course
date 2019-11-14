const path = require('path');
const fs = require('fs');
const util = require('util');
const uuid = require('uuid/v4');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DB {
    constructor() {
        this.dirPath =  path.join(__dirname, '../../db');
        this.filePath = path.join(this.dirPath, 'database.json');

        if (!fs.existsSync(this.dirPath)) {
            fs.mkdirSync(this.dirPath);
        }

        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([{a: 'tetst'}, {a: 'test2'}]));
        }
    }

    async getItems() {
        // 1. read file content
        const fileContent = await readFileAsync(path.join(__dirname, '../../db/database.json'));
        // 2. parse data
        const parsedData = fileContent.toString();
        // 3. return data
        return JSON.parse(parsedData);
    }

    async createItem({ price, name }) {
        const items = await this.getItems();
        const id = uuid();
        items.push({
            id,
            price,
            name,
        });

        await writeFileAsync(this.filePath, JSON.stringify(items));
        console.log(items);

        return id;
    }

    async deleteItem(id) {
        let items = await this.getItems();

        items = items.filter(item => item.id !== id);

        await writeFileAsync(this.filePath, JSON.stringify(items));
    }
}

module.exports = DB;