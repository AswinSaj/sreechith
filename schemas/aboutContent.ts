import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutContent',
  title: 'About Content',
  type: 'document',
  fields: [
    defineField({
      name: 'ownerImage',
      title: 'Owner Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule) => Rule.required(),
      description: 'Main profile image of the website owner'
    }),
    defineField({
      name: 'ownerName',
      title: 'Owner Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Full name of the website owner'
    }),
    defineField({
      name: 'ownerTitle',
      title: 'Owner Title',
      type: 'string',
      description: 'Professional title or role'
    }),
    defineField({
      name: 'aboutText',
      title: 'About Text',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
      description: 'Rich text content for the about section'
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      validation: (Rule) => Rule.max(300),
      description: 'Brief biography for use in cards or previews'
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'timelineItem',
          title: 'Timeline Item',
          fields: [
            defineField({
              name: 'year',
              title: 'Year',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Year or date range for this timeline item'
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Title of the achievement or milestone'
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
              description: 'Description of what happened in this year'
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true
              },
              description: 'Optional image for this timeline item'
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Career', value: 'career' },
                  { title: 'Education', value: 'education' },
                  { title: 'Award', value: 'award' },
                  { title: 'Project', value: 'project' },
                  { title: 'Personal', value: 'personal' }
                ]
              },
              description: 'Category of this timeline item'
            })
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'year',
              media: 'image'
            }
          }
        }
      ],
      description: 'Timeline of career highlights and milestones'
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'List of professional skills and expertise'
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({
          name: 'imdb',
          title: 'IMDB URL',
          type: 'url'
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url'
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url'
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url'
        }),
        defineField({
          name: 'website',
          title: 'Personal Website',
          type: 'url'
        })
      ],
      description: 'Social media and professional profile links'
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
          type: 'email'
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string'
        }),
        defineField({
          name: 'location',
          title: 'Location',
          type: 'string'
        })
      ],
      description: 'Contact information (optional)'
    })
  ],
  preview: {
    select: {
      title: 'ownerName',
      subtitle: 'ownerTitle',
      media: 'ownerImage'
    }
  }
})