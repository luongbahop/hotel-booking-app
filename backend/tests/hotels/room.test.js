import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../src/index.js';

const request = supertest(app);

describe('GET /api/rooms', function () {
    it('should return a list of rooms', function (done) {
        request.get('/api/v1/rooms')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body.data).to.be.an('array');
                done();
            });
    });
});

describe('GET /api/v1/room/:id', function () {
    it('should return a room', function (done) {
        const id = 1; // Replace with a valid room ID
        request.get(`/api/v1/room/${id}`)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body.data).to.be.an('object');
                done();
            });
    });
});