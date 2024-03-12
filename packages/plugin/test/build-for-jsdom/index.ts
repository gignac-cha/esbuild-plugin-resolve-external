import { readFile } from 'fs/promises';
import { JSDOM } from 'jsdom';

export const test = async () => {
  const buffer = await readFile('test.html');
  const html = buffer.toString();
  const jsdom = new JSDOM(html);
  return jsdom.serialize();
};

if (require.main === module) {
  test().then(console.log);
}
