import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

// A dependency-free static export; no upload, deployment or production modification.
const out = 'dist-mood';
await mkdir(join(out, 'mood'), { recursive: true });
await mkdir(join(out, 'img'), { recursive: true });
let html = await readFile('public/mood/page.html', 'utf8');
let js = await readFile('public/mood/world.js', 'utf8');
const css = await readFile('public/mood/style.css', 'utf8') + '\n' + await readFile('public/mood/viewport.css', 'utf8');
const assets = [
 ['人之律者.png', '人之律者.webp', 'hero.webp'],
 ['about_3.jpg', 'about_3.webp', 'garden.webp'],
 ['Elysia_3.jpg', 'Elysia_3.webp', 'stars.webp'],
 ['ico.png', 'ico.webp', 'ico.webp'],
];
const embedded = {};
const sources = [];
for (const [oldName, derivative, name] of assets) {
 let data, actualName, type;
 try {
  data = await readFile(join('review/mood/assets', derivative));
  actualName = name; type = 'image/webp';
 } catch {
  data = await readFile(join('public/img', oldName));
  actualName = oldName; type = oldName.endsWith('.png') ? 'image/png' : 'image/jpeg';
 }
 await writeFile(join(out, 'img', actualName), data);
 html = html.replaceAll(oldName, actualName);
 js = js.replaceAll(oldName, actualName);
 embedded[actualName] = `data:${type};base64,${data.toString('base64')}`;
 sources.push({ source: `public/img/${oldName}`, exported: `img/${actualName}`, bytes: data.length, sha256: createHash('sha256').update(data).digest('hex') });
}
await writeFile(join(out, 'index.html'), html);
await writeFile(join(out, 'mood/style.css'), css);
await writeFile(join(out, 'mood/world.js'), js);
let offline = html.replace('<link rel="stylesheet" href="./mood/style.css">', `<style>${css}</style>`)
 .replace('<script src="./mood/world.js" defer></script>', '');
const offlineJS = js.replace("const assetURL=file=>new URL('./img/'+encodeURIComponent(file),document.baseURI).href;", `const assetURL=file=>(${JSON.stringify(embedded)})[file];`);
for (const [name, data] of Object.entries(embedded)) offline = offline.replaceAll('./img/' + name, data);
offline = offline.replace('</body>', '<script>' + offlineJS + '</script></body>');
await writeFile(join(out, 'elysia-offline.html'), offline);
await writeFile(join(out, 'ASSETS.json'), JSON.stringify(sources, null, 2));
await writeFile(join(out, 'README.txt'), 'Elysia mood preview — not deployed.\nOpen elysia-offline.html directly, or serve this folder using python3 -m http.server 4322.\nThe source repository retains existing assets; this export uses optimized WebP derivatives when prepared by CI.\nFonts are system fonts and are not included.\nArtwork was reused from Xlbnas/Elysia, not generated or treated as a verified license grant.\n');
console.log(JSON.stringify({ output: out, assets: sources, standaloneBytes: Buffer.byteLength(offline) }, null, 2));
