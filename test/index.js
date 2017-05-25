import http from 'http';
import assert from 'assert';
var expect = require('chai').expect;

import '../app.js';

describe('Example Node Server', () => {
    it('should return 200', done => {
        http.get('http://127.0.0.1:3000', res => {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
    it('should return right text', done => {
        http.get('http://127.0.0.1:3000', res => {
            var data = '';

            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {
                assert.equal('Hello from Koajs using router', data);
                expect(data).to.equal('Hello from Koajs using router');
                done();
            });
        });
    });
});