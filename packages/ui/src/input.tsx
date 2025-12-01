import type { ComponentProps, JSX } from "react"
import { useEffect, useRef, useState } from "react"
import styles from "@/input.module.css"

export interface InputProps
  extends Omit<ComponentProps<"input">, "aria-pressed" | "disabled" | "readOnly" | "required"> {
  isActive?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  isRequired?: boolean
  size?: 32 | 36 | 40 | 44
}

export function Input(props: InputProps): JSX.Element {
  const {
    className: customClassName = "",
    isActive = false,
    isDisabled = false,
    isReadOnly = false,
    isRequired = false,
    size = 40,
    type = "text",
    ...rest
  } = props

  const isPassword = type === "password"
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Animation configuration state
  const [backgroundColor, setBackgroundColor] = useState("#ff8c00")
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.15)
  const [backgroundAnimation, setBackgroundAnimation] = useState(true)
  const [backgroundSpeed, setBackgroundSpeed] = useState(4)
  const [pulseIntensity, setPulseIntensity] = useState(0.3)
  
  // Listen for animation configuration updates
  useEffect(() => {
    const element = inputRef.current
    if (!element) return
    
    const handleAnimationUpdate = (event: CustomEvent) => {
      const params = event.detail
      if (params.backgroundColor !== undefined) setBackgroundColor(params.backgroundColor)
      if (params.backgroundOpacity !== undefined) setBackgroundOpacity(params.backgroundOpacity)
      if (params.backgroundAnimation !== undefined) setBackgroundAnimation(params.backgroundAnimation)
      if (params.backgroundSpeed !== undefined) setBackgroundSpeed(params.backgroundSpeed)
      if (params.pulseIntensity !== undefined) setPulseIntensity(params.pulseIntensity)
    }
    
    element.addEventListener('animation:update', handleAnimationUpdate as EventListener)
    return () => element.removeEventListener('animation:update', handleAnimationUpdate as EventListener)
  }, [])

  const combinedClassName = `
    ${INPUT_CLASS_NAME.BASE}
    ${INPUT_CLASS_NAME.SIZE[size]}
    ${isPassword ? INPUT_CLASS_NAME.PASSWORD : ""}
    ${customClassName}
  `
    .replaceAll(/\s+/g, " ")
    .trim()

  // Helper function to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  const animatedStyle = {
    backgroundColor: hexToRgba(backgroundColor, backgroundOpacity),
    animation: backgroundAnimation ? `backgroundPulse ${backgroundSpeed}s ease-in-out infinite` : 'none',
    transition: 'all 0.3s ease',
  }

  return (
    <div data-config-id="storybook-root">
      <input
        ref={inputRef}
        aria-pressed={isActive}
        className={combinedClassName}
        disabled={isDisabled}
        readOnly={isReadOnly}
        required={isRequired}
        type={type}
        style={animatedStyle}
        {...rest}
      />
      <style jsx>{`
        @keyframes backgroundPulse {
          0%, 100% { 
            background-color: ${hexToRgba(backgroundColor, backgroundOpacity)};
          }
          50% { 
            background-color: ${hexToRgba(backgroundColor, backgroundOpacity + pulseIntensity)};
          }
        }
      `}</style>
    </div>
  )
}

export const INPUT_CLASS_NAME = {
  BASE: styles.input,
  PASSWORD: styles.input__password,
  SIZE: {
    32: styles.input__size_32,
    36: styles.input__size_36,
    40: styles.input__size_40,
    44: styles.input__size_44,
  },
} as const


