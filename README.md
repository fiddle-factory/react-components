> [!WARNING]
> This project is currently a work in progress.

# @nattui/react-components

A collection of reusable React components built with TypeScript and CSS Modules.

## Links

- Website: https://react-components-web.vercel.app
- Storybook: https://react-components-storybook-mu.vercel.app

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
├── index.ts               # Main export file
├── button.tsx             # Button component
├── button.module.css      # Button styles
├── button-background.tsx  # Button background sub-component
├── button-spinner.tsx     # Button spinner sub-component
├── input.tsx              # Input component
├── label.tsx              # Label component
└── spacer.tsx             # Spacer component

stories/
├── button.stories.ts      # Button stories
├── input.stories.ts       # Input stories
└── label.stories.ts       # Label stories
```

### Build Configuration

The project uses [tsup](https://tsup.egoist.dev/) for building:

- **Output formats:** ESM and CommonJS
- **TypeScript declarations:** Generated automatically
- **CSS handling:** CSS files are copied to the dist folder
- **Tree shaking:** Enabled for optimal bundle size
- **Source maps:** Generated for debugging
