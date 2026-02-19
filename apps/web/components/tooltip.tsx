import { Tooltip as TooltipPrimitive } from "@base-ui-components/react/tooltip"
import type { ComponentProps } from "react"

function TooltipProvider(props: ComponentProps<typeof TooltipPrimitive.Provider>) {
  const { ...rest } = props

  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      {...rest}
    />
  )
}

function Tooltip(props: ComponentProps<typeof TooltipPrimitive.Root>) {
  const { ...rest } = props

  return (
    <TooltipPrimitive.Root
      data-slot="tooltip"
      {...rest}
    />
  )
}

function TooltipTrigger(props: ComponentProps<typeof TooltipPrimitive.Trigger>) {
  const { ...rest } = props

  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      {...rest}
    />
  )
}

function TooltipPositioner(props: ComponentProps<typeof TooltipPrimitive.Positioner>) {
  const { ...rest } = props

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        className="z-50"
        data-slot="tooltip-positioner"
        sideOffset={8}
        {...rest}
      />
    </TooltipPrimitive.Portal>
  )
}

function TooltipContent(props: ComponentProps<typeof TooltipPrimitive.Popup>) {
  const { children, ...rest } = props

  return (
    <TooltipPrimitive.Popup
      className="rounded-8 bg-gray-12 px-8 py-4"
      data-slot="tooltip-content"
      {...rest}
    >
      {children}
    </TooltipPrimitive.Popup>
  )
}

export { Tooltip, TooltipContent, TooltipPositioner, TooltipProvider, TooltipTrigger }
