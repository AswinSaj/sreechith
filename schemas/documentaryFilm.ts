import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'documentaryFilm',
  title: 'Documentary Film',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Documentary Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Title of the documentary film'
    }),
    defineField({
      name: 'thumbnail',
      title: 'Documentary Thumbnail',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule) => Rule.required(),
      description: 'Thumbnail image for the documentary'
    }),
    defineField({
      name: 'description',
      title: 'Documentary Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(500),
      description: 'Brief description of the documentary'
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description: 'YouTube, Vimeo, or direct link to the documentary'
    }),
    defineField({
      name: 'featured',
      title: 'Featured Documentary',
      type: 'boolean',
      initialValue: false,
      description: 'Mark as featured to highlight'
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Order in which this documentary appears'
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this documentary should be displayed'
    })
  ],
  orderings: [
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'displayOrder', direction: 'asc' }
      ]
    },
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'displayOrder', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      featured: 'featured',
      isActive: 'isActive'
    },
    prepare(selection) {
      const { title, media, featured, isActive } = selection
      const subtitle = [
        featured && '⭐ Featured',
        !isActive && '❌ Inactive'
      ].filter(Boolean).join(' • ') || 'Active'
      
      return {
        title: title,
        media: media,
        subtitle: subtitle
      }
    }
  }
})