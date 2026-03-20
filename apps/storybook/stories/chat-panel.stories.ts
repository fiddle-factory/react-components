import { ChatPanel } from "@nattui/react-components"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  argTypes: {
    placeholder: { control: "text" },
    title: { control: "text" },
  },
  component: ChatPanel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/ChatPanel",
} satisfies Meta<typeof ChatPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    initialMessages: [
      {
        id: "1",
        message: "Hey! How's it going? 👋",
        timestamp: "2:38 PM",
        username: "Alex Johnson",
      },
      {
        id: "2",
        isRead: true,
        message: "Pretty good! Just checking in on the design updates.",
        timestamp: "2:39 PM",
        username: "Sam Rivera",
      },
      {
        id: "3",
        message: "I've pushed the latest changes. Let me know what you think!",
        timestamp: "2:41 PM",
        username: "Alex Johnson",
      },
    ],
    placeholder: "Type a message...",
    title: "Chat",
  },
}

