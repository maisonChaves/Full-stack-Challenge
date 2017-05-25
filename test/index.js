import http from 'http';
import assert from 'assert';

import '../app.js';

describe('Example Node Server', () => {
    it('should return 200', done => {
        http.get('http://127.0.0.1:3000', res => {
            assert.equal(200, res.statusCode);
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
                done();
            });
        });
    });
});