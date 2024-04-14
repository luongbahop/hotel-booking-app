import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../src/index.js';

const request = supertest(app);

describe('GET /api/bookings', function () {
    it('should return a list of bookings', function (done) {
        request.get('/api/v1/bookings')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body.data).to.be.an('array');
                done();
            });
    });
});

describe('GET /api/v1/booking/:id', function () {
    it('should return a booking', function (done) {
        const id = 1; // Replace with a valid booking ID
        request.get(`/api/v1/booking/${id}`)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body.data).to.be.an('object');
                done();
            });
    });
});