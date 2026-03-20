import { UserMessage } from "@nattui/react-components"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  argTypes: {
    isRead: { control: "boolean" },
    message: { control: "text" },
    timestamp: { control: "text" },
    username: { control: "text" },
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
    message: "Hey! How's it going? 👋",
    timestamp: "2:41 PM",
    username: "Alex Johnson",
  },
}

