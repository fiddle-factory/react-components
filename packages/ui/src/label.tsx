import { useEffect, useRef, useState } from "react"
import type { ComponentProps, JSX } from "react"
import styles from "@/label.module.css"

export interface LabelProps extends ComponentProps<"label"> {}

export function Label(props: LabelProps): JSX.Element {
  const { className: customClassName = "", ...rest } = props
  const labelRef = useRef<HTMLLabelElement>(null)
  
  // Animation configuration state
  const [highlightColor, setHighlightColor] = useState("#ff8c00")
  const [highlightOpacity, setHighlightOpacity] = useState(0.3)
  const [animationDuration, setAnimationDuration] = useState(1.5)
  const [highlightWidth, setHighlightWidth] = useState(120)
  
  // Listen for animation configuration updates
  useEffect(() => {
    const element = labelRef.current
    if (!element) return
    
    const handleAnimationUpdate = (event: CustomEvent) => {
      const params = event.detail
      if (params.highlightColor !== undefined) setHighlightColor(params.highlightColor)
      if (params.highlightOpacity !== undefined) setHighlightOpacity(params.highlightOpacity)
      if (params.animationDuration !== undefined) setAnimationDuration(params.animationDuration)
      if (params.highlightWidth !== undefined) setHighlightWidth(params.highlightWidth)
    }
    
    element.addEventListener('animation:update', handleAnimationUpdate as EventListener)
    return () => element.removeEventListener('animation:update', handleAnimationUpdate as EventListener)
  }, [])

  const combinedClassName = `
    ${LABEL_CLASS_NAME.BASE}
    ${customClassName}
  `
    .replaceAll(/\s+/g, " ")
    .trim()

  return (
    <>
      <label
        ref={labelRef}
        data-config-id="label-highlight-animation"
        className={combinedClassName}
        style={{
          position: 'relative',
          background: `linear-gradient(90deg, 
            transparent 0%, 
            ${highlightColor}${Math.round(highlightOpacity * 255).toString(16).padStart(2, '0')} 50%, 
            transparent 100%)`,
          backgroundSize: `${highlightWidth}% 100%`,
          backgroundPosition: '-100% 0',
          animation: `highlightSweep ${animationDuration}s ease-in-out infinite`,
        }}
        {...rest}
      />
      <style>{`
        @keyframes highlightSweep {
          0% {
            background-position: -100% 0;
          }
          50% {
            background-position: 200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </>
  )
}

export const LABEL_CLASS_NAME = {
  BASE: styles.label,
} as const

