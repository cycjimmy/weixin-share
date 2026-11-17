# Contributing

The repository is released under the MIT license, and follows a standard Github development process, using Github tracker for issues and merging pull requests into main.

## Requirements

* Node.js `^22.22.2 || ^24.15.0 || >=26.0.0`, the same range as `engines` in `package.json`. CI runs Node 22 and 24, plus one cell per minimum declared version, so the `engines` range and the locked dev dependencies cannot drift apart silently
* npm 10+

## Development

```shell
$ npm install
$ npm run type-check   # tsc --noEmit over src, __test__, tasks and the configs
$ npm run lint         # ESLint (flat config, @antfu/eslint-config)
$ npm test             # Vitest
$ npm run test:coverage # Vitest with v8 coverage (written to coverage/)
$ npm run package      # build dist/ and assemble .release/
$ npm run verify:dts   # type-check dist/index.d.ts as a NodeNext consumer (run after package)
```

There is no dev server and no stylesheet: the package only wraps the WeChat
JS-SDK, so everything is exercised through the unit tests and a scratch HTML page
loading `dist/weixin-share.umd.min.js`.

## TypeScript specifics

* `tsconfig.json` type-checks everything (`noEmit`) and is the config the CI
  `type-check` step uses. `tsconfig.build.json` is the declaration-only config
  that writes `dist/index.d.ts` during the build.
* `tasks/*.ts` are executed by Node's built-in type stripping, so they may only
  use syntax that can be erased: no `enum`, `namespace` or constructor parameter
  properties. `erasableSyntaxOnly` enforces this during `type-check`, and Node's
  ESM resolver requires relative imports to carry the `.ts` extension.
* Relative imports inside `src` carry the `.js` extension (`./WxShare.js`,
  `./types/wechat.js`). The generated declaration files keep those specifiers
  verbatim, and a package with `"type": "module"` is only resolvable by consumers
  using `moduleResolution: "nodenext"` when the extension is there.
  `npm run verify:dts` checks exactly that after a build, because the repository's
  own `bundler` resolution would hide the problem.
* `release.config.js` stays JavaScript on purpose: semantic-release loads it
  through cosmiconfig, whose TypeScript loader resolves `typescript` from
  semantic-release's own install tree (inside the action) rather than from this
  project.
* `src/types/*.d.ts` holds the ambient declarations for `window.wx`, for
  `@cycjimmy/config-lib` and for `@cycjimmy/awesome-js-funcs`, none of which
  ship types. They are not emitted, so they never reach `dist/`.

## Build outputs

`npm run build` writes these files into `dist/`:

| File | Format | Purpose |
| --- | --- | --- |
| `weixin-share.esm.js` | ESM | `main`, `module` and `exports` entry (bundlers, `import`) |
| `weixin-share.umd.js` | UMD | unminified browser build for `<script>` tags |
| `weixin-share.umd.min.js` | UMD | minified browser/CDN build, attached to the GitHub release |
| `index.d.ts` | Types | declarations for `types` and the `exports` `types` condition |

`npm run build` runs `build:types` (`tsc -p tsconfig.build.json`) before the
three Vite builds (`--mode esm`, `--mode umd`, `--mode umd-min`); Vite runs with
`emptyOutDir: false`, so the declarations survive the JS builds. The banner is
only attached to the minified UMD build, like the previous rollup pipeline did.

## Package layout

The package is **ESM only**: there is no CommonJS bundle. `main`, `module` and
the `exports` conditions point at `dist/weixin-share.esm.js`, while `browser`,
`unpkg` and `jsdelivr` point at the minified UMD build. `files` limits the
tarball to `dist/`, and `.release/package.json` is produced by
`tasks/handlePackageJson.ts` (scripts and dependencies stripped, `publishConfig`
reduced to the access level).

## Repository settings required by the release

npm publishing uses [trusted publishing](https://docs.npmjs.com/trusted-publishers)
(OIDC), so no long-lived npm token is stored in the repository:

1. Open `https://www.npmjs.com/package/@cycjimmy/weixin-share/access`.
2. Under **Trusted Publisher**, choose **GitHub Actions** and fill in
   organization `cycjimmy`, repository `weixin-share`, workflow filename
   `release.yml`, and leave the environment empty.
3. Allow the `npm publish` action and save.

`release.yml` must keep `id-token: write`, and its filename must not change
without updating the trusted publisher. Once a release has been published this
way, the `NPM_TOKEN` secret is no longer used.

## Repository settings required by the bots

`.github/workflows/dependabotAutoMerge.yml` merges non-major Dependabot pull
requests automatically. Two settings cannot be expressed in code and must be
enabled by a maintainer:

1. **Settings → Actions → General → Workflow permissions**: choose *Read and
   write permissions*. Dependabot opens its pull requests from branches inside
   this repository, which is why the `pull_request` event can hand
   `GITHUB_TOKEN` a write token there. Pull requests from forks stay read-only,
   and the workflow skips them through the `head.repo.full_name` guard.
2. **Branch protection on `main`**: block force pushes and deletions, but leave
   *Require status checks to pass before merging* **off**. `semantic-release`
   pushes `chore(release): … [skip ci]` straight to `main`, and GitHub rejects
   that push while a required check is configured. A repository owned by a
   personal account cannot add the GitHub Actions app to a ruleset bypass list
   either, so there is no way to have both.

The CI gate for Dependabot lives in `dependabotAutoMerge.yml` instead: it polls
`gh pr checks` for the expected check names and squash merges only after they
pass. `Test CI` reports one check per matrix cell (`test (22, ubuntu-latest)` and
so on), so the `test-status` job aggregates them into a single `Test CI Summary`
check that is easy to read.

`Test CI` keeps the write token away from the steps that execute repository
code: the `test` job is read-only, and the semantic-release dry-run lives in its
own `release-dry-run` job gated to trusted refs.

## Labels

The triage bot and the issue forms reference labels that have to exist in the
repository. `issues.addLabels` fails with `422` for unknown labels, so keep this
list in sync when a rule changes:

| Label | Used by |
| --- | --- |
| `bug` | `bug_report.yml` form |
| `enhancement` | `feature_request.yml` form |
| `documentation` | documentation-only changes |
| `needs-info` | triage rule 3, plus the 7-day lifecycle in `stale.yml` |
| `publish-auth` | triage rule 1 (npm / GPR publishing failures) |
| `usage` | triage rule 2 (questions about using the package) |
| `triaged` | manual exemption from the half-year staleness in `stale.yml` |
| `stale` | applied and removed by `actions/stale` |
| `ci` | `dependabot.yml` github-actions group |
| `dependencies` | `dependabot.yml` both ecosystems |

## Commits

[Conventional Commits](https://www.conventionalcommits.org/) are required:
`semantic-release` derives the version and the changelog from them. A breaking
change must be marked with `!` and a `BREAKING CHANGE:` footer. Commit subjects
and bodies, pull request titles and bodies, and issue or pull request comments
are written in English.
