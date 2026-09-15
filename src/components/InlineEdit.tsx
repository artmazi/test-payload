'use client'

import React, { useState, useRef } from 'react'

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
    if (newText === textRef.current) return

    // 1. Are we inside the Payload Live Preview iframe?
    const inIframe = window !== window.parent

    if (inIframe) {
      // If we are in the Admin panel iframe, we MUST update the React Hook Form in the sidebar
      // otherwise clicking 'Save' will overwrite the database with the sidebar's stale data.
      try {
        const parentDoc = window.parent.document
        // Payload v3 inputs typically use name="path" e.g. name="content.0.title"
        const input = parentDoc.querySelector(`[name="${fieldPath}"]`) as HTMLInputElement | HTMLTextAreaElement
        
        if (input) {
          // React overrides standard input setters, so we must call the native setter to trigger events properly
          const nativeSetter = Object.getOwnPropertyDescriptor(
            window[input.tagName === 'TEXTAREA' ? 'HTMLTextAreaElement' : 'HTMLInputElement'].prototype,
            'value'
          )?.set
          
          if (nativeSetter) {
            nativeSetter.call(input, newText)
            // Dispatch input event for React Hook Form to catch it
            input.dispatchEvent(new Event('input', { bubbles: true }))
            input.dispatchEvent(new Event('change', { bubbles: true }))
          }
          
          textRef.current = newText
          return // Successfully updated parent form, stop here so user can click Save in sidebar.
        } else {
          console.warn(`Could not find parent input for ${fieldPath}`)
        }
      } catch (err) {
        console.warn('Could not access parent document (cross-origin or error):', err)
      }
    }

    // 2. If we are NOT in the iframe (viewing the live site), or parent update failed, use API
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
      e.currentTarget.textContent = textRef.current // Revert on failure
    } finally {
      setIsSaving(false)
    }
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
