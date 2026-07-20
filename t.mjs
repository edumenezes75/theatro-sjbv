import { chromium } from 'playwright-core';
try{
 const b=await chromium.launch({executablePath:process.env.BIN,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
 const p=await b.newPage(); await p.setContent('<h1>ok</h1>'); 
 await p.screenshot({path:process.env.O+'/m-test.png'});
 console.log('LAUNCH OK'); await b.close();
}catch(e){console.log('LAUNCH FAIL:',e.message)}
