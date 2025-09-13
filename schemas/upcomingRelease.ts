import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'upcomingRelease',
  title: 'Upcoming Release (2025)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Title of the upcoming release'
    }),
    defineField({
      name: 'thumbnail',
      title: 'Project Thumbnail',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule) => Rule.required(),
      description: 'Thumbnail image for the upcoming project'
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(500),
      description: 'Brief description of the upcoming project'
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description: 'YouTube, Vimeo, or direct link to teaser/trailer'
    }),
    defineField({
      name: 'releaseDate',
      title: 'Expected Release Date',
      type: 'date',
      description: 'Expected release date for the project'
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
      description: 'Mark as featured to highlight'
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Order in which this project appears'
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this project should be displayed'
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
      title: 'Release Date',
      name: 'releaseDate',
      by: [{ field: 'releaseDate', direction: 'asc' }]
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
      isActive: 'isActive',
      releaseDate: 'releaseDate'
    },
    prepare(selection) {
      const { title, media, featured, isActive, releaseDate } = selection
      const subtitle = [
        releaseDate && new Date(releaseDate).toLocaleDateString(),
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