# Contributing to Miever UI

Thanks for helping improve Miever UI! This guide describes the conventions that
keep the library consistent.

## Getting started

```bash
npm install
npm run storybook   # develop components interactively
npm test            # run unit tests
npm run lint        # lint
npm run build       # full build (types + bundle + css)
npm run watch       # rebuild dist (js + css + types) on every change
```

## Developing against a local app (e.g. miever.net)

To iterate on the library while seeing changes live in a consuming app, link
it locally instead of publishing to npm.

**1. Register the library as a global link (run once, in this repo):**

```bash
npm run build      # make sure dist/ exists
npm link
```

**2. Point the app at the local library (in the app repo, e.g. miever.net):**

```bash
npm link miever_ui
```

`node_modules/miever_ui` becomes a symlink to this repo.

**3. Run both watchers side by side:**

```bash
# terminal A — in miever_ui: rebuild dist on every change
npm run watch

# terminal B — in the app: start the dev server
npm run develop
```

Edits here rebuild `dist/`, and the app's dev server picks them up on reload.

**Gotcha — duplicate React.** A linked package resolves `react` from its own
`node_modules`, creating a second React instance ("Invalid hook call"). The
consuming app must alias `react`/`react-dom` to its own copy. For Gatsby this
is done in `gatsby-node.ts` via `onCreateWebpackConfig` (see miever.net).
Vite/CRA/Next have equivalent `resolve.alias` settings.

**Unlinking** (back to the published npm version):

```bash
# in the app repo
npm unlink miever_ui && npm install
```

## Conventions

### File structure

Every component lives in `src/Components/<Name>/` and ships the same files:

```
<Name>/
├── <Name>.tsx          # implementation (default export + displayName)
├── interface.ts        # props interface and exported types
├── _style.scss         # styles, all selectors prefixed with `.miever-`
├── <Name>.stories.tsx  # Storybook story (tags: ['autodocs'])
├── <Name>.test.tsx     # unit tests (@testing-library/react)
└── index.ts            # re-exports default + named component + types
```

`index.ts` always looks like:

```ts
export { default } from './Name';
export { default as Name } from './Name';
export * from './interface';
```

### Class names

- Use the shared prefix helper for every class:

  ```ts
  import { getPrefixCls } from '../../utils/getPrefixCls';
  const prefixCls = getPrefixCls('badge'); // -> 'miever-badge'
  ```

- SCSS selectors mirror the same prefix: `.miever-badge`, `.miever-badge-dot`, …
- State modifiers (`disabled`, `active`, `highlight`) stay unprefixed but are
  always nested under a prefixed parent.

### Styling

- Style with SCSS, not CSS-in-JS, so everything compiles into the single
  `miever_ui.css` bundle.
- Pull colors, spacing, radii and shadows from `src/Styles/_variables.scss`
  instead of hard-coding values.
- Use the theme CSS variables (`--color-bg-primary`, `--color-text-primary`,
  `--color-border-primary`, …) where a value must respond to dark mode.

### Wiring a new component

1. Create the folder following the structure above.
2. Register its styles in `src/Styles/index.scss`
   (`@use "../Components/Name/style" as Name;`).
3. Export it from `src/index.tsx` (`export * from './Components/Name';`).
4. Add a story and tests, then run `npm run lint && npm test && npm run build`.

## Pull requests

- Keep changes scoped and run the full check suite before opening a PR.
- Bump the version in `package.json` for releases (breaking class/API changes
  are a minor bump while < 1.0).
