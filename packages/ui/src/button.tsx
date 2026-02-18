import { type ComponentProps, type JSX, type ReactNode, useEffect, useRef, useState } from "react"
import styles from "@/button.module.css"
import { ButtonBackground } from "@/button-background"
import { ButtonSpinner } from "@/button-spinner"

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  hex = hex.replace(/^#/, '')
  const bigint = parseInt(hex, 16)
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 }
}

function interpolateColor(c1: string, c2: string, t: number): string {
  const a = hexToRgb(c1)
  const b = hexToRgb(c2)
  const r = Math.round(a.r + (b.r - a.r) * t)
  const g = Math.round(a.g + (b.g - a.g) * t)
  const bl = Math.round(a.b + (b.b - a.b) * t)
  return `rgb(${r}, ${g}, ${bl})`
}

export interface ButtonIconProps extends ButtonPropsInternal {
  children?: ReactNode
  iconEnd?: never
  iconOnly: true
  iconStart?: never
}

export interface ButtonProps extends ButtonPropsInternal {
  children?: string | string[]
  iconOnly?: false
}

interface ButtonPropsInternal extends Omit<ComponentProps<"button">, "aria-pressed" | "disabled"> {
  iconEnd?: ReactNode
  iconOnly?: boolean
  iconStart?: ReactNode
  isActive?: boolean
  isDisabled?: boolean
  isFullWidth?: boolean
  isLoading?: boolean
  isRounded?: boolean
  size?: 32 | 36 | 40 | 44 | 48
  variant?: "accent" | "ghost" | "primary" | "secondary"
}

type ButtonUnionProps = ButtonIconProps | ButtonProps

export function Button(props: ButtonUnionProps): JSX.Element {
  const {
    children = "",
    className: customClassName = "",
    iconEnd = "",
    iconOnly = false,
    iconStart = "",
    isActive = false,
    isDisabled = false,
    isFullWidth = false,
    isLoading = false,
    isRounded = false,
    size = 40,
    type = "button",
    variant = "primary",
    ...rest
  } = props

  const buttonRef = useRef<HTMLButtonElement>(null)
  const animFrameRef = useRef<number>(0)
  const [colorFrom, setColorFrom] = useState("#6366f1")
  const [colorTo, setColorTo] = useState("#ec4899")
  const [speed, setSpeed] = useState(2)
  const [intensity, setIntensity] = useState(0.85)

  useEffect(() => {
    const el = buttonRef.current
    if (!el) return
    const handleUpdate = (e: CustomEvent) => {
      const p = e.detail
      if (p.colorFrom !== undefined) setColorFrom(p.colorFrom)
      if (p.colorTo !== undefined) setColorTo(p.colorTo)
      if (p.speed !== undefined) setSpeed(p.speed)
      if (p.intensity !== undefined) setIntensity(p.intensity)
    }
    el.addEventListener("animation:update", handleUpdate as EventListener)
    return () => el.removeEventListener("animation:update", handleUpdate as EventListener)
  }, [])

  useEffect(() => {
    const el = buttonRef.current
    if (!el) return
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = (timestamp - startTime) / 1000
      // Smooth sine wave oscillation between 0 and 1
      const t = (Math.sin(elapsed * Math.PI * 2 / speed) + 1) / 2
      const blended = t * intensity
      const currentColor = interpolateColor(colorFrom, colorTo, blended)
      el.style.backgroundImage = `linear-gradient(to bottom, ${currentColor}, ${interpolateColor(colorFrom, colorTo, Math.min(blended + 0.1, 1))})`
      el.style.borderColor = currentColor
      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [colorFrom, colorTo, speed, intensity])

  const combinedClassName = `
    ${BUTTON_CLASS_NAME.BASE}
    ${BUTTON_CLASS_NAME.SIZE[size]}
    ${BUTTON_CLASS_NAME.VARIANT[variant.toUpperCase() as keyof typeof BUTTON_CLASS_NAME.VARIANT]}
    ${isFullWidth ? BUTTON_CLASS_NAME.WIDTH.FULL : BUTTON_CLASS_NAME.WIDTH.BASE}
    ${iconOnly ? BUTTON_CLASS_NAME.ICON_ONLY : ""}
    ${isRounded ? BUTTON_CLASS_NAME.ROUNDED.FULL : BUTTON_CLASS_NAME.ROUNDED.BASE}
    ${customClassName}
  `
    .replaceAll(/\s+/g, " ")
    .trim()

  return (
    <button
      ref={buttonRef}
      data-config-id="tt"
      aria-pressed={isActive}
      className={combinedClassName}
      disabled={isDisabled || isLoading}
      type={type}
      {...rest}
    >
      <ButtonBackground
        isRounded={isRounded}
        variant={variant}
      />
      {isLoading && <ButtonSpinner />}
      {!isLoading && iconStart}
      {iconOnly ? isLoading ? <></> : children : <span>{children}</span>}
      {!isLoading && iconEnd}
    </button>
  )
}

export const BUTTON_CLASS_NAME = {
  BASE: styles.button,
  ICON_ONLY: styles.button__icon_only,
  ROUNDED: {
    BASE: styles.button__rounded_base,
    FULL: styles.button__rounded_full,
  },
  SIZE: {
    32: styles.button__size_32,
    36: styles.button__size_36,
    40: styles.button__size_40,
    44: styles.button__size_44,
    48: styles.button__size_48,
  },
  VARIANT: {
    ACCENT: styles.button__variant_accent,
    GHOST: styles.button__variant_ghost,
    PRIMARY: styles.button__variant_primary,
    SECONDARY: styles.button__variant_secondary,
  },
  WIDTH: {
    BASE: styles.button__width_base,
    FULL: styles.button__width_full,
  },
} as const


