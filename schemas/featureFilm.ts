import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'featureFilm',
  title: 'Feature Film',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Film Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Title of the feature film'
    }),
    defineField({
      name: 'thumbnail',
      title: 'Film Thumbnail',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule) => Rule.required(),
      description: 'Thumbnail image for the feature film (recommended: 800x1200px)'
    }),
    defineField({
      name: 'description',
      title: 'Film Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(500),
      description: 'Brief description of the film for the carousel'
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description: 'YouTube, Vimeo, or direct link to the film or trailer'
    }),
    defineField({
      name: 'featured',
      title: 'Featured Film',
      type: 'boolean',
      initialValue: false,
      description: 'Mark as featured to highlight in the carousel'
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Order in which this film appears (lower numbers appear first)'
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this film should be displayed on the website'
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
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
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