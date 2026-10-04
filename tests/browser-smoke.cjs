// Start a local server, then run with Playwright installed (or provided via NODE_PATH).
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = process.env.NEXUS_TEST_URL || 'http://127.0.0.1:4173';
(async () => {
 const browser = await chromium.launch({ headless: true });
 const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
 let likes = 4, liked = false, comments = [], fail = '', reads = 0, holdNextRead = false, releaseRead = null;
 await context.route('**/api/**', async route => {
   const req = route.request(), url = new URL(req.url());
   if (fail === 'all' || (fail && url.pathname.endsWith(fail))) return route.fulfill({ status: 503, json: { ok: false, error: '服务暂时不可用' } });
   if (url.pathname === '/api/state') {
     reads++; const snapshot = JSON.parse(JSON.stringify({ok:true, likes, liked, comments}));
     if (holdNextRead) { holdNextRead = false; await new Promise(resolve => { releaseRead = resolve; }); }
     return route.fulfill({json:snapshot});
   }
   if (url.pathname === '/api/like') {
     const data = req.postDataJSON();
     if (data.target === 'site') { liked = !liked; likes += liked ? 1 : -1; return route.fulfill({ json: { ok: true, likes, liked } }); }
     const c = comments.find(c => c.id === data.id); c.liked = !c.liked; c.likes += c.liked ? 1 : -1;
     return route.fulfill({ json: { ok: true, likes: c.likes, liked: c.liked } });
   }
   if (req.method() === 'DELETE') { comments = comments.filter(c => c.id !== url.searchParams.get('id')); return route.fulfill({ json: { ok: true } }); }
   const data = req.postDataJSON();
   const c = { id: 'test-comment', name: data.name, text: data.text, ts: Date.now(), likes: 0, liked: false, mine: true }; comments.unshift(c);
   return route.fulfill({ json: { ok: true, comment: c } });
 });
 const page = await context.newPage();
 const errors = [];
 page.on('pageerror', e => errors.push(e.message));
 await page.goto(base, { waitUntil: 'networkidle' });
 assert.equal(reads, 0);
 assert.equal(await page.locator('#statProjects').innerText(), '72');
 assert.equal(await page.locator('#statSeries').innerText(), '3');
 assert.equal(await page.locator('#statHonors').innerText(), '10');
 assert.equal(await page.locator('#seriesGrid .project').count(), 3);
 assert.equal(await page.locator('#featuredGrid .featured-card').count(), 4);
 assert.equal(await page.locator('#projectsGrid .project').count(), 12);
 await page.locator('#loadMore').click();
 assert.equal(await page.locator('#projectsGrid .project').count(), 24);
 await page.locator('#honorFilter [data-hcat="national"]').click();
 assert.equal(await page.locator('#honorGrid .honor-card').count(), 5);
 await page.locator('#filter [data-cat="game"]').click();
 assert.equal(await page.locator('#projectsGrid .project').count(), 12);
 assert.equal(await page.locator('#honorFilter .is-active').getAttribute('data-hcat'), 'national');
 await page.locator('#searchInput').fill('2048');
 await page.waitForTimeout(80);
 assert.equal(await page.locator('#projectsGrid .project').count(), 1);
 await page.locator('#searchInput').fill('不存在的项目');
 await page.waitForTimeout(80);
 assert.equal(await page.locator('#projectsEmpty').isVisible(), true);
 await page.locator('#clearFilters').click();
 assert.equal(await page.locator('#projectsGrid .project').count(), 12);
 await page.locator('#timelineToggle').click();
 assert.equal(await page.locator('.timeline__item:not([hidden])').count(), 13);
 await page.locator('#timelineToggle').click();
 assert.equal(await page.locator('.timeline__item:not([hidden])').count(), 4);
 await page.locator('.case-details summary').first().click();
 assert.equal(await page.locator('.case-details').first().getAttribute('open'), '');
 await page.locator('#honorGrid .honor-card').first().click();
 await page.keyboard.press('Tab');
 assert.equal(await page.evaluate(() => document.activeElement.id), 'lbPrev');
 await page.keyboard.press('ArrowRight');
 assert.equal(await page.locator('#lbCount').innerText(), '2 / 5');
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('#lightbox').isVisible(), false);
 // Guestbook: no traffic until in view; all writes are intercepted mocks.
 // Earlier navigation can also bring the guestbook into view.
 await page.locator('#guestbook').scrollIntoViewIfNeeded();
 await page.waitForFunction(() => document.getElementById('likeCount').textContent === '4');
 await page.locator('#likeBtn').click();
 await page.waitForFunction(() => document.getElementById('likeCount').textContent === '5');
 fail = 'like';
 await page.locator('#likeBtn').click();
 await page.waitForFunction(() => document.getElementById('likeCount').textContent === '5' && !document.getElementById('likeBtn').classList.contains('is-busy'));
 fail = '';
 // A stale read started before a completed write must not restore the old like state.
 await page.waitForTimeout(150);
 holdNextRead = true;
 await page.evaluate(()=>dispatchEvent(new Event('online')));
 for(let n=0; !releaseRead && n<100; n++) await new Promise(r=>setTimeout(r,10));
 assert.ok(releaseRead, 'held read started');
 await page.locator('#likeBtn').click();
 await page.waitForFunction(()=>document.getElementById('likeCount').textContent==='4' && !document.getElementById('likeBtn').classList.contains('is-busy'));
 const previousReads = reads; releaseRead(); releaseRead = null;
 for(let n=0; reads===previousReads && n<100; n++) await new Promise(r=>setTimeout(r,10));
 await page.waitForTimeout(100);
 assert.equal(await page.locator('#likeCount').innerText(),'4');
 await page.locator('#gbName').fill('测试访客');
 await page.locator('#gbText').fill('作品很有趣，期待后续更新');
 await page.locator('#gbSubmit').click();
 await page.waitForFunction(() => document.querySelectorAll('.gb__comment').length === 1);
 await page.locator('[data-action="clike"]').click();
 await page.waitForFunction(() => document.querySelector('[data-action="clike"]').textContent === '♥ 1');
 fail = 'comment';
 await page.locator('#gbText').fill('这条留言用于测试失败反馈');
 await page.locator('#gbSubmit').click();
 await page.waitForFunction(() => !document.getElementById('gbSubmit').disabled);
 assert.equal(await page.locator('#gbText').inputValue(), '这条留言用于测试失败反馈');
 fail = '';
 page.once('dialog', d => d.accept());
 await page.locator('[data-action="delete"]').click();
 await page.waitForFunction(() => document.querySelectorAll('.gb__comment').length === 0);
 await page.waitForTimeout(3400);
 // Verify responsive widths and absence of overflowing elements, including full catalog.
 for (const width of [360, 390, 768, 1440]) {
   await page.setViewportSize({ width, height: 900 });
   await page.evaluate(() => scrollTo(0,0));
   await page.waitForTimeout(150);
   const overflow = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, offenders: [...document.querySelectorAll('body *')].filter(e => { const r=e.getBoundingClientRect(); return r.width && (r.right > innerWidth+1 || r.left < -1) && getComputedStyle(e).position !== 'absolute' && !e.closest('.hero'); }).map(e=>e.className).slice(0,10) }));
   assert.ok(overflow.scroll <= width, JSON.stringify(overflow));
   if (width <= 960) {
     assert.equal(await page.locator('#navLinks').evaluate(e=>e.inert), true);
     await page.locator('#navToggle').click();
     assert.equal(await page.locator('#navToggle').getAttribute('aria-expanded'), 'true');
     await page.keyboard.press('Escape');
     assert.equal(await page.locator('#navToggle').getAttribute('aria-expanded'), 'false');
   }
   await page.screenshot({path:`/tmp/nexus-home-${width}.png`});
   await page.locator('#featured').scrollIntoViewIfNeeded();
   await page.screenshot({path:`/tmp/nexus-featured-${width}.png`});
   console.log(`PASS responsive ${width}px`);
 }
 assert.equal(await page.locator('.cursor-dot,.preloader').count(), 0);
 assert.equal(await page.locator('.orbit').first().evaluate(e=>getComputedStyle(e).animationName), 'none');
 // Offline cache, retry recovery, and unavailable localStorage.
 fail = 'all';
 await page.reload({waitUntil:'networkidle'});
 await page.locator('#guestbook').scrollIntoViewIfNeeded();
 await page.waitForFunction(() => !document.querySelector('.gb__offline').hidden);
 fail = '';
 await page.locator('.gb__retry').click();
 await page.waitForFunction(() => document.querySelector('.gb__offline').hidden);
 await context.addInitScript(() => { Storage.prototype.getItem = function(){throw new Error('unavailable')}; Storage.prototype.setItem=function(){throw new Error('unavailable')}; });
 fail = 'all';
 await page.reload({waitUntil:'networkidle'});
 await page.locator('#guestbook').scrollIntoViewIfNeeded();
 await page.waitForFunction(() => !document.querySelector('.gb__offline').hidden);
 assert.ok(await page.locator('#commentList').innerText().then(s=>s.includes('重新尝试')));
 assert.deepEqual(errors, []);
 await context.close();
 // Motion-enabled desktop: scene pauses when hidden by scrolling out of view.
 const animated = await browser.newPage({viewport:{width:1440,height:1000}});
 await animated.goto(base,{waitUntil:'domcontentloaded'});
 await animated.evaluate(()=>scrollTo({top:document.getElementById('about').offsetTop,behavior:'instant'}));
 await animated.waitForTimeout(300);
 assert.equal(await animated.locator('#top').evaluate(e=>e.classList.contains('motion-paused')),true);
 await animated.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
 await animated.waitForTimeout(300);
 await animated.screenshot({path:'/tmp/nexus-desktop-animated.png'});
 const fallback = await browser.newPage({reducedMotion:'reduce'});
 await fallback.route('**/assets/projects/data.webp',r=>r.abort());
 await fallback.goto(base,{waitUntil:'domcontentloaded'});
 await fallback.locator('.cover-2').scrollIntoViewIfNeeded();
 await fallback.waitForFunction(()=>document.querySelector('.cover-2 img').hidden);
 assert.ok(await fallback.locator('.cover-2 .cover-fallback').innerText().then(t=>t.includes('智绘大数据')));
 await browser.close();
 console.log('PASS catalog, independent filters, cases, timeline, lightbox keyboard, guestbook success/rollback/retry/storage failure, stale read protection, image fallback, reduced motion and offscreen pause');
})().catch(e => { console.error(e); process.exit(1); });
