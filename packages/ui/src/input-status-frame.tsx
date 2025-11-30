import { useState } from "react"
import { Input } from "./input"
import styles from "./input-status-frame.module.css"

export interface InputStatusFrameProps {
  /**
   * The type of input to display
   */
  type?: "text" | "password" | "email"
  /**
   * The placeholder text for the input
   */
  placeholder?: string
  /**
   * The label text to display above the input
   */
  label?: string
}

export function InputStatusFrame({
  type = "password",
  placeholder = "Enter password...",
  label = "Password",
}: InputStatusFrameProps) {
  const [value, setValue] = useState("")
  const [status, setStatus] = useState<"success" | "error" | undefined>(undefined)
  const [statusText, setStatusText] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    
    // Simple validation logic
    if (newValue.length === 0) {
      setStatus(undefined)
      setStatusText("")
    } else if (newValue.length < 8) {
      setStatus("error")
      setStatusText("Password must be at least 8 characters")
    } else if (!/[A-Z]/.test(newValue)) {
      setStatus("error")
      setStatusText("Password must contain at least one uppercase letter")
    } else if (!/[0-9]/.test(newValue)) {
      setStatus("error")
      setStatusText("Password must contain at least one number")
    } else if (!/[^A-Za-z0-9]/.test(newValue)) {
      setStatus("error")
      setStatusText("Password must contain at least one special character")
    } else {
      setStatus("success")
      setStatusText("Password is strong")
    }
  }

  return (
    <div className={styles.frame}>
      {label && <div className={styles.label}>{label}</div>}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        status={status}
        statusText={statusText}
      />
    </div>
  )
}
