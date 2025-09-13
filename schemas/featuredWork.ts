import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'featuredWork',
  title: 'Featured Work',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule) => Rule.required(),
      description: 'Thumbnail image that will be displayed in the featured section'
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description: 'URL to the video that will play in the modal'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description shown in the video modal'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Commercial', value: 'commercial' },
          { title: 'Film', value: 'film' },
          { title: 'Music Video', value: 'music-video' },
          { title: 'Documentary', value: 'documentary' },
          { title: 'Other', value: 'other' }
        ]
      },
      initialValue: 'commercial'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Order in which this work appears in the featured section'
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this work should be displayed on the website'
    })
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      category: 'category',
      order: 'order'
    },
    prepare(selection) {
      const { title, media, category, order } = selection
      return {
        title: title,
        media: media,
        subtitle: `${category} - Order: ${order}`
      }
    }
  }
})