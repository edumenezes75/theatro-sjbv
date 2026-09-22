import { chromium } from 'playwright';
import fs from 'fs';
const tpl = fs.readFileSync('card.html','utf8');
const b = await chromium.launch({ args:['--no-sandbox'] });
for (const [cls,w,h] of [['feed',1080,1350],['story',1080,1920]]) {
  fs.writeFileSync(`_${cls}.html`, tpl.replace('CLS',cls));
  const p = await b.newPage({ viewport:{width:w,height:h}, deviceScaleFactor:1 });
  await p.goto('file://'+process.cwd()+`/_${cls}.html`);
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(400);
  const box = await p.locator('.card').boundingBox();
  const over = await p.evaluate(()=>{const c=document.querySelector('.card');return c.scrollHeight-c.clientHeight});console.log(cls,'box',box.height,'overflow',over);
  await p.locator('.card').screenshot({ path:`programa_${cls}.png` });
  await p.close();
  fs.unlinkSync(`_${cls}.html`);
}
await b.close();
