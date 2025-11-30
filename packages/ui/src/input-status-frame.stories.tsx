import type { Meta, StoryObj } from "@storybook/react"
import { InputStatusFrame } from "./input-status-frame"

const meta: Meta<typeof InputStatusFrame> = {
  title: "Components/InputStatusFrame",
  component: InputStatusFrame,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof InputStatusFrame>

export const Default: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
    label: "Password",
  },
}

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter email...",
    label: "Email",
  },
}

export const Text: Story = {
  args: {
    type: "text",
    placeholder: "Enter username...",
    label: "Username",
  },
}
