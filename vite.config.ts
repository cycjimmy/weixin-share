import type { BannerPackageInfo } from '@cycjimmy/config-lib/dist/chore/myBanner.js'
import type { BuildOptions, TerserOptions } from 'vite'

import { createRequire } from 'node:module'

import myBanner from '@cycjimmy/config-lib/dist/chore/myBanner.js'
import terserOption from '@cycjimmy/config-lib/dist/terser/4.x/production.js'
import { defineConfig } from 'vite'

// config-lib's banner reads these fields, and the build below needs the two
// entry paths.
interface PackageJsonMeta extends BannerPackageInfo {
  module: string
  browser: string
}

interface LibraryBuildOptions {
  formats: ('es' | 'umd')[]
  fileName: string
  minify?: false | 'terser'
  banner?: string
}

const pkg = createRequire(import.meta.url)('./package.json') as PackageJsonMeta

// config-lib's shared option follows terser 4's legacy `output` key. Vite 8 always
// injects `format` and terser rejects having both, so convert `output` → `format`.
const { output, ...restTerserOption } = terserOption
const terserOptions = { ...restTerserOption, format: output } as TerserOptions

// Output file names follow the pkg field conventions of the old rollup configs.
const esmFileName = pkg.module.replace('dist/', '') // weixin-share.esm.js
const umdFileName = pkg.browser.replace('dist/', '').replace('.min.js', '.js') // weixin-share.umd.js
const umdMinFileName = pkg.browser.replace('dist/', '') // weixin-share.umd.min.js

function libBuild({ formats, fileName, minify = false, banner }: LibraryBuildOptions): BuildOptions {
  return {
    target: 'es2015',
    outDir: 'dist',
    // Keep artifacts of previous incremental builds (`npm run build` cleans dist first).
    emptyOutDir: false,
    minify,
    ...(minify === 'terser' && { terserOptions }),
    lib: {
      entry: 'src/index.ts',
      name: 'wxShare',
      formats,
      fileName: () => fileName,
    },
    rollupOptions: {
      output: {
        exports: 'default',
        ...(banner && { banner }),
      },
    },
  }
}

// The banner is only attached to the minified UMD build, exactly like the old
// rollup pipeline did.
const builds: Partial<Record<string, BuildOptions>> = {
  'esm': libBuild({
    formats: ['es'],
    fileName: esmFileName,
  }),
  'umd': libBuild({
    formats: ['umd'],
    fileName: umdFileName,
  }),
  'umd-min': libBuild({
    formats: ['umd'],
    fileName: umdMinFileName,
    minify: 'terser',
    banner: myBanner(pkg),
  }),
}

export default defineConfig(({ mode }) => {
  const build = builds[mode]

  // There is no page to build: every script passes an explicit mode, so an
  // unknown one must fail instead of silently falling back to an HTML build.
  if (!build) {
    throw new Error(`Unknown build mode "${mode}". Expected one of: ${Object.keys(builds).join(', ')}.`)
  }

  return {
    // Avoid copying any public directory into dist and polluting .release.
    publicDir: false,
    build,
  }
})
