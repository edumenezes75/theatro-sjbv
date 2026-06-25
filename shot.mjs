import { chromium } from 'playwright-core';
const pages=[['home','/'],['acervo','/acervo'],['historia','/historia'],['pessoas','/pessoas'],['visite','/visite']];
const b=await chromium.launch({executablePath:process.env.BIN,args:['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']});
const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1'});
const p=await ctx.newPage();
for(const [name,path] of pages){
  await p.goto('http://localhost:3939'+path,{waitUntil:'load',timeout:25000}).catch(e=>console.log('nav err',name,e.message));
  await p.waitForTimeout(1200);
  await p.screenshot({path:`${process.env.O}/m-${name}.png`});
  console.log('shot',name);
}
await b.close();
