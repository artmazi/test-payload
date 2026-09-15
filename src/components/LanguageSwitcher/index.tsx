'use client'
import { useRouter, usePathname } from 'next/navigation'

export default function LanguageSwitcher({ className }: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  
  // Quick helper to switch language in the URL (e.g., /de/about -> /en/about)
  const switchLang = (lang: string) => {
    if (!pathname) return
    const segments = pathname.split('/')
    segments[1] = lang // Assuming /[lang]/... is the structure
    router.push(segments.join('/'))
  }

  return (
    <div className={`flex gap-2 ${className || ''}`}>
      <button onClick={() => switchLang('de')} className="hover:text-blue-500">DE</button>
      <button onClick={() => switchLang('en')} className="hover:text-blue-500">EN</button>
      <button onClick={() => switchLang('fr')} className="hover:text-blue-500">FR</button>
      <button onClick={() => switchLang('it')} className="hover:text-blue-500">IT</button>
    </div>
  )
}
