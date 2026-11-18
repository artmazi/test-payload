import type { Block } from 'payload'

// Stack of text / text+picture rows from infra3dcom's ProductPageSections/TextWithPicture
export const ProductTextWithPictureBlock: Block = {
  slug: 'productTextWithPicture',
  labels: { singular: 'Text with Picture', plural: 'Text with Pictures' },
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/text-with-picture.png',
  imageAltText: 'Rows of text next to pictures, with plain text rows between',
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
      name: 'background',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Light gray band', value: 'gray' },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      labels: { singular: 'Row', plural: 'Rows' },
      admin: { components: { RowLabel: '/src/components/admin/ArrayRowLabel' } },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'layout',
              type: 'select',
              required: true,
              defaultValue: 'text',
              options: [
                { label: 'Text only', value: 'text' },
                { label: 'Text left, picture right', value: 'textLeft' },
                { label: 'Text left (tinted box), picture right', value: 'textLeftBg' },
                { label: 'Picture left, text right', value: 'textRight' },
                { label: 'Picture left, text right (tinted box)', value: 'textRightBg' },
              ],
              admin: { width: '50%' },
            },
            {
              name: 'textStyle',
              type: 'select',
              required: true,
              defaultValue: 'body',
              options: [
                { label: 'Section title (centered)', value: 'sectionTitle' },
                { label: 'Large heading (**bold** = blue)', value: 'heading' },
                { label: 'Subheading', value: 'subheading' },
                { label: 'Body text (**bold** = bold)', value: 'body' },
              ],
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'split',
          type: 'select',
          label: 'Text / picture width',
          defaultValue: 'even',
          options: [
            { label: 'Equal (50 / 50)', value: 'even' },
            { label: 'Wider text (60 / 40)', value: 'text60' },
            { label: 'Wider picture (40 / 60)', value: 'picture60' },
          ],
          admin: {
            description: 'Desktop only; on phones the picture sits above the text.',
            condition: (_, sibling) => sibling?.layout && sibling.layout !== 'text',
          },
        },
        { name: 'title', type: 'text', admin: { description: 'Optional subheading above the text.' } },
        { name: 'content', type: 'textarea', required: true, admin: { description: 'Markdown: **bold**, [link](/path), lines starting with "- " form a bullet list. Empty lines start a new paragraph.' } },
        {
          name: 'button',
          type: 'group',
          admin: { hideGutter: true },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', label: 'Button label', admin: { width: '50%' } },
                { name: 'link', type: 'text', label: 'Button link', admin: { width: '50%', description: 'External links open in a new tab.' } },
              ],
            },
          ],
        },
        {
          name: 'picture',
          type: 'upload',
          relationTo: 'media',
          admin: { condition: (_, sibling) => sibling?.layout && sibling.layout !== 'text' },
        },
      ],
    },
    { name: 'text', type: 'textarea', label: 'Centered note below', admin: { description: 'Optional. Markdown.' } },
  ],
}
