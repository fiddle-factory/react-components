"use client"

import { Button } from "@nattui/react-components"
import { ColorCombobox } from "@/components/color-combobox"

export default function ComboboxPage() {
  const GRAY_OPTIONS = [
    "color-gray-gray",
    "color-gray-mauve",
    "color-gray-slate",
    "color-gray-sage",
    "color-gray-olive",
    "color-gray-sand",
    "color-gray-gray-dark",
    "color-gray-mauve-dark",
    "color-gray-slate-dark",
    "color-gray-sage-dark",
    "color-gray-olive-dark",
    "color-gray-sand-dark",
  ] as const

  const PRIMARY_OPTIONS = [
    "color-primary-amber",
    "color-primary-blue",
    "color-primary-bronze",
    "color-primary-brown",
    "color-primary-crimson",
    "color-primary-cyan",
    "color-primary-gold",
    "color-primary-grass",
    "color-primary-green",
    "color-primary-indigo",
    "color-primary-iris",
    "color-primary-jade",
    "color-primary-lime",
    "color-primary-mint",
    "color-primary-orange",
    "color-primary-pink",
    "color-primary-plum",
    "color-primary-purple",
    "color-primary-red",
    "color-primary-ruby",
    "color-primary-sky",
    "color-primary-teal",
    "color-primary-tomato",
    "color-primary-violet",
    "color-primary-yellow",
    "color-primary-amber-dark",
    "color-primary-blue-dark",
    "color-primary-bronze-dark",
    "color-primary-brown-dark",
    "color-primary-crimson-dark",
    "color-primary-cyan-dark",
    "color-primary-gold-dark",
    "color-primary-grass-dark",
    "color-primary-green-dark",
    "color-primary-indigo-dark",
    "color-primary-iris-dark",
    "color-primary-jade-dark",
    "color-primary-lime-dark",
    "color-primary-mint-dark",
    "color-primary-orange-dark",
    "color-primary-pink-dark",
    "color-primary-plum-dark",
    "color-primary-purple-dark",
    "color-primary-red-dark",
    "color-primary-ruby-dark",
    "color-primary-sky-dark",
    "color-primary-teal-dark",
    "color-primary-tomato-dark",
    "color-primary-violet-dark",
    "color-primary-yellow-dark",
  ] as const

  return (
    <div className="flex flex-col gap-16">
      <ColorCombobox
        label="Gray palette"
        options={GRAY_OPTIONS}
        placeholder="e.g. color-gray-mauve"
      />
      <ColorCombobox
        label="Primary palette"
        options={PRIMARY_OPTIONS}
        placeholder="e.g. color-primary-red"
      />
      <Button variant="accent">Search</Button>
      <Button variant="primary">Search</Button>
    </div>
  )
}
