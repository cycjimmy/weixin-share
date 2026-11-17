// @cycjimmy/config-lib ships no type declarations. These shims describe only
// the surface vite.config.ts touches, so the rest of the repository can stay
// under `strict` without a blanket `any`.

declare module '@cycjimmy/config-lib/esm/chore/myBanner.js' {
  const myBanner: (pkg: Record<string, unknown>) => string
  export default myBanner
}

declare module '@cycjimmy/config-lib/esm/terser/4.x/production.js' {
  // Terser 4 named the output options `output`; Vite 8 only accepts `format`.
  const terserOption: {
    output?: Record<string, unknown>
    [key: string]: unknown
  }
  export default terserOption
}
