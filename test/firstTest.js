const supertest = require('supertest');
const app = require('../app');

const throwIfError = (err, res) => { if (err) throw err };

describe('GET requests', () => {
    describe('getItem',() => {
        it('should return items list', () => {
            // supertest(app)
            //     .get('/items')
            //     .expect(200)
            //     .expect(/Water/)
            //     .expect(/Bread/)
            //     .end(throwIfError);
        });
    });
});