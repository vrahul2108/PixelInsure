import Image from "next/image"
import Link from "next/link"
import pixelLogo from "../../public/images/pixel-insure-logo.png"

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur `supports-[backdrop-filter]:bg-background/60`">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src={pixelLogo}
            alt="PixelInsure"
            width={180}
            height={36}
            className="h-8 w-auto sm:h-9"
            priority
          />
        </Link>
        <div className="flex-1" />
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-foreground/60 transition-colors hover:text-foreground hidden sm:inline-block">
            Home
          </Link>
          <Link
            href="/help"
            className="text-foreground/60 transition-colors hover:text-foreground hidden sm:inline-block"
          >
            Help
          </Link>
        </nav>
      </div>
    </header>
  )
}
