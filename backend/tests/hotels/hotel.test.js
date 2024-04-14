import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../src/index.js';

const request = supertest(app);

describe('GET /api/hotels', function () {
    it('should return a list of hotels', function (done) {
        request.get('/api/v1/hotels')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body.data).to.be.an('array');
                done();
            });
    });
});

describe('GET /api/v1/hotel/:id', function () {
    it('should return a hotel', function (done) {
        const id = 1; // Replace with a valid hotel ID
        request.get(`/api/v1/hotel/${id}`)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body.data).to.be.an('object');
                done();
            });
    });
});