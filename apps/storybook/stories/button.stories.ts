import { Button } from "@nattui/react-components"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"

const glowKeyframes = `
  @keyframes blueGlowPulse {
    0%, 100% {
      box-shadow: 0 0 6px 2px rgba(59, 130, 246, 0.45), 0 0 16px 4px rgba(59, 130, 246, 0.2);
    }
    50% {
      box-shadow: 0 0 18px 6px rgba(59, 130, 246, 0.75), 0 0 36px 10px rgba(99, 102, 241, 0.35);
    }
  }
`

if (typeof document !== "undefined") {
  const styleEl = document.createElement("style")
  styleEl.id = "button-glow-animation"
  if (!document.getElementById("button-glow-animation")) {
    styleEl.textContent = glowKeyframes
    document.head.appendChild(styleEl)
  }
}

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
  decorators: [
    (Story: any) => {
      if (typeof document !== "undefined") {
        let styleEl = document.getElementById("button-glow-animation")
        if (!styleEl) {
          styleEl = document.createElement("style")
          styleEl.id = "button-glow-animation"
          styleEl.textContent = glowKeyframes
          document.head.appendChild(styleEl)
        }
      }
      return Story()
    },
  ],
  tags: ["autodocs"],
  title: "Components/Button",
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
    "data-config-id": "button-blue-glow",
    style: {
      animation: "blueGlowPulse 2s ease-in-out infinite",
    },
  } as any,
  decorators: [
    (Story: any) => {
      if (typeof document !== "undefined") {
        let styleEl = document.getElementById("button-glow-animation")
        if (!styleEl) {
          styleEl = document.createElement("style")
          styleEl.id = "button-glow-animation"
          styleEl.textContent = glowKeyframes
          document.head.appendChild(styleEl)
        }

        const handleUpdate = (e: CustomEvent) => {
          const params = e.detail
          const duration = params.glowSpeed ?? 2
          const intensity = params.glowIntensity ?? 0.45
          const color = params.glowColor ?? "#3b82f6"
          const spread = params.glowSpread ?? 6

          const r = parseInt(color.slice(1, 3), 16)
          const g = parseInt(color.slice(3, 5), 16)
          const b = parseInt(color.slice(5, 7), 16)
          const rgb = `${r}, ${g}, ${b}`

          const updated = `
            @keyframes blueGlowPulse {
              0%, 100% {
                box-shadow: 0 0 ${spread}px ${Math.round(spread / 3)}px rgba(${rgb}, ${intensity}), 0 0 ${spread * 2.5}px ${spread}px rgba(${rgb}, ${intensity * 0.45});
              }
              50% {
                box-shadow: 0 0 ${spread * 3}px ${spread}px rgba(${rgb}, ${Math.min(intensity * 1.65, 1)}), 0 0 ${spread * 6}px ${spread * 1.5}px rgba(${rgb}, ${intensity * 0.75});
              }
            }
          `
          const el = document.getElementById("button-glow-animation")
          if (el) el.textContent = updated

          document.querySelectorAll<HTMLElement>("[data-config-id='button-blue-glow']").forEach((btn) => {
            btn.style.animation = `blueGlowPulse ${duration}s ease-in-out infinite`
          })
        }

        setTimeout(() => {
          const btn = document.querySelector("[data-config-id='button-blue-glow']")
          if (btn) {
            btn.removeEventListener("animation:update", handleUpdate as EventListener)
            btn.addEventListener("animation:update", handleUpdate as EventListener)
          }
        }, 100)
      }
      return Story()
    },
  ],
}

export const Primary: Story = {
  args: {
    children: "Primary Button",
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


