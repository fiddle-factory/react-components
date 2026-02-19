/** biome-ignore-all lint/a11y/useKeyWithClickEvents: Invisible clickable overlay */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: Invisible clickable overlay */

"use client"

import { Button, Spacer } from "@nattui/react-components"
import {
  LucideComponent,
  LucideMessageSquareCode,
  LucidePanelLeft,
  LucideSquareMousePointer,
  LucideTextCursorInput,
} from "lucide-react"
import Link, { type LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { type ComponentProps, type ReactNode, useState } from "react"
import { Logomark } from "@/components/logomark"
import { Tooltip, TooltipContent, TooltipPositioner, TooltipTrigger } from "@/components/tooltip"

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <aside
      className="sticky top-0 bottom-0 isolate z-10 flex h-dvh w-256 shrink-0 flex-col border-gray-6 border-r transition-[width] data-[is-expanded=false]:w-64"
      data-is-expanded={isExpanded}
    >
      {/* Expansion overlay */}
      <div
        className="-z-10 absolute inset-0 cursor-e-resize data-[is-expanded=true]:hidden"
        data-is-expanded={isExpanded}
        onClick={() => setIsExpanded(true)}
      />

      {/* Toggle */}
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              className="absolute! top-16 right-16 z-10 cursor-w-resize! focus-visible:opacity-100! data-[is-expanded=false]:cursor-e-resize! data-[is-expanded=false]:opacity-0"
              data-is-expanded={isExpanded}
              iconOnly
              onBlur={() => setIsHovered(false)}
              onClick={() => setIsExpanded((previous) => !previous)}
              onFocus={() => setIsHovered(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchEnd={() => setIsHovered(false)}
              onTouchStart={() => setIsHovered(true)}
              size={32}
              variant="ghost"
            >
              <LucidePanelLeft size={18} />
            </Button>
          }
        />
        <TooltipPositioner side="right">
          <TooltipContent>
            <p className="font-500 text-12 text-gray-1">{isExpanded ? "Close" : "Open"} Sidebar</p>
          </TooltipContent>
        </TooltipPositioner>
      </Tooltip>

      {/* Logo */}
      <div
        className="mt-16 ml-16 flex w-fit cursor-default select-none items-center justify-center p-4 transition-opacity data-[is-expanded=true]:opacity-100! data-[is-hovered=true]:opacity-0"
        data-is-expanded={isExpanded}
        data-is-hovered={isHovered}
      >
        <Logomark className="size-24 text-primary-9" />
        <p
          className="ml-8 truncate font-600 text-18/1 text-gray-12 transition-opacity data-[is-expanded=false]:pointer-events-none data-[is-expanded=false]:opacity-0"
          data-is-expanded={isExpanded}
        >
          nattui
        </p>
      </div>
      <Spacer className="pointer-events-none h-24" />

      {/* Navigation */}
      <SidebarNavigationLabel data-is-expanded={isExpanded}>Components</SidebarNavigationLabel>
      <SidebarNavigationGroup>
        <SidebarNavigationItem
          href="/button"
          icon={
            <LucideComponent
              className="shrink-0"
              size={18}
            />
          }
          isExpanded={isExpanded}
          label="Button"
        />
        <SidebarNavigationItem
          href="/input"
          icon={
            <LucideTextCursorInput
              className="shrink-0"
              size={18}
            />
          }
          isExpanded={isExpanded}
          label="Input"
        />
      </SidebarNavigationGroup>
      <Spacer className="pointer-events-none h-16" />

      <SidebarNavigationLabel data-is-expanded={isExpanded}>Experiments</SidebarNavigationLabel>
      <SidebarNavigationGroup>
        <SidebarNavigationItem
          href="/dialog"
          icon={
            <LucideMessageSquareCode
              className="shrink-0"
              size={18}
            />
          }
          isExpanded={isExpanded}
          label="Dialog"
        />
        <SidebarNavigationItem
          href="/combobox"
          icon={
            <LucideSquareMousePointer
              className="shrink-0"
              size={18}
            />
          }
          isExpanded={isExpanded}
          label="Combobox"
        />
      </SidebarNavigationGroup>
    </aside>
  )
}

function SidebarNavigationLabel(props: ComponentProps<"p">) {
  const { ...rest } = props

  return (
    <p
      className="mx-16 mb-4 truncate pl-6 font-500 text-14 transition-opacity data-[is-expanded=false]:pointer-events-none data-[is-expanded=false]:opacity-0"
      {...rest}
    />
  )
}

function SidebarNavigationGroup(props: ComponentProps<"div">) {
  const { ...rest } = props

  return (
    <div
      className="flex flex-col gap-y-4 px-16"
      {...rest}
    />
  )
}

function SidebarNavigationItem(props: {
  icon: ReactNode
  isExpanded: boolean
  label: string
  href: LinkProps<string>["href"]
}) {
  const { icon, isExpanded, label, href } = props

  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Tooltip disabled={isExpanded}>
      <TooltipTrigger
        render={
          <Link
            className="flex h-32 w-full items-center gap-x-8 rounded-8 px-6 transition-colors hover:bg-gray-3 hover:text-gray-12 data-[active=true]:bg-gray-3 data-[active=true]:text-gray-12"
            data-active={isActive}
            href={href}
          >
            {icon}
            {isExpanded && <p className="truncate font-500 text-14">{label}</p>}
          </Link>
        }
      />
      <TooltipPositioner side="right">
        <TooltipContent>
          <p className="font-500 text-12 text-gray-1">{label}</p>
        </TooltipContent>
      </TooltipPositioner>
    </Tooltip>
  )
}
