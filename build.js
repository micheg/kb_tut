// Import the filesystem module
const copy = require('recursive-copy');
const fs = require('fs');

// define dirs
const base_dir = __dirname;
const src_dir = `${base_dir}/src`;
const js_dir = `${src_dir}/js`;
const img_dir = `${src_dir}/img/`;
const out_dir = `${base_dir}/dist`;

console.log('clearing dist');
fs.rmdirSync(out_dir, { recursive: true });
fs.mkdirSync(out_dir);

console.log(base_dir);

require('esbuild').buildSync(
{
    entryPoints: [`${js_dir}/game.js`],
    bundle: true,
    minify: true,
    sourcemap: false,
    outfile: `${out_dir}/out.js`
});

console.log('copying index');
fs.copyFileSync(`${src_dir}/index.html`, `${out_dir}/index.html`);
copy(img_dir, `${out_dir}/img`, function(error, results) {
    if (error)
    {
        console.error('Copy failed: ' + error);
    }
    else
    {
        console.info('Copied ' + results.length + ' files');
    }
});
