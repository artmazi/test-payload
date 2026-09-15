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
  const [canEdit, setCanEdit] = useState(false)
  const textRef = useRef(initialText)

  useEffect(() => {
    // 1. If we are in the Payload Live Preview iframe, we are definitely authenticated as an admin
    if (window !== window.parent) {
      setCanEdit(true)
      return
    }

    // 2. Otherwise, ping Payload to see if we have an active admin session
    fetch('/api/users/me')
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setCanEdit(true)
        }
      })
      .catch((err) => console.error('Failed to check Payload auth session:', err))
  }, [])

  const handleBlur = async (e: React.FocusEvent<HTMLElement>) => {
    if (!canEdit) return
    const newText = e.currentTarget.innerText || ''
    if (newText === textRef.current) return

    const inIframe = window !== window.parent

    if (inIframe) {
      try {
        const parentDoc = window.parent.document
        const input = parentDoc.querySelector(`[name="${fieldPath}"]`) as HTMLInputElement | HTMLTextAreaElement
        
        if (input) {
          const nativeSetter = Object.getOwnPropertyDescriptor(
            window[input.tagName === 'TEXTAREA' ? 'HTMLTextAreaElement' : 'HTMLInputElement'].prototype,
            'value'
          )?.set
          
          if (nativeSetter) {
            nativeSetter.call(input, newText)
            input.dispatchEvent(new Event('input', { bubbles: true }))
            input.dispatchEvent(new Event('change', { bubbles: true }))
          }
          
          textRef.current = newText
          return
        } else {
          console.warn(`Could not find parent input for ${fieldPath}`)
        }
      } catch (err) {
        console.warn('Could not access parent document (cross-origin or error):', err)
      }
    }

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
      
      if (!res.ok) throw new Error('Failed to save')
      textRef.current = newText
    } catch (err) {
      console.error('Error saving inline edit:', err)
      e.currentTarget.innerText = textRef.current
    } finally {
      setIsSaving(false)
    }
  }

  // If not authenticated, render exactly like a normal static text element
  if (!canEdit) {
    return <Tag className={className}>{initialText}</Tag>
  }

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
