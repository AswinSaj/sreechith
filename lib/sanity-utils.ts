// Additional Sanity utilities for error handling and data processing

import { client, handleSanityError, createFallbackContent } from './sanity';

// Retry mechanism for failed requests
export async function fetchWithRetry<T>(
  query: string,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T | null> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await client.fetch<T>(query);
    } catch (error) {
      console.warn(`Sanity fetch attempt ${attempt} failed:`, handleSanityError(error));

      if (attempt === maxRetries) {
        console.error('All retry attempts failed for query:', query);
        return null;
      }

      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)));
    }
  }

  return null;
}

// Cache management for Sanity data
class SanityCache {
  private cache = new Map<string, { data: unknown; timestamp: number; ttl: number }>();

  set(key: string, data: unknown, ttl: number = 300000) { // 5 minutes default TTL
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get(key: string): unknown | null {
    const cached = this.cache.get(key);

    if (!cached) return null;

    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear() {
    this.cache.clear();
  }

  delete(key: string) {
    this.cache.delete(key);
  }
}

export const sanityCache = new SanityCache();

// Cached fetch with fallback
export async function fetchWithCache<T>(
  query: string,
  fallbackType?: string,
  cacheKey?: string,
  ttl?: number
): Promise<T | null> {
  const key = cacheKey || query;

  // Try cache first
  const cached = sanityCache.get(key) as T | null;
  if (cached) {
    return cached;
  }

  try {
    // Fetch fresh data
    const data = await fetchWithRetry<T>(query);

    if (data) {
      sanityCache.set(key, data, ttl);
      return data;
    }

    // Return fallback if available
    if (fallbackType) {
      const fallback = createFallbackContent<T>(fallbackType);
      return fallback;
    }

    return null;
  } catch (error) {
    console.error('Cached fetch failed:', handleSanityError(error));

    // Return fallback on error
    if (fallbackType) {
      return createFallbackContent<T>(fallbackType);
    }

    return null;
  }
}

// Data validation utilities
export function validateSanityData<T>(
  data: unknown,
  requiredFields: (keyof T)[],
  type: string
): data is T {
  if (!data || typeof data !== 'object') {
    console.warn(`Invalid ${type} data: not an object`);
    return false;
  }

  const dataObj = data as Record<string, unknown>;

  for (const field of requiredFields) {
    const fieldKey = String(field);
    if (!(fieldKey in dataObj) || dataObj[fieldKey] === undefined || dataObj[fieldKey] === null) {
      console.warn(`Invalid ${type} data: missing required field '${fieldKey}'`);
      return false;
    }
  }

  return true;
}

// Content transformation utilities
export function transformSanityContent<T, R>(
  data: T[],
  transformer: (item: T) => R | null,
  filterEmpty: boolean = true
): R[] {
  const transformed = data.map(transformer);

  if (filterEmpty) {
    return transformed.filter((item): item is R => item !== null);
  }

  return transformed as R[];
}

// Real-time updates helper (for future implementation)
export function setupRealtimeUpdates(
  query: string,
  callback: (data: unknown) => void
) {
  // This would be implemented when adding real-time features
  // For now, it's a placeholder for future enhancement
  console.log('Real-time updates setup for query:', query);
  console.log('Callback function provided:', typeof callback);

  // Return cleanup function
  return () => {
    console.log('Cleaning up real-time subscription');
  };
}

// Content preview utilities
export function isPreviewMode(): boolean {
  return typeof window !== 'undefined' &&
    (window.location.search.includes('preview=true') ||
      window.location.hostname === 'localhost');
}

export function getPreviewClient() {
  if (!isPreviewMode()) {
    return client;
  }

  // Return client configured for preview mode
  return client.withConfig({
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN, // Would need to be set for preview
  });
}

// Batch operations
export async function batchUpdate(
  operations: Array<{
    query: string;
    params?: Record<string, unknown>;
  }>
): Promise<unknown[]> {
  try {
    const promises = operations.map(({ query, params }) =>
      client.fetch(query, params || {})
    );

    return await Promise.allSettled(promises);
  } catch (error) {
    console.error('Batch update failed:', handleSanityError(error));
    throw error;
  }
}

// Content status helpers
export function isContentPublished(content: Record<string, unknown>): boolean {
  return content && (!content._draft || content.isActive !== false);
}

export function getContentStatus(content: Record<string, unknown>): 'published' | 'draft' | 'inactive' {
  if (!content) return 'inactive';
  if (content._draft) return 'draft';
  if (content.isActive === false) return 'inactive';
  return 'published';
}

// SEO and meta data extraction
export function extractMetaData(content: Record<string, unknown>): {
  title?: string;
  description?: string;
  image?: string;
} {
  const meta: Record<string, unknown> = {};

  if (content.title) meta.title = content.title;
  if (content.description) meta.description = content.description;
  if (content.thumbnail || content.image) {
    meta.image = content.thumbnail || content.image;
  }

  return meta;
}