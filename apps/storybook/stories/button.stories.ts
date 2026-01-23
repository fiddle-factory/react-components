import { Button } from "@nattui/react-components"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"

const meta = {
  args: { onClick: fn() },
  argTypes: {
    isDisabled: { control: "boolean" },
    isFullWidth: { control: "boolean" },
    isLoading: { control: "boolean" },
    isRounded: { control: "boolean" },
    size: { control: "select", options: [32, 36, 40, 48] },
    variant: {
      control: "select",
      options: ["accent", "primary", "secondary", "ghost"],
    },
  },
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Button",
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
  },
}

export const Primary: Story = {
  args: {
    children: "llllllluuuluuu",
    variant: "primary",
  },
}

export const Accent: Story = {
  args: {
    children: "Accent Button",
    variant: "accent",
  },
}

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
}

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
}

export const Large: Story = {
  args: {
    children: "Large Button",
    size: 44,
  },
}

export const Small: Story = {
  args: {
    children: "Small Button",
    size: 32,
  },
}

export const Loading: Story = {
  args: {
    children: "Loading...",
    isLoading: true,
  },
}

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    isDisabled: true,
  },
}

export const Rounded: Story = {
  args: {
    children: "Rounded Button",
    isRounded: true,
  },
}

export const FullWidth: Story = {
  args: {
    children: "Full Width Button",
    isFullWidth: true,
  },
}

export const IconOnly: Story = {
  args: {
    children: "🚀",
    iconOnly: true,
  },
}

export const WithIcons: Story = {
  args: {
    children: "Button with Icons",
    iconEnd: "✨",
    iconStart: "🚀",
  },
}

