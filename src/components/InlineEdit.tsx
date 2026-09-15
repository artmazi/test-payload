'use client'

import React, { useState, useRef, useEffect } from 'react'

interface InlineEditProps {
  pageId?: string
  fieldPath: string
  initialText: string
  tag?: any
  className?: string
}

export const InlineEdit: React.FC<InlineEditProps> = ({
  pageId,
  fieldPath,
  initialText,
  tag: Tag = 'div',
  className = '',
}) => {
  const [isSaving, setIsSaving] = useState(false)
  const textRef = useRef(initialText)

  const handleBlur = async (e: React.FocusEvent<HTMLElement>) => {
    const newText = e.currentTarget.textContent || ''
    
    // Only save if it actually changed
    if (newText === textRef.current) return
    if (!pageId) {
      console.warn('No pageId provided to InlineEdit, cannot save.')
      return
    }

    setIsSaving(true)
    try {
      const res = await fetch('/api/custom-edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collection: 'pages',
          id: pageId,
          path: fieldPath,
          value: newText,
        }),
      })
      
      if (!res.ok) {
        throw new Error('Failed to save')
      }
      
      textRef.current = newText
    } catch (err) {
      console.error('Error saving inline edit:', err)
      // Revert text on failure
      e.currentTarget.textContent = textRef.current
    } finally {
      setIsSaving(false)
    }
  }

  // A visual indicator so we know it's editable
  const editableClasses = 'hover:outline hover:outline-2 hover:outline-blue-400 hover:bg-blue-50/50 cursor-text transition-all rounded px-1 -mx-1'

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={`${className} ${editableClasses} ${isSaving ? 'opacity-50' : ''}`}
    >
      {initialText}
    </Tag>
  )
}
