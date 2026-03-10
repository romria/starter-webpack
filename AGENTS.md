# AGENTS.md

Shared guidance for AI coding agents working with this repository.

## Commands

```bash
npm start          # Dev server at http://localhost:8000 (HMR + live reload)
npm run build      # Production build → build/
npm run typecheck  # TypeScript type check (tsc --noEmit)
npm run lint       # ESLint (TypeScript)
npm run format     # Prettier (src/)
```

No test runner is configured.

## Architecture

This is a minimal webpack 5 landing page starter using TypeScript. The webpack config is split into three files:

- `webpack.config.common.ts` — shared config: entry (`src/scripts/index.ts`), loaders (HTML, ts-loader, images, fonts, SVG inline), HtmlWebpackPlugin
- `webpack.config.dev.ts` — merges common; uses `style-loader` for injected CSS, dev server on port 8000, source maps via `eval-cheap-module-source-map`
- `webpack.config.prod.ts` — merges common; outputs to `build/`, extracts CSS via `MiniCssExtractPlugin` with content hashes, minifies CSS, `output.clean: true`, `splitChunks`

All three are TypeScript files loaded by webpack-cli via `ts-node` (registered through `rechoir`/`interpret`). They compile to CommonJS at runtime — controlled by `ts-node.compilerOptions.module = "CommonJS"` in `tsconfig.json`. Use `__dirname` (not `import.meta.dirname`) in these files.

### CSS pipeline

Styles use PostCSS (configured in `postcss.config.ts`) with SCSS syntax via `postcss-scss` parser. The pipeline runs: `postcss-import` → `postcss-simple-vars` → `postcss-preset-env`. No Sass compiler — SCSS-like syntax is processed entirely by PostCSS.

postcss.config.ts is loaded via `jiti` (bundled in postcss-loader), so TypeScript is supported natively there without ts-node.

Browser targets are defined once in the `browserslist` field in `package.json` and shared by both PostCSS and TypeScript.

CSS modules are enabled but `localIdentName: '[local]'` keeps class names unmangled in both dev and prod.

### Style organization

- `src/styles/variables.scss` — PostCSS variables (used via `postcss-simple-vars`, `$color-*` syntax)
- `src/styles/index.scss` — base reset (`modern-normalize` via `@import`), box-sizing, layout, typography
- `src/styles/styles.scss` — page-specific component styles; imports `variables.scss` independently (each CSS file is processed separately by PostCSS, so variables must be imported per-file)
- `src/fonts/Inter/inter.scss` — `@font-face` using Inter variable font (`Inter-roman.var.woff2`)
- `src/fonts/Roboto/roboto.scss` — `@font-face` for weights 400/700/900 (TTF only; replace with woff2 for better performance)

All styles are imported from `src/scripts/index.ts` (the single JS entry point).

### Assets

- SVGs are inlined (`asset/inline`)
- Raster images output to `images/`
- Fonts output to `fonts/`
- No content hash on asset filenames in dev; content hash applied in prod via per-rule `generator.filename` overrides in `webpack.config.prod.ts`
- prod config uses `mergeWithRules` (not plain `merge`) so that image/font rules replace rather than concatenate with common rules

### Tooling config files

- `tsconfig.json` — `strict`, `target: ES2020`, `moduleResolution: bundler`; includes both `src/**/*` and root `*.ts` config files; contains a `ts-node` section overriding `module: CommonJS` for webpack config files at runtime
- `eslint.config.ts` — flat config (ESM); `@eslint/js` + `typescript-eslint` + `eslint-config-prettier`; loaded by ESLint's built-in TypeScript config support
- `.prettierrc` — single quotes, trailing commas, 100 char print width
- `postcss.config.ts` — `postcss-scss` parser; plugins: import → simple-vars → preset-env (reads `browserslist` from `package.json`); loaded via `jiti` by postcss-loader
- `package.json` — `browserslist` field is the single source of truth for browser targets (used by both PostCSS and TypeScript)
