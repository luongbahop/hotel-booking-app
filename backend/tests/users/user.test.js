import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../src/index.js';

const request = supertest(app);

describe('GET /api/users', function () {
    it('should return a list of users', function (done) {
        request.get('/api/v1/users')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body.data).to.be.an('array');
                done();
            });
    });
});

describe('GET /api/v1/user/:id', function () {
    it('should return a user', function (done) {
        const id = 1; // Replace with a valid user ID
        request.get(`/api/v1/user/${id}`)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body.data).to.be.an('object');
                done();
            });
    });
});