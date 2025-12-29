import { useEffect, useRef, useState, type ComponentProps, JSX, ReactNode } from "react"
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
  const [glowSize, setGlowSize] = useState(8)
  const [animationSpeed, setAnimationSpeed] = useState(2)
  
  // Listen for animation configuration updates
  useEffect(() => {
    const element = buttonRef.current
    if (!element) return
    
    const handleAnimationUpdate = (event: CustomEvent) => {
      const params = event.detail
      if (params.glowColor !== undefined) setGlowColor(params.glowColor)
      if (params.glowIntensity !== undefined) setGlowIntensity(params.glowIntensity)
      if (params.glowSize !== undefined) setGlowSize(params.glowSize)
      if (params.animationSpeed !== undefined) setAnimationSpeed(params.animationSpeed)
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

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 59, g: 130, b: 246 }
  }

  const rgb = hexToRgb(glowColor)
  const boxShadowValue = `0 0 ${glowSize}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity}), 0 0 ${glowSize * 2}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity * 0.5}), inset 0 0 ${glowSize}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity * 0.3})`

  return (
    <button
      ref={buttonRef}
      data-config-id="button-border-glow"
      aria-pressed={isActive}
      className={combinedClassName}
      disabled={isDisabled || isLoading}
      type={type}
      style={{
        animation: `borderGlow ${animationSpeed}s ease-in-out infinite`,
        boxShadow: boxShadowValue,
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
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes borderGlow {
            0%, 100% {
              filter: brightness(1);
              box-shadow: 0 0 ${glowSize}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity}), 0 0 ${glowSize * 2}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity * 0.5}), inset 0 0 ${glowSize}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity * 0.3});
            }
            50% {
              filter: brightness(1.2);
              box-shadow: 0 0 ${glowSize * 1.5}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity * 1.2}), 0 0 ${glowSize * 3}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity * 0.7}), inset 0 0 ${glowSize * 1.5}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity * 0.5});
            }
          }
        `
      }} />
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


