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

  // Animation configuration state for glow effect
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [glowColor, setGlowColor] = useState("#3b82f6")
  const [glowIntensity, setGlowIntensity] = useState(0.8)
  const [glowSize, setGlowSize] = useState(8)
  const [glowSpeed, setGlowSpeed] = useState(2)

  // Listen for animation configuration updates
  useEffect(() => {
    const element = buttonRef.current
    if (!element) return

    const handleAnimationUpdate = (event: CustomEvent) => {
      const params = event.detail
      if (params.glowColor !== undefined) setGlowColor(params.glowColor)
      if (params.glowIntensity !== undefined) setGlowIntensity(params.glowIntensity)
      if (params.glowSize !== undefined) setGlowSize(params.glowSize)
      if (params.glowSpeed !== undefined) setGlowSpeed(params.glowSpeed)
    }

    element.addEventListener("animation:update", handleAnimationUpdate as EventListener)
    return () => element.removeEventListener("animation:update", handleAnimationUpdate as EventListener)
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

  // Convert hex to RGB for shadow
  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : "59, 130, 246"
  }

  const rgb = hexToRgb(glowColor)
  const glowAnimation = `
    @keyframes borderGlow {
      0%, 100% {
        box-shadow: 
          0 0 ${glowSize * 0.5}px rgba(${rgb}, ${glowIntensity * 0.4}),
          0 0 ${glowSize}px rgba(${rgb}, ${glowIntensity * 0.3}),
          inset 0 0 ${glowSize * 0.5}px rgba(${rgb}, ${glowIntensity * 0.2});
      }
      50% {
        box-shadow: 
          0 0 ${glowSize * 1.5}px rgba(${rgb}, ${glowIntensity * 0.6}),
          0 0 ${glowSize * 2}px rgba(${rgb}, ${glowIntensity * 0.5}),
          inset 0 0 ${glowSize}px rgba(${rgb}, ${glowIntensity * 0.3});
      }
    }
  `

  const animationStyle = {
    animation: `borderGlow ${glowSpeed}s ease-in-out infinite`,
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: glowAnimation }} />
      <button
        ref={buttonRef}
        data-config-id="button-large-glow"
        aria-pressed={isActive}
        className={combinedClassName}
        disabled={isDisabled || isLoading}
        type={type}
        style={animationStyle}
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


