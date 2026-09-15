import type { Block } from 'payload'

export const HomeSliderBlock: Block = {
  slug: 'homeSlider',
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
    {
      name: 'sliderItems',
      type: 'array', fields: [{name:'text', type:'text'}],
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'text',
      type: 'textarea',
    },
    {
      name: 'slidePerView',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'img',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'testimonials',
      type: 'array', fields: [{name:'name', type:'text'}, {name:'text', type:'text'}, {name:'description', type:'text'}],
    },
  ],
}
