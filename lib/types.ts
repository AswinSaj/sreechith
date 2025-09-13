// TypeScript interfaces for Sanity content types

// Base Sanity document interface
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt?: string;
  _updatedAt?: string;
  _rev?: string;
}

// Sanity image source type (can be image object or reference)
export type SanityImageSource = SanityImage | { asset: { _ref: string } } | string;

// Sanity image interface
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

// Sanity file interface
export interface SanityFile {
  _type: 'file';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

// Rich text block interface
export interface SanityBlock {
  _type: 'block';
  _key: string;
  style?: string;
  children: Array<{
    _type: 'span';
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _type: string;
    _key: string;
    [key: string]: unknown;
  }>;
}

// Showreel content type
export interface Showreel extends SanityDocument {
  _type: 'showreel';
  title: string;
  videoFile?: SanityFile;
  youtubeUrl?: string;
  isActive: boolean;
}

// Featured work content type
export interface FeaturedWork extends SanityDocument {
  _type: 'featuredWork';
  title: string;
  thumbnail: SanityImage;
  videoUrl: string;
  description: string;
  category: string;
  order: number;
}

// Feature film content type
export interface FeatureFilm extends SanityDocument {
  _type: 'featureFilm';
  title: string;
  thumbnail: SanityImage;
  description: string;
  videoUrl: string;
  featured?: boolean;
  displayOrder?: number;
  isActive?: boolean;
}

// Web series content type
export interface WebSeries extends SanityDocument {
  _type: 'webSeries';
  title: string;
  thumbnail: SanityImage;
  description: string;
  videoUrl: string;
  featured?: boolean;
  displayOrder?: number;
  isActive?: boolean;
}

// Short original film content type
export interface ShortOriginalFilm extends SanityDocument {
  _type: 'shortOriginalFilm';
  title: string;
  thumbnail: SanityImage;
  description: string;
  videoUrl: string;
  featured?: boolean;
  displayOrder?: number;
  isActive?: boolean;
}

// Digital commercial content type
export interface DigitalCommercial extends SanityDocument {
  _type: 'digitalCommercial';
  title: string;
  thumbnail: SanityImage;
  description: string;
  videoUrl: string;
  featured?: boolean;
  displayOrder?: number;
  isActive?: boolean;
}

// Digital film content type
export interface DigitalFilm extends SanityDocument {
  _type: 'digitalFilm';
  title: string;
  thumbnail: SanityImage;
  description: string;
  videoUrl: string;
  featured?: boolean;
  displayOrder?: number;
  isActive?: boolean;
}

// Documentary film content type
export interface DocumentaryFilm extends SanityDocument {
  _type: 'documentaryFilm';
  title: string;
  thumbnail: SanityImage;
  description: string;
  videoUrl: string;
  featured?: boolean;
  displayOrder?: number;
  isActive?: boolean;
}

// Digital corporate film content type
export interface DigitalCorporateFilm extends SanityDocument {
  _type: 'digitalCorporateFilm';
  title: string;
  thumbnail: SanityImage;
  description: string;
  videoUrl: string;
  featured?: boolean;
  displayOrder?: number;
  isActive?: boolean;
}

// Music film content type
export interface MusicFilm extends SanityDocument {
  _type: 'musicFilm';
  title: string;
  thumbnail: SanityImage;
  description: string;
  videoUrl: string;
  featured?: boolean;
  displayOrder?: number;
  isActive?: boolean;
}

// Film promo digital content type
export interface FilmPromoDigital extends SanityDocument {
  _type: 'filmPromoDigital';
  title: string;
  thumbnail: SanityImage;
  description: string;
  videoUrl: string;
  featured?: boolean;
  displayOrder?: number;
  isActive?: boolean;
}

// Upcoming release content type
export interface UpcomingRelease extends SanityDocument {
  _type: 'upcomingRelease';
  title: string;
  thumbnail: SanityImage;
  description: string;
  videoUrl: string;
  releaseDate?: string;
  featured?: boolean;
  displayOrder?: number;
  isActive?: boolean;
}

// Testimonial content type
export interface Testimonial extends SanityDocument {
  _type: 'testimonial';
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  authorImage?: SanityImage;
  isActive: boolean;
}

// Work category content type
export interface WorkCategory extends SanityDocument {
  _type: 'workCategory';
  name: string;
  slug: string;
  description?: string;
  displayOrder?: number;
  isActive?: boolean;
  useExpandableCards?: boolean;
  expandableCardType?: 'standard' | 'grid';
}

// Work item content type
export interface WorkItem extends SanityDocument {
  _type: 'workItem';
  title: string;
  thumbnail: SanityImage;
  videoUrl: string;
  description: string | SanityBlock[];
  shortDescription?: string;
  category: WorkCategory;
  order: number;
  isActive?: boolean;
  client?: string;
  year?: number;
  tags?: string[];
  featured?: boolean;
  isExpandableCard?: boolean;
  expandableCardData?: {
    cardTitle?: string;
    cardDescription?: string;
    cardImage?: SanityImage;
  };
}

// Timeline entry for about page
export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  image?: SanityImage;
  category?: 'career' | 'education' | 'award' | 'project' | 'personal';
}

// About content type
export interface AboutContent extends SanityDocument {
  _type: 'aboutContent';
  ownerImage: SanityImage;
  ownerName: string;
  ownerTitle?: string;
  aboutText: SanityBlock[];
  shortBio?: string;
  timeline: TimelineEntry[];
  skills?: string[];
  socialLinks?: {
    imdb?: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    location?: string;
  };
}

// API response types
export interface SanityResponse<T = unknown> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface SanityListResponse<T> extends SanityResponse<T[]> {
  total?: number;
  hasMore?: boolean;
}

// Video processing types
export interface ProcessedVideo {
  type: 'youtube' | 'vimeo' | 'direct' | 'unknown';
  embedUrl?: string;
  thumbnailUrl?: string;
  videoId?: string;
}

// Image optimization options
export interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
  crop?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'focalpoint';
}

// Responsive image set
export interface ResponsiveImageSet {
  default: string;
  small: string;
  medium: string;
  large: string;
}

// Hook return types
export interface UseSanityDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface UseSanityMultipleDataResult<T> {
  data: (T | null)[];
  loading: boolean[];
  errors: (string | null)[];
  refetchAll: () => void;
}

export interface UseSanityPaginatedDataResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  reset: () => void;
}

// Content status types
export type ContentStatus = 'published' | 'draft' | 'inactive';

// Meta data for SEO
export interface ContentMetaData {
  title?: string;
  description?: string;
  image?: string;
}

// Cache entry interface
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// Batch operation interface
export interface BatchOperation {
  query: string;
  params?: Record<string, unknown>;
}

// Error handling types
export type SanityErrorHandler = (error: unknown) => string;
export type FallbackContentGenerator<T> = (type: string, defaultData?: Partial<T>) => T | null;