const request = require('supertest');
const chai    = require('chai');
const app     = require('../../app.js');
const DB      = require('../../src/initializers/db');

const expect = chai.expect;
let db;

describe('DELETE /item', () => {

    const items = [
        { id: 'some_random_id', price: 100, name: 'Water' },
        { id: 'another_random_id', price: 200, name: 'Bread' }
    ];

    before(async () => {
        db = new DB();
        await db.createItem(items[0]);
        await db.createItem(items[1]);
    });

    after(async () => {
        await db.truncateDb();
    });

    it('Should return 204 if delete was successful', async () => {
        const response = await request(app)
            .delete('/items/' + items[0].id)
            .expect(204);
    })
});
