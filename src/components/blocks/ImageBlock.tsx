import React from 'react'

export const ImageBlock = ({ image }: any) => {
  if (!image || typeof image === 'string') return null
  return (
    <div className="my-8 rounded overflow-hidden shadow-lg border border-gray-100">
      <img src={image.url} alt={image.alt || 'Image'} className="w-full h-auto" />
    </div>
  )
}
