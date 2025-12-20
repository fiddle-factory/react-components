import { useEffect, useRef, useState, type ComponentProps, type JSX, type ReactNode } from "react"
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
  
  // Animation configuration state
  const [glowColor, setGlowColor] = useState("#3b82f6")
  const [glowIntensity, setGlowIntensity] = useState(0.6)
  const [glowSpeed, setGlowSpeed] = useState(2)
  const [glowSpread, setGlowSpread] = useState(15)
  
  // Listen for animation configuration updates
  useEffect(() => {
    const element = buttonRef.current
    if (!element) return
    
    const handleAnimationUpdate = (event: CustomEvent) => {
      const params = event.detail
      if (params.glowColor !== undefined) setGlowColor(params.glowColor)
      if (params.glowIntensity !== undefined) setGlowIntensity(params.glowIntensity)
      if (params.glowSpeed !== undefined) setGlowSpeed(params.glowSpeed)
      if (params.glowSpread !== undefined) setGlowSpread(params.glowSpread)
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

  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  return (
    <>
      <button
        ref={buttonRef}
        aria-pressed={isActive}
        className={combinedClassName}
        disabled={isDisabled || isLoading}
        type={type}
        data-config-id="button-border-glow"
        style={{
          animation: `borderGlow ${glowSpeed}s ease-in-out infinite`,
          boxShadow: `0 0 ${glowSpread}px ${hexToRgba(glowColor, glowIntensity * 0.5)}, 0 0 ${glowSpread * 2}px ${hexToRgba(glowColor, glowIntensity * 0.3)}, inset 0 0 ${glowSpread}px ${hexToRgba(glowColor, glowIntensity * 0.2)}`
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
      <style>{`
        @keyframes borderGlow {
          0%, 100% {
            filter: brightness(1) drop-shadow(0 0 ${glowSpread * 0.5}px ${hexToRgba(glowColor, glowIntensity * 0.4)});
          }
          50% {
            filter: brightness(1.1) drop-shadow(0 0 ${glowSpread}px ${hexToRgba(glowColor, glowIntensity * 0.8)});
          }
        }
      `}</style>
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


