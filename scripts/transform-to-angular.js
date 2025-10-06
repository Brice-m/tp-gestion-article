const fs = require('fs');
const path = require('path');

function walk(dir, cb) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((d) => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) walk(p, cb);
    else cb(p);
  });
}

const root = path.join(__dirname, '..', 'src', 'app');
const files = [];
walk(root, (p) => {
  if (p.endsWith('.html')) files.push(p);
});

files.forEach((f) => {
  const original = fs.readFileSync(f, 'utf8');
  fs.writeFileSync(f + '.orig', original, 'utf8');
  let transformed = original.replace(/@if=/g, '*ngIf=');
  transformed = transformed.replace(/@for=/g, '*ngFor=');
  fs.writeFileSync(f, transformed, 'utf8');
  console.log('Transformed', f);
});

console.log('Transformation complete.');
