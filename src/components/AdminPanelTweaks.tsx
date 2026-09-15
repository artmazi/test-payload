'use client'

import React from 'react'
// import './admin-tweaks.css'

export default function AdminPanelTweaks({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .collection-edit__main--is-live-previewing {
          width: 25% !important;
          min-width: 25% !important;
          max-width: 25% !important;
        }

        .live-preview-window {
          width: 75% !important;
          max-width: 75% !important;
          flex-grow: 1 !important;
        }
      ` }} />
      {children}
    </>
  )
}
