import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'musicFilm',
  title: 'Music Film',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Music Film Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Title of the music film'
    }),
    defineField({
      name: 'thumbnail',
      title: 'Film Thumbnail',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule) => Rule.required(),
      description: 'Thumbnail image for the music film'
    }),
    defineField({
      name: 'description',
      title: 'Film Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(500),
      description: 'Brief description of the music film'
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description: 'YouTube, Vimeo, or direct link to the music film'
    }),
    defineField({
      name: 'featured',
      title: 'Featured Film',
      type: 'boolean',
      initialValue: false,
      description: 'Mark as featured to highlight'
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Order in which this film appears'
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this film should be displayed'
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