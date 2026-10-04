import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
const source = readFileSync(new URL('../assets/js/main.js', import.meta.url), 'utf8');
const start = source.indexOf('const CATS =');
const end = source.indexOf('const singleProjects =');
const { projects, cases } = runInNewContext(source.slice(start, end) + '\n({projects:PROJECTS,cases:CASES})', { URL });
test('catalog counts, IDs, descriptions, categories and protocols', () => {
 assert.equal(projects.length, 75);
 assert.equal(new Set(projects.map(p=>p.id)).size, 75);
 for(const [cat,total] of Object.entries({tool:31,game:32,app:9,hub:3})) assert.equal(projects.filter(p=>p.cat===cat).length,total);
 for(const p of projects) { assert.ok(p.desc.length>4,p.name); assert.ok(['https:','http:'].includes(new URL(p.url).protocol)); }
});
test('four featured cases refer to existing projects and local preview assets', () => {
 assert.equal(Object.keys(cases).length, 4);
 for(const name of Object.keys(cases)) {
  const p = projects.find(p=>p.name===name);
  assert.ok(p?.featured,name);
  assert.ok(p.case.problem && p.case.features && p.case.approach);
  if(p.cover) assert.ok(existsSync(new URL('../'+p.cover,import.meta.url)),p.cover);
 }
});
test('section anchors, accessibility labels and social assets are complete', () => {
 const html = readFileSync(new URL('../index.html',import.meta.url),'utf8');
 for(const id of ['featured','about','projects','honors','skills','guestbook']) assert.ok(html.includes(`id="${id}"`));
 for(const id of ['gbName','gbText','searchInput']) assert.ok(html.includes(`for="${id}"`));
 assert.ok(existsSync(new URL('../assets/brand/social-cover.png',import.meta.url)));
 assert.ok(!html.includes('data-count='));
});
