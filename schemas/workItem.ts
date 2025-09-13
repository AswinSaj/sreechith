import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'workItem',
  title: 'Work Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Title of the work item'
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule) => Rule.required(),
      description: 'Thumbnail image displayed in the works grid'
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'URL to the video that plays on hover or in modal'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text description of the work item'
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      validation: (Rule) => Rule.max(200),
      description: 'Brief description for cards and previews'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'workCategory' }],
      validation: (Rule) => Rule.required(),
      description: 'Category this work item belongs to'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Order within the category'
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this work item should be displayed'
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      description: 'Client or company this work was created for'
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.min(1900).max(new Date().getFullYear() + 1),
      description: 'Year the work was completed'
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Tags for filtering and categorization'
    }),
    defineField({
      name: 'featured',
      title: 'Featured Work',
      type: 'boolean',
      initialValue: false,
      description: 'Whether this work should be highlighted as featured'
    }),
    defineField({
      name: 'expandableCardData',
      title: 'Expandable Card Data',
      type: 'object',
      fields: [
        defineField({
          name: 'cardTitle',
          title: 'Card Title',
          type: 'string'
        }),
        defineField({
          name: 'cardDescription',
          title: 'Card Description',
          type: 'text'
        }),
        defineField({
          name: 'cardImage',
          title: 'Card Image',
          type: 'image',
          options: {
            hotspot: true
          }
        })
      ],
      description: 'Additional data for expandable card display'
    })
  ],
  orderings: [
    {
      title: 'Category and Order',
      name: 'categoryOrder',
      by: [
        { field: 'category.displayOrder', direction: 'asc' },
        { field: 'order', direction: 'asc' }
      ]
    },
    {
      title: 'Most Recent',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }]
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      category: 'category.name',
      client: 'client',
      year: 'year'
    },
    prepare(selection) {
      const { title, media, category, client, year } = selection
      return {
        title: title,
        media: media,
        subtitle: `${category || 'No category'} - ${client || 'No client'} ${year ? `(${year})` : ''}`
      }
    }
  }
})