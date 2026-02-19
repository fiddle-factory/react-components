import { Label } from "@nattui/react-components"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"

const meta = {
  args: {
    onClick: fn(),
  },
  argTypes: {
    children: { control: "text" },
    htmlFor: { control: "text" },
  },
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Label",
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Label",
  },
}

export const WithText: Story = {
  args: {
    children: "Username",
  },
}

export const ForInput: Story = {
  args: {
    children: "Email Address",
    htmlFor: "email-input",
  },
}

export const Required: Story = {
  args: {
    children: "Password *",
    htmlFor: "password-input",
  },
}

export const LongText: Story = {
  args: {
    children:
      "This is a longer label text that might wrap to multiple lines depending on the container width",
    htmlFor: "description-input",
  },
}

export const WithSpecialCharacters: Story = {
  args: {
    children: "Full Name (First & Last)",
    htmlFor: "fullname-input",
  },
}

export const Clickable: Story = {
  args: {
    children: "Click me to focus input",
    htmlFor: "clickable-input",
    style: { cursor: "pointer" },
  },
}

export const WithCustomStyling: Story = {
  args: {
    children: "Custom Styled Label",
    htmlFor: "custom-input",
    style: {
      color: "#0066cc",
      fontWeight: "bold",
    },
  },
}

export const FormLabel: Story = {
  args: {
    children: "Phone Number",
    htmlFor: "phone-input",
    title: "Enter your phone number including area code",
  },
}

export const AccessibilityLabel: Story = {
  args: {
    "aria-label": "Search through available options",
    children: "Search",
    htmlFor: "search-input",
  },
}
