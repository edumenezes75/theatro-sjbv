// Gera o card de APOIO da campanha (feed 1080x1350 e story 1080x1920).
// Uso: cd tools/card-apoio && npm i playwright && node gerar.mjs
// Os JPGs saem aqui; copie para public/evento/publicar/img/.
import { chromium } from 'playwright';
import fs from 'fs';
const tpl = fs.readFileSync('card.html', 'utf8');
const b = await chromium.launch({ args: ['--no-sandbox'] });
for (const [cls, w, h] of [['feed', 1080, 1350], ['story', 1080, 1920]]) {
  fs.writeFileSync(`_${cls}.html`, tpl.replace('CLS', cls));
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await p.goto('file://' + process.cwd() + `/_${cls}.html`);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(400);
  await p.locator('.card').screenshot({ path: `apoio_${cls}.png` });
  await p.close();
  fs.unlinkSync(`_${cls}.html`);
}
await b.close();
console.log('pronto — converta os PNG em JPG q92 4:4:4');
