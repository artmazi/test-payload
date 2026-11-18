'use client'
import type { SelectFieldClientComponent } from 'payload'
import { FieldDescription, FieldLabel, useField } from '@payloadcms/ui'
import { CategoryIcon, categoryIcons } from './categoryIcons'

// Visual picker for Categories.icon: one button per icon instead of a text dropdown
const IconPickerField: SelectFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<string>({ path })
  return (
    <div className="field-type i3d-icon-picker">
      <FieldLabel label={field.label || 'Icon'} path={path} />
      <div className="i3d-icon-picker__grid" role="radiogroup">
        {Object.entries(categoryIcons).map(([key, { label }]) => (
          <button key={key} type="button" role="radio" aria-checked={(value || 'layers') === key} aria-label={label} title={label} className="i3d-icon-picker__opt" onClick={() => setValue(key)}>
            <CategoryIcon name={key} size={24} />
          </button>
        ))}
      </div>
      <FieldDescription description={field.admin?.description} path={path} />
    </div>
  )
}
export default IconPickerField
