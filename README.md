> [!WARNING]
> This project is currently a work in progress.

# @nattui/react-components

A collection of reusable React components built with TypeScript and CSS Modules.

## Links

- Website: https://react-components-web.vercel.app
- Storybook: https://react-components-storybook-mu.vercel.app

## Installation

```bash
pnpm add @nattui/react-components
```

## Usage

```tsx
import { Button } from "@nattui/react-components"

function App() {
  return <Button onClick={() => console.log("Clicked!")}>Click me</Button>
}
```

## Development

### Project Structure

```
src/
├── index.ts          # Main export file
├── button.tsx        # Button component
├── button.module.css # Button styles
└── global.d.ts       # TypeScript declarations
```

### Build Configuration

The project uses [tsup](https://tsup.egoist.dev/) for building:

- **Output formats:** ESM and CommonJS
- **TypeScript declarations:** Generated automatically
- **CSS handling:** CSS files are copied to the dist folder
- **Tree shaking:** Enabled for optimal bundle size
- **Source maps:** Generated for debugging
