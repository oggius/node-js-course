const supertest = require('supertest');
const chai = require('chai');
const server = require('../app');

const expect = chai.expect;

afterEach(() => server.close());

describe('GET requests', () => {
    describe('getItem',() => {
        it('should return items list', async () => {
            const response = await supertest(server)
                .get('/items')
                .expect(200)
                .expect(/Water/)
                .expect(/Bread/);

            const { body } = response;

            expect(body).to.be.an('array');
            expect(body.length).to.be.equal(2);
            expect(body[0].price).to.be.equal(100);
        });
    });
});