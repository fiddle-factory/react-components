import { AddToCart } from "@nattui/react-components"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"

const meta = {
  args: { onClick: fn() },
  argTypes: {
    text: { control: "text" },
  },
  component: AddToCart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/AddToCart",
} satisfies Meta<typeof AddToCart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: "Add to cart",
  },
}

