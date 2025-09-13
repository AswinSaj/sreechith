import { useState, useEffect } from 'react';
import { client } from '@/lib/sanity';
import type { 
  UseSanityDataResult, 
  UseSanityMultipleDataResult, 
  UseSanityPaginatedDataResult 
} from '@/lib/types';



/**
 * Custom hook for fetching data from Sanity CMS with loading states and error handling
 * @param query - GROQ query string
 * @param initialData - Optional initial data to prevent loading state
 * @returns Object containing data, loading state, error state, and refetch function
 */
export function useSanityData<T = any>(
  query: string,
  initialData?: T
): UseSanityDataResult<T> {
  const [data, setData] = useState<T | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await client.fetch<T>(query);
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data from Sanity';
      setError(errorMessage);
      console.error('Sanity fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    if (!initialData) {
      fetchData();
    }
  }, [query]);

  return {
    data,
    loading,
    error,
    refetch
  };
}

/**
 * Hook for fetching multiple queries simultaneously
 * @param queries - Array of GROQ query strings
 * @returns Object containing arrays of data, loading states, and errors
 */
export function useSanityMultipleData<T = any>(
  queries: string[]
): UseSanityMultipleDataResult<T> {
  const [data, setData] = useState<(T | null)[]>(new Array(queries.length).fill(null));
  const [loading, setLoading] = useState<boolean[]>(new Array(queries.length).fill(true));
  const [errors, setErrors] = useState<(string | null)[]>(new Array(queries.length).fill(null));

  const fetchAllData = async () => {
    const promises = queries.map(async (query, index) => {
      try {
        setLoading(prev => {
          const newLoading = [...prev];
          newLoading[index] = true;
          return newLoading;
        });
        
        setErrors(prev => {
          const newErrors = [...prev];
          newErrors[index] = null;
          return newErrors;
        });

        const result = await client.fetch<T>(query);
        
        setData(prev => {
          const newData = [...prev];
          newData[index] = result;
          return newData;
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data from Sanity';
        
        setErrors(prev => {
          const newErrors = [...prev];
          newErrors[index] = errorMessage;
          return newErrors;
        });
        
        console.error(`Sanity fetch error for query ${index}:`, err);
      } finally {
        setLoading(prev => {
          const newLoading = [...prev];
          newLoading[index] = false;
          return newLoading;
        });
      }
    });

    await Promise.allSettled(promises);
  };

  const refetchAll = () => {
    fetchAllData();
  };

  useEffect(() => {
    fetchAllData();
  }, [queries.join(',')]);

  return {
    data,
    loading,
    errors,
    refetchAll
  };
}

/**
 * Hook specifically for paginated Sanity data
 * @param baseQuery - Base GROQ query without pagination
 * @param pageSize - Number of items per page
 * @returns Object with paginated data and pagination controls
 */
export function useSanityPaginatedData<T = any>(
  baseQuery: string,
  pageSize: number = 10
): UseSanityPaginatedDataResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchPage = async (currentOffset: number, reset: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const paginatedQuery = `${baseQuery}[${currentOffset}...${currentOffset + pageSize}]`;
      const result = await client.fetch<T[]>(paginatedQuery);
      
      if (reset) {
        setData(result);
      } else {
        setData(prev => [...prev, ...result]);
      }
      
      setHasMore(result.length === pageSize);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch paginated data from Sanity';
      setError(errorMessage);
      console.error('Sanity paginated fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const newOffset = offset + pageSize;
      setOffset(newOffset);
      fetchPage(newOffset, false);
    }
  };

  const reset = () => {
    setOffset(0);
    setData([]);
    setHasMore(true);
    fetchPage(0, true);
  };

  useEffect(() => {
    fetchPage(0, true);
  }, [baseQuery, pageSize]);

  return {
    data,
    loading,
    error,
    hasMore,
    loadMore,
    reset
  };
}