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
