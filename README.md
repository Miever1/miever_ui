# Miever UI

A personal React component library: 30+ accessible, themeable UI components
built with TypeScript and SCSS, shipped as tree-shakeable ESM/CJS with full type
definitions. It powers [miever.net](https://miever.net).

**📖 Live component docs & playground:** [components.miever.net](https://components.miever.net)

## Features

- **30+ components** — layout, forms, navigation, feedback, data display.
- **Light & dark themes** out of the box via CSS custom properties.
- **TypeScript-first** — strict types and `.d.ts` for every component.
- **Accessible** — ARIA wiring, focus management in overlays, keyboard support.
- **Dual ESM/CJS** builds with a single CSS bundle.

## Install

```bash
npm i miever_ui
# or
yarn add miever_ui
```

`react` and `react-dom` (v18) are peer dependencies — install them in your app.

## Setup

Import the stylesheet **once** at your app's entry point. Without it, components
render unstyled:

```ts
import "miever_ui/style";
```

Then import components anywhere:

```tsx
import { Button, Icon } from "miever_ui";

const App = () => (
  <Button type="link" onClick={() => window.open("https://github.com/Miever1")}>
    <Icon icon={["fab", "github"]} theme="primary" />
    GitHub
  </Button>
);
```

> Icons use [FontAwesome](https://fontawesome.com/) — the solid (`fas`) and
> brand (`fab`) packs are bundled, so any icon name from those packs works.

## Theming & dark mode

Themes are driven by a `data-theme` attribute (`"light"` or `"dark"`) on a
container element, which switches the underlying CSS custom properties:

```tsx
<div data-theme="dark">
  <Button type="primary">Dark-themed button</Button>
</div>
```

For a managed theme scope, use `ConfigProvider`, which sets the attribute and
lets you override design tokens:

```tsx
import { ConfigProvider, Button } from "miever_ui";

<ConfigProvider defaultTheme="dark" tokens={{ "--color-bg-primary": "#101418" }}>
  <Button type="primary">Themed</Button>
</ConfigProvider>;
```

Design tokens (colors, spacing, radii, breakpoints) are also exported for use in
your own styles:

```ts
import { BRAND_COLORS, BREAKPOINTS, SPACE_SIZE } from "miever_ui";
```

## Components

**Layout** · Box · Grid (Row/Col) · Divider · Section · PageHeader
**Forms** · Button · Input · AutoComplete · Select · Checkbox · Radio · Switch
**Navigation** · Menu · Breadcrumb · Pagination · Tabs
**Feedback** · Alert · Message · Modal · Drawer · Tooltip · Progress · Spin · Skeleton
**Data display** · Card · Avatar · Badge · Tag · Timeline · Typography · Icon
**Utilities** · ConfigProvider · Transition · `useBreakpoint()` hook

See [components.miever.net](https://components.miever.net) for the full API of
each component, with interactive controls.

## Development

```bash
npm install
npm run storybook   # develop components interactively
npm test            # unit tests
npm run lint        # lint
npm run build       # full build (types + bundle + css)
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for conventions, the component file
structure, and how to develop against a local app (e.g. miever.net) via
`npm link`.

## License

[MIT](./LICENSE)
