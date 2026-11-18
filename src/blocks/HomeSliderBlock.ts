import type { Block } from 'payload'

export const HomeSliderBlock: Block = {
  slug: 'homeSlider',
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
    { name: 'description', type: 'textarea', admin: { description: '**bold** is highlighted; line breaks are kept.' } },
    {
      name: 'sliderItems',
      type: 'array',
      label: 'Logos',
      fields: [{ name: 'logo', type: 'upload', relationTo: 'media', required: true }],
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
