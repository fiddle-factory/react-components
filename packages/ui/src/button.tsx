import { useEffect, useRef, useState, type ComponentProps, type JSX, type ReactNode } from "react"
import styles from "@/button.module.css"
import { ButtonBackground } from "@/button-background"
import { ButtonSpinner } from "@/button-spinner"

// Helper function to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  hex = hex.replace(/^#/, '')
  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return { r, g, b }
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

  // Animation configuration state
  const [glowColor, setGlowColor] = useState("#3b82f6")
  const [glowIntensity, setGlowIntensity] = useState(0.6)
  const [glowSpeed, setGlowSpeed] = useState(2.5)
  const [borderWidth, setBorderWidth] = useState(2)

  // Listen for animation configuration updates
  useEffect(() => {
    const element = buttonRef.current
    if (!element) return

    const handleAnimationUpdate = (event: CustomEvent) => {
      const params = event.detail
      if (params.glowColor !== undefined) setGlowColor(params.glowColor)
      if (params.glowIntensity !== undefined) setGlowIntensity(params.glowIntensity)
      if (params.glowSpeed !== undefined) setGlowSpeed(params.glowSpeed)
      if (params.borderWidth !== undefined) setBorderWidth(params.borderWidth)
    }

    element.addEventListener('animation:update', handleAnimationUpdate as EventListener)
    return () => element.removeEventListener('animation:update', handleAnimationUpdate as EventListener)
  }, [])

  // Inject keyframe animation dynamically
  useEffect(() => {
    const styleId = 'button-glow-animation'
    let styleEl = document.getElementById(styleId) as HTMLStyleElement
    
    if (!styleEl) {
      styleEl = document.createElement('style')
      styleEl.id = styleId
      document.head.appendChild(styleEl)
    }

    const rgb = hexToRgb(glowColor)
    styleEl.textContent = `
      @keyframes buttonGlowPulse {
        0%, 100% {
          box-shadow: 0 0 ${8 * glowIntensity}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity}),
                      0 0 ${16 * glowIntensity}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity * 0.5}),
                      inset 0 0 ${6 * glowIntensity}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity * 0.2});
          border-color: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity * 0.8});
        }
        50% {
          box-shadow: 0 0 ${18 * glowIntensity}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity}),
                      0 0 ${32 * glowIntensity}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity * 0.7}),
                      inset 0 0 ${12 * glowIntensity}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity * 0.4});
          border-color: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity});
        }
      }
    `
  }, [glowColor, glowIntensity, glowSpeed])

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

  // Create dynamic styles for glowing border animation
  const rgb = hexToRgb(glowColor)
  const glowStyle: React.CSSProperties = {
    border: `${borderWidth}px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity * 0.8})`,
    animation: `buttonGlowPulse ${glowSpeed}s ease-in-out infinite`,
  }

  return (
    <button
      ref={buttonRef}
      data-config-id="button-glow-border"
      aria-pressed={isActive}
      className={combinedClassName}
      disabled={isDisabled || isLoading}
      type={type}
      style={glowStyle}
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


