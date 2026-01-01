import { useRef, useState, type ComponentProps, type JSX } from "react"
import styles from "@/add-to-cart.module.css"
import { FireworksOverlay } from "@/fireworks-overlay"

export interface AddToCartProps extends Omit<ComponentProps<"button">, "children"> {
  text?: string
}

export function AddToCart({ text = "Add to cart", className = "", onClick, ...rest }: AddToCartProps): JSX.Element {
  const [isAdding, setIsAdding] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const cartRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const itemRef = useRef<SVGRectElement>(null)
  const dummyRef = useRef<HTMLSpanElement>(null)
  const checkRef = useRef<HTMLSpanElement>(null)
  const staticBorderRef = useRef<HTMLSpanElement>(null)
  const completeBorderRef = useRef<HTMLSpanElement>(null)
  const animatedBorderRef = useRef<HTMLSpanElement>(null)

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isAdding) return

    setShowFireworks(true)
    setIsAdding(true)
    onClick?.(e)

    const cart = cartRef.current
    const textEl = textRef.current
    const item = itemRef.current
    const dummy = dummyRef.current
    const check = checkRef.current
    const staticBorder = staticBorderRef.current
    const completeBorder = completeBorderRef.current
    const animatedBorder = animatedBorderRef.current

    if (!cart || !textEl || !item || !dummy || !check || !staticBorder || !completeBorder || !animatedBorder)
      return

    const dummyRect = dummy.getBoundingClientRect()
    const cartRect = cart.getBoundingClientRect()
    const distance = dummyRect.left - cartRect.left

    // Animation sequence
    setIsComplete(true)

    // Step 1: Move cart and text (220ms)
    cart.style.transform = `translateX(${distance}px) rotate(-20deg)`
    textEl.style.opacity = "0"
    textEl.style.transform = `translateX(${distance}px)`
    textEl.style.filter = "blur(6px)"

    setTimeout(() => {
      cart.style.transform = `translateX(${distance}px) rotate(0deg)`
    }, 110)

    // Step 2: Drop item and show static border (100ms delay)
    setTimeout(() => {
      if (item) item.style.transform = "translateY(0)"
      if (staticBorder) staticBorder.style.opacity = "1"
      if (animatedBorder) animatedBorder.style.opacity = "0"
      setIsComplete(false)
    }, 330)

    // Step 3: Move cart further with rotation (600ms, 100ms delay)
    setTimeout(() => {
      cart.style.transform = `translateX(${distance * 4}px) rotate(-30deg)`
      if (completeBorder) completeBorder.style.opacity = "1"
      if (check) {
        check.style.opacity = "1"
        check.style.scale = "1.5"
      }
    }, 430)

    // Step 4: Check scale back
    setTimeout(() => {
      if (check) check.style.scale = "1"
    }, 680)

    setTimeout(() => {
      if (check) check.style.scale = "1.5"
    }, 805)

    // Step 5: Hide borders (125ms delay after check animation)
    setTimeout(() => {
      if (staticBorder) staticBorder.style.opacity = "0"
      if (completeBorder) completeBorder.style.opacity = "0"
      if (check) check.style.scale = "1"
    }, 1055)

    // Step 6: Reset cart and text position
    setTimeout(() => {
      cart.style.transform = "translateX(-100px) rotate(0deg)"
      textEl.style.transform = "translateX(0)"
      if (item) item.style.transform = "translateY(-24px)"
    }, 1180)

    // Step 7: Show text and complete reset
    setTimeout(() => {
      textEl.style.opacity = "1"
      textEl.style.filter = "blur(0px)"
      cart.style.transform = "translateX(0)"
      if (check) {
        check.style.opacity = "0"
        check.style.scale = "1"
      }
    }, 1180)

    setTimeout(() => {
      if (animatedBorder) animatedBorder.style.opacity = "1"
      setIsAdding(false)
    }, 2180)
  }

  const combinedClassName = `${styles.atc} ${className}`.trim()

  return (
    <>
      <button
        className={combinedClassName}
        data-adding={isAdding}
        data-complete={isComplete}
        onClick={handleClick}
        {...rest}
      >
        <span className={styles.atcContent}>
          <span
            ref={cartRef}
            className={styles.atcCart}
            style={{ transition: "transform 0.5s ease-out, rotate 0.11s" }}
          >
            <svg className={styles.atcIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <rect
                ref={itemRef}
                className={styles.atcCartContent}
                x="9"
                y="-1"
                width="10"
                height="10"
                fill="green"
                rx="2"
                style={{ transform: "translateY(-24px)", transition: "transform 0.1s" }}
              />
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
          </span>
          <span ref={dummyRef} className={styles.atcCartDummy}>
            <svg className={styles.atcIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
          </span>
          <span
            ref={checkRef}
            className={styles.atcCheck}
            style={{ transition: "all 0.25s" }}
          >
            <svg
              className={styles.atcIcon}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </span>
          <span
            ref={textRef}
            className={styles.atcText}
            style={{ transition: "all 0.22s" }}
          >
            {text}
          </span>
        </span>
        <span
          ref={animatedBorderRef}
          className={`${styles.atcBorder} ${styles.atcBorderAnimated}`}
          style={{ transition: "opacity 1s" }}
        />
        <span
          ref={staticBorderRef}
          className={`${styles.atcBorder} ${styles.atcBorderStatic}`}
          style={{ transition: "opacity 0.1s" }}
        />
        <span
          ref={completeBorderRef}
          className={`${styles.atcBorder} ${styles.atcBorderComplete}`}
          style={{ transition: "opacity 0.22s" }}
        />
      </button>
      {showFireworks && <FireworksOverlay onClose={() => setShowFireworks(false)} />}
    </>
  )
}

