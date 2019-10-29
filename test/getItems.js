const supertest = require('supertest');
const app = require('../app').app;

let request = {};
let server = {};

before(() => { server = app.listen(8888) });
after(() => { server.close() });

beforeEach(async () => {
    request = supertest(server)
});

const throwIfError = (err, res) => { if (err) throw err };

describe('GET requests', () => {
    describe('getItem',() => {
        it('should return items list', () => {
            supertest(server)
                .get('/items')
                .expect(200)
                .expect(/Water/)
                .expect(/Bread/)
                .end(throwIfError);
        });
    });
});