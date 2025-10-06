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
walk(root, (p) => {
  if (p.endsWith('.html.orig')) {
    const orig = p.replace(/\.orig$/, '');
    fs.renameSync(p, orig);
    console.log('Restored', orig);
  }
});

console.log('Restore complete.');
