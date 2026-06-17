import { chromium } from 'playwright';
const exe = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const base = process.env.BASE || 'http://localhost:5173';
const b = await chromium.launch({ executablePath: exe, args: ['--no-sandbox','--disable-gpu','--disable-dev-shm-usage'] });
const page = await b.newPage({ viewport: { width: 640, height: 900 } });
await page.goto(`${base}/__story?map=quiz`, { waitUntil:'networkidle', timeout: 60000 }).catch(e=>console.log('goto',e.message));
await page.waitForTimeout(1200);
// reveal two hints
await page.getByText('Need a hint?').click().catch(e=>console.log('hint1',e.message));
await page.waitForTimeout(300);
await page.getByText(/Show another hint/).click().catch(e=>console.log('hint2',e.message));
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/shot-quiz-hints.png' });
console.log('shot hints');
// type a known wrong answer and check -> diagnosis
const box = page.locator('input[type="text"], input:not([type]), textarea').first();
await box.fill('a/t').catch(e=>console.log('fill',e.message));
await page.waitForTimeout(200);
await page.getByRole('button', { name: 'Check' }).click().catch(e=>console.log('check',e.message));
await page.waitForTimeout(900);
await page.screenshot({ path: '/tmp/shot-quiz-diagnosis.png' });
console.log('shot diagnosis');
await b.close(); console.log('DONE');
