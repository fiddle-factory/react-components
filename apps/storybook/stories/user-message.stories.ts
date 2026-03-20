import { UserMessage } from "@nattui/react-components"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  argTypes: {
    message: { control: "text" },
    timestamp: { control: "text" },
    userName: { control: "text" },
  },
  component: UserMessage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/UserMessage",
} satisfies Meta<typeof UserMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    message: "Hey everyone! Just pushed the latest changes to the repo. Let me know if you run into any issues.",
    timestamp: new Date("2025-01-15T14:32:00"),
    userName: "Alex Johnson",
  },
}

