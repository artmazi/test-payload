'use client'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

const locales = [
  { code: 'de', label: 'Deutsch' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
];

export default function LanguageSwitcher({ className }: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Quick helper to switch language in the URL (e.g., /de/about -> /en/about)
  const switchLang = (lang: string) => {
    if (!pathname) return
    const segments = pathname.split('/')
    segments[1] = lang // Assuming /[lang]/... is the structure
    router.push(segments.join('/'))
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLang = pathname ? pathname.split('/')[1] : 'de'

  return (
    <div className={`flex relative gap-2 justify-center items-center ms-4 ${className || ''}`} ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-[8px] text-white rounded-full hover:bg-light hover:text-orange2 transition-colors cursor-pointer"
        aria-label="Switch Language"
      >
        <img className="w-[24px]" alt={currentLang} src="/language-icon.svg" />
      </button>

      {isOpen && (
        <div className="absolute top-[120%] right-0 bg-white border border-[#0000001A] rounded shadow-lg overflow-hidden flex flex-col z-[999] min-w-[120px]">
          {locales.map((locale) => (
            <button
              key={locale.code}
              onClick={() => switchLang(locale.code)}
              className={`px-4 py-2 text-sm text-left hover:bg-water transition-colors cursor-pointer ${
                currentLang === locale.code ? 'font-bold text-sky' : 'text-blackTeal'
              }`}
            >
              {locale.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
