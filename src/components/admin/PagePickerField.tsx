'use client'
import type { RelationshipFieldClientComponent } from 'payload'
import { FieldDescription, FieldError, FieldLabel, ReactSelect, useConfig, useField, useLocale } from '@payloadcms/ui'
import { mergeFieldStyles } from '@payloadcms/ui/shared'
import { useEffect, useState } from 'react'

type PageOption = { value: string; label: string; category: string }

// Options get Payload's rs__ classes so they keep the admin's select look, plus the page's category underneath
const Option = ({ data, innerProps, innerRef, isFocused, isSelected }: any) => (
  <div ref={innerRef} {...innerProps} className={`rs__option i3d-page-opt${isFocused ? ' rs__option--is-focused' : ''}${isSelected ? ' rs__option--is-selected' : ''}`}>
    <span className="i3d-page-opt__title">{data.label}</span>
    {data.category && <span className="i3d-page-opt__path">{data.category}</span>}
  </div>
)

// The chosen page shows its category too, since group headers are only visible in the open menu
// getStyles carries react-select's own grid placement, so the search input overlays the value instead of wrapping below it
const SingleValue = (props: any) => (
  <div {...props.innerProps} className="rs__single-value" style={props.getStyles('singleValue', props)}>
    {props.data.category && <span className="i3d-page-opt__path">{props.data.category} › </span>}
    {props.data.label}
  </div>
)

// Page picker grouped by category: the stock relationship select only shows titles,
// and every category has pages with the same names (Home, Use Cases, ...)
const PagePickerField: RelationshipFieldClientComponent = ({ field, path, readOnly }) => {
  const { value, setValue, showError } = useField<string>({ path })
  const { config } = useConfig()
  const locale = useLocale()
  const [groups, setGroups] = useState<{ label: string; options: PageOption[] }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = `depth=1&limit=0&sort=title&locale=${locale.code}&select[title]=true&select[category]=true&populate[categories][title]=true`
    fetch(`${config.serverURL}${config.routes.api}/pages?${params}`, { credentials: 'include' })
      .then((res) => res.json())
      .then(({ docs = [] }) => {
        const byCategory = new Map<string, PageOption[]>()
        for (const p of docs) {
          const category = p.category?.title || ''
          byCategory.set(category, [...(byCategory.get(category) || []), { value: p.id, label: p.title, category }])
        }
        // Categories alphabetically, pages without one last
        const sorted = [...byCategory].sort(([a], [b]) => (!a ? 1 : !b ? -1 : a.localeCompare(b)))
        setGroups(sorted.map(([category, options]) => ({ label: category || 'No category', options })))
      })
      .catch(() => setGroups([]))
      .finally(() => setLoading(false))
  }, [config.serverURL, config.routes.api, locale.code])

  const selected = groups.flatMap((g) => g.options).find((o) => o.value === value)

  return (
    <div className="field-type select" style={mergeFieldStyles(field)}>
      <FieldLabel label={field.label || 'Page'} path={path} required={field.required} />
      <div className="field-type__wrap">
        <FieldError path={path} showError={showError} />
        <ReactSelect
          options={groups}
          value={selected}
          isLoading={loading}
          isClearable
          disabled={readOnly}
          showError={showError}
          components={{ Option, SingleValue }}
          // Search the category as well as the title
          filterOption={(option: any, search: string) => {
            const d = option?.data
            return !search || `${d?.label} ${d?.category}`.toLowerCase().includes(search.toLowerCase())
          }}
          onChange={(option: any) => setValue(option?.value ?? null)}
        />
      </div>
      <FieldDescription description={field.admin?.description} path={path} />
    </div>
  )
}
export default PagePickerField
