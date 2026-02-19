import { Button, Input, Label, Spacer } from "@nattui/react-components"
import {
  LucideBan,
  LucideCopy,
  LucideDownload,
  LucideEye,
  LucideLock,
  LucideLogIn,
  LucideMail,
} from "lucide-react"

export default function InputPage() {
  return (
    <div className="flex w-full max-w-320 flex-col">
      <Label
        className="mb-4"
        htmlFor="email"
      >
        Email
      </Label>
      <div className="relative">
        <LucideMail
          className="absolute top-14 left-14 text-gray-11"
          size={16}
        />
        <Input
          className="pl-44!"
          id="email"
          placeholder="name@example.com"
          size={44}
          type="email"
        />
      </div>
      <Spacer className="h-16" />

      <Label
        className="mb-4"
        htmlFor="password"
      >
        Password
      </Label>
      <div className="relative">
        <LucideLock
          className="absolute top-14 left-14 text-gray-11"
          size={16}
        />
        <Input
          className="px-44!"
          id="password"
          placeholder="••••••••"
          size={44}
          type="password"
        />
        <Button
          className="group absolute! top-6 right-6"
          iconOnly
          size={32}
          variant="ghost"
        >
          <LucideEye
            className="text-gray-11 transition-colors group-hover:text-gray-12 group-active:text-gray-12"
            size={16}
          />
        </Button>
      </div>
      <Spacer className="h-16" />

      <Button
        iconStart={<LucideLogIn size={16} />}
        isFullWidth
        size={44}
        variant="accent"
      >
        Sign in
      </Button>
      <Spacer className="h-64" />

      <Label
        className="mb-4"
        htmlFor="disabled"
      >
        Disabled
      </Label>
      <div className="relative">
        <LucideBan
          className="absolute top-14 left-14 text-gray-11"
          size={16}
        />
        <Input
          className="pl-44!"
          id="disabled"
          isDisabled
          placeholder="Disabled"
          size={44}
          type="url"
        />
      </div>
      <Spacer className="h-64" />

      <Label
        className="mb-4"
        htmlFor="read-only"
      >
        Read Only
      </Label>
      <div className="relative">
        <Input
          className="pr-44!"
          defaultValue="This is a read-only input"
          id="read-only"
          isReadOnly
          size={44}
          type="text"
        />
        <Button
          className="group absolute! top-6 right-6"
          iconOnly
          size={32}
          variant="ghost"
        >
          <LucideCopy
            className="text-gray-11 transition-colors group-hover:text-gray-12 group-active:text-gray-12"
            size={16}
          />
        </Button>
      </div>
      <Spacer className="h-64" />

      <Label
        className="mb-4"
        htmlFor="input-with-end-icon-button"
      >
        Input with end icon button
      </Label>
      <div className="flex">
        <Input
          className="rounded-r-none! hover:z-10 focus-visible:z-20"
          id="input-with-end-icon-button"
          placeholder="Download"
          size={44}
          type="url"
        />
        <Button
          className="group -ml-px rounded-l-none! shadow-none! hover:z-10 focus-visible:z-20"
          iconOnly
          size={44}
          variant="secondary"
        >
          <LucideDownload
            className="text-gray-11 transition-colors group-hover:text-gray-12 group-active:text-gray-12"
            size={16}
          />
        </Button>
      </div>
    </div>
  )
}
