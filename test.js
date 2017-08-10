import { ClientFunction } from 'testcafe';

fixture `Test`
    .page('http://domain.com');

const getXhrStatus = ClientFunction(() => window.xhrStatusCode);

test('simple', async t => {
    await t
        .click('body')
        .expect(getXhrStatus()).eql(200);
});