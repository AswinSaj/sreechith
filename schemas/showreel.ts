import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'showreel',
  title: 'Showreel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      description: 'Upload a video file for the showreel'
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Alternative: YouTube video URL (if not using video file)'
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Only one showreel should be active at a time'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of the showreel content'
    })
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive'
    },
    prepare(selection) {
      const { title, isActive } = selection
      return {
        title: title,
        subtitle: isActive ? 'Active' : 'Inactive'
      }
    }
  }
})