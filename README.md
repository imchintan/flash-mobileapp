# FLASHCoin

## Post Installation
### node_modules/metro/src/JSTransformer/worker/minify.js
``` javascript
.................
function minify(inputCode, inputMap) {
  const result = uglify.minify(inputCode, {
    mangle: { toplevel: true, reserved: [ //<= Add reserved keyword
        'Buffer',
        'BigInteger',
        'Point',
        'ECPubKey',
        'ECKey',
        'sha512_asm',
        'asm',
        'ECPair',
        'HDNode'
      ] },
    output: {
      ascii_only: true,
      quote_style: 3,
      wrap_iife: true },
.................
```
