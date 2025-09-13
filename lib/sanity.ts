import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource, SanityImage, SanityFile } from './types'

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET')
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  apiVersion: '2024-01-01', // Use current date (YYYY-MM-DD) to target the latest API version
})

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper function to get optimized image URL
export function getImageUrl(source: SanityImageSource, width?: number, height?: number) {
  let imageBuilder = urlFor(source)

  if (width) {
    imageBuilder = imageBuilder.width(width)
  }

  if (height) {
    imageBuilder = imageBuilder.height(height)
  }

  return imageBuilder.url()
}

// Helper function for responsive images
export function getResponsiveImageUrl(source: SanityImageSource) {
  return {
    default: urlFor(source).width(800).url(),
    small: urlFor(source).width(400).url(),
    medium: urlFor(source).width(800).url(),
    large: urlFor(source).width(1200).url(),
  }
}

// Advanced image optimization utilities
export function getOptimizedImageUrl(
  source: SanityImageSource,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
    fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
    crop?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'focalpoint';
  } = {}
) {
  let imageBuilder = urlFor(source);

  if (options.width) imageBuilder = imageBuilder.width(options.width);
  if (options.height) imageBuilder = imageBuilder.height(options.height);
  if (options.quality) imageBuilder = imageBuilder.quality(options.quality);
  if (options.format) imageBuilder = imageBuilder.format(options.format);
  if (options.fit) imageBuilder = imageBuilder.fit(options.fit);
  if (options.crop) imageBuilder = imageBuilder.crop(options.crop);

  return imageBuilder.url();
}

// Generate srcSet for responsive images
export function generateImageSrcSet(source: SanityImageSource, widths: number[] = [400, 800, 1200, 1600]) {
  return widths
    .map(width => `${urlFor(source).width(width).url()} ${width}w`)
    .join(', ');
}

// Video URL processing utilities
export function processVideoUrl(url: string): {
  type: 'youtube' | 'vimeo' | 'direct' | 'unknown';
  embedUrl?: string;
  thumbnailUrl?: string;
  videoId?: string;
} {
  if (!url) return { type: 'unknown' };

  // YouTube URL patterns
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const youtubeMatch = url.match(youtubeRegex);

  if (youtubeMatch) {
    const videoId = youtubeMatch[1];
    return {
      type: 'youtube',
      videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    };
  }

  // Vimeo URL patterns
  const vimeoRegex = /(?:vimeo\.com\/)(?:.*\/)?(\d+)/;
  const vimeoMatch = url.match(vimeoRegex);

  if (vimeoMatch) {
    const videoId = vimeoMatch[1];
    return {
      type: 'vimeo',
      videoId,
      embedUrl: `https://player.vimeo.com/video/${videoId}`,
      thumbnailUrl: `https://vumbnail.com/${videoId}.jpg`
    };
  }

  // Direct video file (mp4, webm, etc.)
  const directVideoRegex = /\.(mp4|webm|ogg|mov|avi)(\?.*)?$/i;
  if (directVideoRegex.test(url)) {
    return {
      type: 'direct',
      embedUrl: url
    };
  }

  return { type: 'unknown' };
}

// Get video thumbnail from Sanity file or URL
export function getVideoThumbnail(videoSource: SanityImageSource | string, fallbackUrl?: string): string | null {
  // If it's a Sanity image reference, use it
  if (videoSource && typeof videoSource === 'object') {
    // Check if it's a proper SanityImage with _type
    if ('_type' in videoSource && videoSource._type === 'image') {
      return urlFor(videoSource).width(800).height(450).fit('crop').url();
    }
    // Check if it's an asset reference object
    if ('asset' in videoSource && videoSource.asset) {
      return urlFor(videoSource).width(800).height(450).fit('crop').url();
    }
  }

  // If it's a URL string, try to extract thumbnail
  if (typeof videoSource === 'string') {
    const processed = processVideoUrl(videoSource);
    return processed.thumbnailUrl || fallbackUrl || null;
  }

  return fallbackUrl || null;
}

// Sanity file URL helper
export function getSanityFileUrl(fileRef: SanityFile): string | null {
  if (!fileRef || !fileRef.asset) return null;

  const { projectId, dataset } = client.config();
  const assetId = fileRef.asset._ref;

  if (!assetId) return null;

  // Extract file extension and format from asset ID
  const [, id, extension] = assetId.match(/^file-([a-f0-9]+)-(\w+)$/) || [];

  if (!id || !extension) return null;

  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`;
}

// Error handling utilities
export function handleSanityError(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An error occurred while fetching data from Sanity CMS';
}

// Fallback data generators
export function createFallbackContent<T>(type: string, defaultData?: Partial<T>): T | null {
  const fallbacks: Record<string, unknown> = {
    showreel: {
      title: 'Demo Reel',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      isActive: true
    },
    featuredWork: [],
    testimonial: [],
    workItem: [],
    aboutContent: {
      aboutText: [{ _type: 'block', children: [{ text: 'About content coming soon...' }] }],
      timeline: []
    }
  };

  const fallback = fallbacks[type];
  return fallback ? { ...fallback, ...defaultData } as T : null;
}

// Type guards for Sanity data
export function isSanityImageSource(source: unknown): source is SanityImage {
  return (
    source !== null &&
    typeof source === 'object' &&
    (('_type' in source && (source as { _type: unknown })._type === 'image') || 
     'asset' in source)
  );
}

export function isSanityFileSource(source: unknown): source is SanityFile {
  return (
    source !== null &&
    typeof source === 'object' &&
    (('_type' in source && (source as { _type: unknown })._type === 'file') || 
     'asset' in source)
  );
}

// Batch fetch utility
export async function batchFetch<T>(queries: string[]): Promise<(T | null)[]> {
  try {
    const promises = queries.map(query => client.fetch<T>(query).catch(() => null));
    return await Promise.all(promises);
  } catch (error) {
    console.error('Batch fetch error:', error);
    return new Array(queries.length).fill(null);
  }
}

// Utility to convert Sanity blocks to plain text
export function blocksToText(blocks: Array<{ children?: Array<{ text?: string }> }>): string {
  return blocks
    .map(block => 
      block.children
        ?.map(child => child.text || '')
        .join('') || ''
    )
    .join('\n\n');
}