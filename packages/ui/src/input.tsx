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
  const [gradientSpeed, setGradientSpeed] = useState(3)
  const [gradientIntensity, setGradientIntensity] = useState(0.8)
  const [primaryColor, setPrimaryColor] = useState("#e93d82")
  const [secondaryColor, setSecondaryColor] = useState("#3b82f6")
  const [borderWidth, setBorderWidth] = useState(2)
  
  // Listen for animation configuration updates
  useEffect(() => {
    const element = inputRef.current
    if (!element) return
    
    const handleAnimationUpdate = (event: CustomEvent) => {
      const params = event.detail
      if (params.gradientSpeed !== undefined) setGradientSpeed(params.gradientSpeed)
      if (params.gradientIntensity !== undefined) setGradientIntensity(params.gradientIntensity)
      if (params.primaryColor !== undefined) setPrimaryColor(params.primaryColor)
      if (params.secondaryColor !== undefined) setSecondaryColor(params.secondaryColor)
      if (params.borderWidth !== undefined) setBorderWidth(params.borderWidth)
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

  const gradientStyle = {
    background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor}, ${primaryColor})`,
    backgroundSize: '300% 300%',
    animation: `gradientBorder ${gradientSpeed}s ease infinite`,
    padding: `${borderWidth}px`,
    borderRadius: '10px',
    display: 'inline-block',
    width: '100%',
  }

  const inputStyle = {
    width: '100%',
    borderRadius: '8px',
    border: 'none',
    outline: 'none',
  }

  return (
    <div 
      data-config-id="storybook-root"
      style={gradientStyle}
    >
      <input
        ref={inputRef}
        aria-pressed={isActive}
        className={combinedClassName}
        disabled={isDisabled}
        readOnly={isReadOnly}
        required={isRequired}
        type={type}
        style={inputStyle}
        {...rest}
      />
      <style jsx>{`
        @keyframes gradientBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
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


