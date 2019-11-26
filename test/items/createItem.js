const request = require('supertest');
const chai    = require('chai');
const app     = require('../../app.js');
const DB      = require('../../src/initializers/db');

const expect = chai.expect;
let db;

describe('POST /items', () => {
    const item = { price: 200, name: 'Bread' };

    before(async () => {
        db = new DB();
    });

    after(async () => {
        await db.truncateDb();
    });

    it('Should create item', async () => {
        const response = await request(app)
            .post('/items')
            .send(item)
            .set('Authorization', 'admin')
            // .expect(201);

        const { body } = response;
        expect(body.id).to.exist;

        const itemFromDb = await db.getItem(body.id);
        expect(itemFromDb).to.eql(body)
    });

    it('Should return 401 if user is not authorized', async () => {
        const response = await request(app)
            .post('/items')
            .send(item)
            .expect(401);

        const { body } = response;

        expect(body.error).to.be.eq('you are not allowed');
    });
});
