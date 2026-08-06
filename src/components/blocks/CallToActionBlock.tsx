import React from 'react'
import Link from 'next/link'

export const CallToActionBlock = ({ label, url }: any) => {
  return (
    <div className="my-6">
      <Link href={url} className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">
        {label}
      </Link>
    </div>
  )
}
