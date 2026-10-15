const test = require('node:test');
const assert = require('node:assert');
const createApp = require('../src/app');
const { validate } = require('../src/routes/contact');

let server, base;
test.before(async () => {
  server = createApp().listen(0);
  base = `http://localhost:${server.address().port}`;
});
test.after(() => server.close());

test('health endpoint responds', async () => {
  const r = await fetch(`${base}/api/health`);
  assert.strictEqual(r.status, 200);
  assert.strictEqual((await r.json()).status, 'ok');
});

test('validate rejects bad input and trims good input', () => {
  assert.ok(Object.keys(validate({ name: 'A', email: 'x', message: 'hi' }).errors).length === 3);
  const ok = validate({ name: '  Asha  ', email: ' A@B.COM ', message: 'Hello there, nice site!' });
  assert.deepStrictEqual(ok.errors, {});
  assert.strictEqual(ok.clean.email, 'a@b.com');
});

test('contact endpoint returns 400 with field errors', async () => {
  const r = await fetch(`${base}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"name":"A"}' });
  assert.strictEqual(r.status, 400);
  assert.ok((await r.json()).errors.email);
});

test('resume pdf and docx have correct MIME type and filename', async () => {
  const pdf = await fetch(`${base}/api/resume/pdf`);
  assert.strictEqual(pdf.status, 200);
  assert.strictEqual(pdf.headers.get('content-type'), 'application/pdf');
  assert.match(pdf.headers.get('content-disposition'), /Lakshya_Vashishtha_Resume\.pdf/);
  const docx = await fetch(`${base}/api/resume/docx`);
  assert.match(docx.headers.get('content-type'), /wordprocessingml\.document/);
});

test('unknown resume format is 404', async () => {
  assert.strictEqual((await fetch(`${base}/api/resume/exe`)).status, 404);
});
