import { chromium } from 'playwright';
const exe = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const base = process.env.BASE || 'http://localhost:5173';
const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox','--disable-gpu','--disable-dev-shm-usage'] });
const shots = [
  ['physics-desktop', `${base}/__story?map=physics`, {width:1440,height:900}],
  ['math-desktop',    `${base}/__story?map=math`,    {width:1440,height:900}],
  ['physics-mobile',  `${base}/__story?map=physics`, {width:390,height:844}],
  ['math-mobile',     `${base}/__story?map=math`,    {width:390,height:844}],
];
for (const [name,url,vp] of shots){
  const page = await browser.newPage({ viewport: vp });
  await page.goto(url, { waitUntil:'networkidle', timeout: 60000 }).catch(e=>console.log('goto warn',name,e.message));
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `/tmp/shot-${name}.png` });
  console.log('shot', name);
  await page.close();
}
await browser.close();
console.log('DONE');
