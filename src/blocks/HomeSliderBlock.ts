import type { Block } from 'payload'

export const HomeSliderBlock: Block = {
  slug: 'homeSlider',
  labels: { singular: 'Slider', plural: 'Slider' },
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/home-slider.webp',
  imageAltText: 'Customer logos carousel and testimonials',
  fields: [
    {
      name: 'hideBlock',
      type: 'checkbox',
      label: 'Hide this block on the website',
      defaultValue: false,
      admin: {
        description: 'If checked, this block will not be rendered on the frontend.',
      },
    },
    { name: 'title', type: 'text' },
    { name: 'description', type: 'richText', admin: { description: 'Bold text is highlighted.' } },
    {
      // One field for all logos: multi-select / bulk upload, drag to reorder; shown as a thumbnail grid (custom.scss)
      name: 'logos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: { className: 'i3d-logo-grid' },
      hooks: {
        afterRead: [
          // Blocks saved before this field kept one array row per logo (the hidden sliderItems below).
          // Runs before population, so the ids still get resolved to media docs; the next save stores them here.
          ({ value, siblingData }) =>
            value?.length ? value : (siblingData?.sliderItems || []).map((row: any) => row?.logo?.id ?? row?.logo).filter(Boolean),
        ],
      },
    },
    {
      // Legacy rows: kept only because the database adapter drops unknown keys on read, which would hide them
      // from the hook above. Cleared on save. shortcut: delete once every Slider has been re-saved.
      name: 'sliderItems',
      type: 'array',
      admin: { hidden: true },
      fields: [{ name: 'logo', type: 'upload', relationTo: 'media' }],
      hooks: { beforeChange: [() => []] },
    },
    {
      name: 'testimonials',
      type: 'array',
      admin: { components: { RowLabel: '/src/components/admin/ArrayRowLabel' } },
      fields: [
        { name: 'name', type: 'text' },
        { name: 'description', type: 'text', label: 'Role' },
        { name: 'text', type: 'textarea' },
        { name: 'img', type: 'upload', relationTo: 'media', label: 'Photo' },
      ],
    },
    { name: 'slidePerView', type: 'number', label: 'Testimonials per view (desktop)', defaultValue: 3, min: 1, max: 4 },
  ],
}
