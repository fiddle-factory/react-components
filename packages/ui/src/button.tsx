import type { ComponentProps, JSX, ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import styles from "@/button.module.css"
import { ButtonBackground } from "@/button-background"
import { ButtonSpinner } from "@/button-spinner"

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
  const [glowColor, setGlowColor] = useState("#60a5fa")
  const [glowIntensity, setGlowIntensity] = useState(0.8)
  const [glowSpeed, setGlowSpeed] = useState(2)
  const [glowSize, setGlowSize] = useState(10)
  const [textColor, setTextColor] = useState("#ffffff")
  const [bgColor, setBgColor] = useState("#1e293b")

  useEffect(() => {
    const element = buttonRef.current
    if (!element) return

    const handleAnimationUpdate = (event: CustomEvent) => {
      const params = event.detail
      if (params.glowColor !== undefined) setGlowColor(params.glowColor)
      if (params.glowIntensity !== undefined) setGlowIntensity(params.glowIntensity)
      if (params.glowSpeed !== undefined) setGlowSpeed(params.glowSpeed)
      if (params.glowSize !== undefined) setGlowSize(params.glowSize)
      if (params.textColor !== undefined) setTextColor(params.textColor)
      if (params.bgColor !== undefined) setBgColor(params.bgColor)
    }

    element.addEventListener('animation:update', handleAnimationUpdate as EventListener)
    return () => element.removeEventListener('animation:update', handleAnimationUpdate as EventListener)
  }, [])

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

  const glowKeyframes = `
    @keyframes buttonGlow {
      0%, 100% {
        box-shadow: 0 0 ${glowSize}px rgba(${hexToRgb(glowColor).r}, ${hexToRgb(glowColor).g}, ${hexToRgb(glowColor).b}, ${glowIntensity * 0.4}),
                    0 0 ${glowSize * 2}px rgba(${hexToRgb(glowColor).r}, ${hexToRgb(glowColor).g}, ${hexToRgb(glowColor).b}, ${glowIntensity * 0.3}),
                    inset 0 0 ${glowSize}px rgba(${hexToRgb(glowColor).r}, ${hexToRgb(glowColor).g}, ${hexToRgb(glowColor).b}, ${glowIntensity * 0.2});
      }
      50% {
        box-shadow: 0 0 ${glowSize * 2}px rgba(${hexToRgb(glowColor).r}, ${hexToRgb(glowColor).g}, ${hexToRgb(glowColor).b}, ${glowIntensity}),
                    0 0 ${glowSize * 4}px rgba(${hexToRgb(glowColor).r}, ${hexToRgb(glowColor).g}, ${hexToRgb(glowColor).b}, ${glowIntensity * 0.6}),
                    inset 0 0 ${glowSize * 1.5}px rgba(${hexToRgb(glowColor).r}, ${hexToRgb(glowColor).g}, ${hexToRgb(glowColor).b}, ${glowIntensity * 0.4});
      }
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: glowKeyframes }} />
      <button
        ref={buttonRef}
        data-config-id="button-glow-animation"
        aria-pressed={isActive}
        className={combinedClassName}
        disabled={isDisabled || isLoading}
        type={type}
        style={{
          animation: `buttonGlow ${glowSpeed}s ease-in-out infinite`,
          color: textColor,
          backgroundColor: bgColor,
        }}
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
    </>
  )
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  hex = hex.replace(/^#/, '')
  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return { r, g, b }
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






