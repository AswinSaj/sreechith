import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: (Rule) => Rule.required().min(10).max(500),
      description: 'The testimonial quote text'
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Full name of the person giving the testimonial'
    }),
    defineField({
      name: 'authorRole',
      title: 'Author Role/Title',
      type: 'string',
      description: 'Job title or role of the author'
    }),
    defineField({
      name: 'authorCompany',
      title: 'Author Company',
      type: 'string',
      description: 'Company or organization the author works for'
    }),
    defineField({
      name: 'authorImage',
      title: 'Author Photo',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Profile photo of the testimonial author'
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this testimonial should be displayed on the website'
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Order in which this testimonial appears'
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      options: {
        list: [
          { title: '5 Stars', value: 5 },
          { title: '4 Stars', value: 4 },
          { title: '3 Stars', value: 3 },
          { title: '2 Stars', value: 2 },
          { title: '1 Star', value: 1 }
        ]
      },
      initialValue: 5,
      description: 'Star rating for the testimonial'
    })
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }]
    },
    {
      title: 'Most Recent',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'authorCompany',
      media: 'authorImage',
      quote: 'quote'
    },
    prepare(selection) {
      const { title, subtitle, media, quote } = selection
      return {
        title: title,
        subtitle: subtitle || quote?.substring(0, 50) + '...',
        media: media
      }
    }
  }
})