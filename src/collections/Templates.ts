import type { CollectionConfig } from 'payload'

import { contentField } from '../fields/contentField'

// Preset block layouts. Pick one when creating a page; save any page as one via its sidebar.
export const Templates: CollectionConfig = {
  slug: 'templates',
  admin: { useAsTitle: 'title' },
  fields: [{ name: 'title', type: 'text', required: true }, contentField],
}
