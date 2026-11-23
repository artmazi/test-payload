'use client'
import { Pill, SectionTitle, useField, useRowLabel } from '@payloadcms/ui'

// Block row header: Payload's own number, type pill and block name, plus the "hide on website" switch that used to
// be the first field in every block. A custom Label replaces the whole default label, hence the re-created parts.
export default function BlockHeader({ blockLabel }: { blockLabel: string }) {
  const { path, rowNumber = 0 } = useRowLabel()
  const { value: hidden, setValue, disabled } = useField<boolean>({ path: `${path}.hideBlock` })

  return (
    <span className={`i3d-block-header${hidden ? ' i3d-block-header--hidden' : ''}`}>
      <span className="blocks-field__block-number">{String(rowNumber + 1).padStart(2, '0')}</span>
      <Pill className="blocks-field__block-pill" pillStyle="white" size="small">
        {blockLabel}
      </Pill>
      <SectionTitle path={`${path}.blockName`} readOnly={disabled} />
      {/* The header is one big collapse toggle; keep clicks on the switch from opening/closing the block */}
      <label className="i3d-block-hide" title="Hide this block on the website" onClick={(e) => e.stopPropagation()}>
        <input type="checkbox" checked={!!hidden} disabled={disabled} onChange={(e) => setValue(e.target.checked)} />
        Hidden
      </label>
    </span>
  )
}
