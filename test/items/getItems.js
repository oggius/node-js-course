const request = require('supertest');
const chai    = require('chai');
const app     = require('../../app.js');
const DB      = require('../../src/initializers/db');

const expect = chai.expect;
let db;

describe('GET /items', () => {

    const items = [
        { price: 100, name: 'Water' },
        { price: 200, name: 'Bread' }
    ];

    before(async () => {
        db = new DB();
        await db.createItem(items[0]);
        await db.createItem(items[1]);
    });

    after(async () => {
        await db.truncateDb();
    });

    it('Should return list of items', async () => {
        const response = await request(app)
            .get('/items')
            .expect(200);

        const { body } = response;

        expect(body).to.be.an('array');
        expect(body).to.have.lengthOf(2);

        body.forEach((item, index) => {
            const {id, name, price} = item;
            expect(id).to.exist;
            expect(name).to.be.equal(items[index].name);
            expect(price).to.be.equal(items[index].price);
        })
    })
});
