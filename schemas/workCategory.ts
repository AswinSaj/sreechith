import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'workCategory',
  title: 'Work Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Name of the work category (e.g., Digital Commercials, Film Promos)'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: (Rule) => Rule.required(),
      description: 'URL-friendly version of the category name'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of this work category'
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Order in which this category appears on the works page'
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this category should be displayed on the website'
    }),
    defineField({
      name: 'useExpandableCards',
      title: 'Use Expandable Cards',
      type: 'boolean',
      initialValue: false,
      description: 'Whether works in this category should use expandable card layout'
    }),
    defineField({
      name: 'expandableCardType',
      title: 'Expandable Card Type',
      type: 'string',
      options: {
        list: [
          { title: 'Standard', value: 'standard' },
          { title: 'Grid', value: 'grid' }
        ]
      },
      hidden: ({ document }) => !document?.useExpandableCards,
      description: 'Type of expandable card layout to use'
    })
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      order: 'displayOrder'
    },
    prepare(selection) {
      const { title, subtitle, order } = selection
      return {
        title: title,
        subtitle: `Order: ${order} - ${subtitle || 'No description'}`
      }
    }
  }
})