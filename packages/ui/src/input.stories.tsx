import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
}

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
  },
}

export const PasswordSuccess: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
    status: "success",
    statusText: "Password is strong",
  },
}

export const PasswordError: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
    status: "error",
    statusText: "Password is too weak",
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Input size={32} placeholder="Size 32" />
      <Input size={36} placeholder="Size 36" />
      <Input size={40} placeholder="Size 40 (default)" />
      <Input size={44} placeholder="Size 44" />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Input placeholder="Default" />
      <Input isActive placeholder="Active" />
      <Input isDisabled placeholder="Disabled" />
      <Input isReadOnly value="Read only" placeholder="Read only" />
      <Input isRequired placeholder="Required" />
    </div>
  ),
}
