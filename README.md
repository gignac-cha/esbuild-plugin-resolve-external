# esbuild-plugin-resolve-external

This is the plugin that resolves the external packages for [`esbuild`](https://github.com/evanw/esbuild).

## Getting Started

### Installation

```sh
npm install esbuild-plugin-resolve-external
# or
pnpm add esbuild-plugin-resolve-external
# or
yarn add esbuild-plugin-resolve-external
```

### Usage example

```typescript
import { resolveExternal } from 'esbuild-plugin-resolve-external';
import type { ExternalModule } from 'esbuild-plugin-resolve-external';

const externalModules: ExternalModule[] = [
  { path: 'jsdom' },
];

esbuild.build({
  ...,
  outdir: yourOutDir, // required
  bundle: true, // required because of `outdir`
  plugins: [resolveExternal(externalModules)],
});
```

You can see the samples here: [samples](packages/test)

## Main Concepts

When using `esbuild` with `outfile`, your single built file `index-[hash].js` is too large.<br />
So you passed the `external` option to exclude some packages, but your output file will only have `require("some-package")` statements,<br />
and this means you need the presence of external packages in `node_modules`.

This plugin will be worked with the `plugins` option in `esbuild` for chunking external packages in your `outdir`<br/>
while resolving `require("some-package")` statements to `require("/your/absolute/repository/path/.../<outdir>/some-package.js")`.
