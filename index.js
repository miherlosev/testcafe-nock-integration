'use strict';

const nock           = require('nock');
const createTestCafe = require('testcafe');
const fs             = require('fs');
let testcafe         = null;
let runner           = null;

const mainPageContent = fs.readFileSync('index.html').toString();

nock('http://domain.com').get('/').reply(200, mainPageContent);
nock('http://cross-domain.com').get('/available').reply(200, 'cross-domain request reply', {
    'Access-Control-Allow-Origin': '*'
});

createTestCafe('localhost', 1337, 1338)
    .then(tc => {
        testcafe = tc;
        runner   = testcafe.createRunner();
    })
    .then(() => {
        return runner
            .src('test.js')
            .browsers('chrome')
            .run();
    })
    .then(failedCount => {
        testcafe.close();
    })
    .catch(err => console.log(err));

