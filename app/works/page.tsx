"use client";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { useMemo } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import ExpandableCardStandard from "@/components/ui/expandable-card-standard";
import ExpandableCardGrid from "@/components/ui/expandable-card-grid";
import { useSanityData } from "@/hooks/useSanityData";
import {
  FEATURED_FEATURE_FILMS_QUERY,
  WEB_SERIES_QUERY,
  SHORT_ORIGINAL_FILMS_QUERY,
  DIGITAL_COMMERCIALS_QUERY,
  DIGITAL_FILMS_QUERY,
  DOCUMENTARY_FILMS_QUERY,
  DIGITAL_CORPORATE_FILMS_QUERY,
  MUSIC_FILMS_QUERY,
  FILM_PROMO_DIGITAL_QUERY,
  UPCOMING_RELEASES_QUERY
} from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import type {
  FeatureFilm,
  WebSeries,
  ShortOriginalFilm,
  DigitalCommercial,
  DigitalFilm,
  DocumentaryFilm,
  DigitalCorporateFilm,
  MusicFilm,
  FilmPromoDigital,
  UpcomingRelease
} from "@/lib/types";

interface VideoItem {
  id: string;
  title: string;
  subtitle?: string;
  thumbnail: string;
  type: 'video' | 'trailer' | 'watch';
  category: string;
  videoUrl?: string;
  description?: string;
}

// Fallback data with random YouTube links
const fallbackData = {
  featureFilms: [
    {
      id: 'dhal-dhak',
      title: 'Dhal Dhak (Hindi)',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'A compelling drama that explores the depths of human emotion and cultural identity.',
      category: 'Feature Films',
      type: 'video' as const,
      buttons: [
        { label: 'Trailer', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
        { label: 'Full Film', url: 'https://www.youtube.com/watch?v=oHg5SJYRHA0' }
      ]
    },
    {
      id: 'tvf-sandeep',
      title: 'TVF Sandeep Bhaiya',
      thumbnail: 'https://img.youtube.com/vi/oHg5SJYRHA0/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=oHg5SJYRHA0',
      description: 'A heartwarming story about mentorship and personal growth.',
      category: 'Feature Films',
      type: 'video' as const,
      buttons: [
        { label: 'Watch', url: 'https://www.youtube.com/watch?v=oHg5SJYRHA0' }
      ]
    },
    {
      id: 'medical-dreams',
      title: 'Medical Dreams',
      thumbnail: 'https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
      description: 'An inspiring journey through the challenges of medical education.',
      category: 'Feature Films',
      type: 'video' as const,
      buttons: [
        { label: 'Watch', url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' }
      ]
    }
  ],
  shortOriginals: [
    {
      id: 'shotons',
      title: 'Shotons',
      thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=L_jWHffIx5E',
      description: 'A creative short film exploring modern relationships.',
      category: 'Short Originals',
      type: 'video' as const
    },
    {
      id: 'webseries',
      title: 'Webseries',
      thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
      description: 'An engaging web series with compelling characters.',
      category: 'Short Originals',
      type: 'video' as const
    }
  ],
  webseries: [
    {
      id: 'digital-films',
      title: 'Digital Films',
      thumbnail: 'https://img.youtube.com/vi/LsoLEjrDogU/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=LsoLEjrDogU',
      description: 'Innovative digital storytelling at its finest.',
      category: 'Webseries',
      type: 'video' as const
    },
    {
      id: 'film-promo-digital',
      title: 'Film Promo Digital Films',
      thumbnail: 'https://img.youtube.com/vi/fJ9rUzIMcZQ/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
      description: 'Professional promotional content for digital platforms.',
      category: 'Webseries',
      type: 'video' as const
    }
  ],
  digitalCommercials: [
    {
      id: 'the-man-company',
      title: 'The Man Company',
      thumbnail: 'https://img.youtube.com/vi/qDvloTuw5bE/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=qDvloTuw5bE',
      description: 'Premium grooming brand commercial.',
      category: 'Digital Commercials',
      type: 'video' as const
    },
    {
      id: 'brahmastra-logo',
      title: 'Brahmastra logo film',
      thumbnail: 'https://img.youtube.com/vi/BWdLt3Afjrg/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=BWdLt3Afjrg',
      description: 'Epic logo animation for Brahmastra.',
      category: 'Digital Commercials',
      type: 'video' as const
    },
    {
      id: 'godrej',
      title: 'Godrej',
      thumbnail: 'https://img.youtube.com/vi/Ks-_Mh1QhMc/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=Ks-_Mh1QhMc',
      description: 'Corporate commercial for Godrej brand.',
      category: 'Digital Commercials',
      type: 'video' as const
    },
    {
      id: 'toofaan',
      title: 'Toofaan',
      thumbnail: 'https://img.youtube.com/vi/ALZHF5UqnU4/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=ALZHF5UqnU4',
      description: 'Promotional content for Toofaan.',
      category: 'Digital Commercials',
      type: 'video' as const
    }
  ],
  filmPromos: [
    {
      id: 'shershaah',
      title: 'Shershaah',
      thumbnail: 'https://img.youtube.com/vi/Q0FTXnefVBA/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=Q0FTXnefVBA',
      description: 'Promotional campaign for the war drama Shershaah.',
      category: 'Film Promo Digital Films',
      type: 'video' as const
    },
    {
      id: 'sardar-udham',
      title: 'Sardar Udham Singh',
      thumbnail: 'https://img.youtube.com/vi/BKZhfI-WX2s/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=BKZhfI-WX2s',
      description: 'Historical drama promotional content.',
      category: 'Film Promo Digital Films',
      type: 'video' as const
    },
    {
      id: 'toofaan-promo',
      title: 'Toofaan',
      thumbnail: 'https://img.youtube.com/vi/ja6J0ZoWyWI/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=ja6J0ZoWyWI',
      description: 'Boxing drama promotional material.',
      category: 'Film Promo Digital Films',
      type: 'video' as const
    }
  ],
  documentaries: [
    {
      id: 'the-man',
      title: 'The Man',
      thumbnail: 'https://img.youtube.com/vi/uHgte5qYQdQ/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=uHgte5qYQdQ',
      description: 'Documentary exploring human stories.',
      category: 'Documentaries',
      type: 'video' as const
    },
    {
      id: 'commenia',
      title: 'Commenia',
      thumbnail: 'https://img.youtube.com/vi/iik25wqIuFo/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=iik25wqIuFo',
      description: 'Social documentary on community issues.',
      category: 'Documentaries',
      type: 'video' as const
    }
  ],
  corporateFilms: [
    {
      id: 'music-films',
      title: 'Music Films',
      thumbnail: 'https://img.youtube.com/vi/ktvTqknDobU/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=ktvTqknDobU',
      description: 'Corporate music video production.',
      category: 'Digital Corporate Films',
      type: 'video' as const
    },
    {
      id: 'showreel',
      title: 'Showreel',
      thumbnail: 'https://img.youtube.com/vi/Ek4g8TUXwZ8/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=Ek4g8TUXwZ8',
      description: 'Professional showreel compilation.',
      category: 'Digital Corporate Films',
      type: 'video' as const
    }
  ],
  upcomingProjects: [
    {
      id: 'aspirants',
      title: 'Aspirants',
      thumbnail: 'https://img.youtube.com/vi/w15oWDh02K4/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=w15oWDh02K4',
      description: 'Upcoming project about civil service aspirants.',
      category: 'Upcoming Projects (2025)',
      type: 'video' as const
    },
    {
      id: 'sardar',
      title: 'Sardar',
      thumbnail: 'https://img.youtube.com/vi/n61ULEU7CO0/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=n61ULEU7CO0',
      description: 'Historical biographical project in development.',
      category: 'Upcoming Projects (2025)',
      type: 'video' as const
    }
  ]
};

export default function Works() {

  // Fetch all content types from Sanity
  const { data: featureFilms, loading: featureFilmsLoading, error: featureFilmsError } = useSanityData<FeatureFilm[]>(FEATURED_FEATURE_FILMS_QUERY);
  const { data: webSeries, loading: webSeriesLoading, error: webSeriesError } = useSanityData<WebSeries[]>(WEB_SERIES_QUERY);
  const { data: shortOriginalFilms, loading: shortOriginalFilmsLoading, error: shortOriginalFilmsError } = useSanityData<ShortOriginalFilm[]>(SHORT_ORIGINAL_FILMS_QUERY);
  const { data: digitalCommercials, loading: digitalCommercialsLoading, error: digitalCommercialsError } = useSanityData<DigitalCommercial[]>(DIGITAL_COMMERCIALS_QUERY);
  const { data: digitalFilms, loading: digitalFilmsLoading, error: digitalFilmsError } = useSanityData<DigitalFilm[]>(DIGITAL_FILMS_QUERY);
  const { data: documentaryFilms, loading: documentaryFilmsLoading, error: documentaryFilmsError } = useSanityData<DocumentaryFilm[]>(DOCUMENTARY_FILMS_QUERY);
  const { data: digitalCorporateFilms, loading: digitalCorporateFilmsLoading, error: digitalCorporateFilmsError } = useSanityData<DigitalCorporateFilm[]>(DIGITAL_CORPORATE_FILMS_QUERY);
  const { data: musicFilms, loading: musicFilmsLoading, error: musicFilmsError } = useSanityData<MusicFilm[]>(MUSIC_FILMS_QUERY);
  const { data: filmPromoDigitalFilms, loading: filmPromoDigitalFilmsLoading, error: filmPromoDigitalFilmsError } = useSanityData<FilmPromoDigital[]>(FILM_PROMO_DIGITAL_QUERY);
  const { data: upcomingReleases, loading: upcomingReleasesLoading, error: upcomingReleasesError } = useSanityData<UpcomingRelease[]>(UPCOMING_RELEASES_QUERY);

  // Helper function to create video items from any content type
  const createVideoItem = (item: { _id: string; title: string; thumbnail: { _type?: string; asset?: { _ref: string } }; videoUrl: string; description: string; _type?: string }, fallbackThumbnail?: string): VideoItem => {
    return {
      id: item._id,
      title: item.title,
      thumbnail: item.thumbnail?.asset?._ref
        ? urlFor(item.thumbnail as { asset: { _ref: string } }).width(400).height(600).fit('crop').url()
        : fallbackThumbnail || 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      type: 'video',
      category: item._type || 'unknown',
      videoUrl: item.videoUrl,
      description: item.description
    };
  };

  // Transform feature films for Apple Cards Carousel
  const featureFilmsData = useMemo(() => {
    // If we have Sanity feature films data, use it
    if (featureFilms && featureFilms.length > 0) {
      return featureFilms.map((film) => {
        // Use Sanity thumbnail image
        const thumbnailUrl = film.thumbnail && film.thumbnail.asset?._ref
          ? urlFor(film.thumbnail).width(800).height(1200).fit('crop').url()
          : 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg';

        return {
          src: thumbnailUrl,
          title: film.title,
          category: 'Feature Film',
          content: (
            <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
              <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                <span className="font-bold text-neutral-700 dark:text-neutral-200">
                  {film.title}
                </span>{" "}
                {film.description}
              </p>
              <div className="flex gap-4 mt-8">
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => window.open(film.videoUrl, '_blank')}
                >
                  Watch
                </button>
              </div>
            </div>
          ),
        };
      });
    }

    // Fallback to dummy data if no Sanity data
    return fallbackData.featureFilms.map((fallbackItem) => ({
      src: fallbackItem.thumbnail,
      title: fallbackItem.title,
      category: fallbackItem.category,
      content: (
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              {fallbackItem.title}
            </span>{" "}
            {fallbackItem.description}
          </p>
          <div className="flex gap-4 mt-8">
            {fallbackItem.buttons?.map((button, btnIndex) => (
              <button
                key={btnIndex}
                className={`px-6 py-2 rounded-lg transition-colors ${btnIndex === 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'border border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                onClick={() => window.open(button.url, '_blank')}
              >
                {button.label}
              </button>
            )) || (
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => window.open(fallbackItem.videoUrl, '_blank')}
                >
                  Watch
                </button>
              )}
          </div>
        </div>
      ),
    }));
  }, [featureFilms]);







  const VideoCard = ({ item, size = "large", fallbackThumbnail }: {
    item: VideoItem;
    size?: "large" | "medium";
    fallbackThumbnail?: string;
  }) => {
    const thumbnailUrl = item.thumbnail || fallbackThumbnail || 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg';

    return (
      <motion.div
        className={`relative group cursor-pointer ${size === "large" ? "aspect-[2/3]" : "aspect-[3/4]"
          }`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        onClick={() => item.videoUrl && window.open(item.videoUrl, '_blank')}
      >
        <div
          className="w-full h-full rounded-lg bg-cover bg-center relative overflow-hidden bg-gray-800"
          style={{ backgroundImage: `url(${thumbnailUrl})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />

          {/* Play Button */}
          {item.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            </div>
          )}

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white font-semibold text-sm md:text-base">{item.title}</h3>
            {item.description && (
              <p className="text-gray-300 text-xs mt-1 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{item.description}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          {item.type === "trailer" && (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Trailer</span>
          )}
          {item.type === "video" && item.videoUrl && (
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Watch</span>
          )}
        </div>
      </motion.div>
    );
  };



  // Loading component
  const LoadingSection = ({ title }: { title: string }) => (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        <span className="ml-3 text-gray-400">Loading {title.toLowerCase()}...</span>
      </div>
    </motion.section>
  );

  // Error component
  const ErrorSection = ({ title, error }: { title: string; error: string }) => (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
        <p className="text-red-400">Error loading {title.toLowerCase()}: {error}</p>
      </div>
    </motion.section>
  );

  // Show loading state
  if (featureFilmsLoading || webSeriesLoading || shortOriginalFilmsLoading || digitalCommercialsLoading ||
    digitalFilmsLoading || documentaryFilmsLoading || digitalCorporateFilmsLoading || musicFilmsLoading ||
    filmPromoDigitalFilmsLoading || upcomingReleasesLoading) {
    return (
      <div className="bg-black min-h-screen">
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                My Work
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl">
                A journey through films, series, commercials, and creative storytelling
              </p>
            </motion.div>
            <LoadingSection title="Works" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show error state
  if (featureFilmsError || webSeriesError || shortOriginalFilmsError || digitalCommercialsError ||
    digitalFilmsError || documentaryFilmsError || digitalCorporateFilmsError || musicFilmsError ||
    filmPromoDigitalFilmsError || upcomingReleasesError) {
    return (
      <div className="bg-black min-h-screen">
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                My Work
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl">
                A journey through films, series, commercials, and creative storytelling
              </p>
            </motion.div>
            <ErrorSection title="Works" error={featureFilmsError || webSeriesError || shortOriginalFilmsError || digitalCommercialsError ||
              digitalFilmsError || documentaryFilmsError || digitalCorporateFilmsError || musicFilmsError ||
              filmPromoDigitalFilmsError || upcomingReleasesError || 'Unknown error'} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              My Work
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              A journey through films, series, commercials, and creative storytelling
            </p>
          </motion.div>
        </div>

        {/* Feature Films - Apple Cards Carousel */}
        <motion.section
          className="mb-16 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Feature Films</h2>
          </div>
          <div className="w-full overflow-hidden">
            {featureFilmsData.length > 0 ? (
              <Carousel items={featureFilmsData.map((card, cardIndex) => (
                <Card key={card.src || cardIndex} card={card} index={cardIndex} />
              ))} />
            ) : (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-800/30 rounded-lg p-8 text-center">
                  <p className="text-gray-400">Loading feature films...</p>
                </div>
              </div>
            )}
          </div>
        </motion.section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-7xl mx-auto">

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left Column */}
              <div className="flex flex-col space-y-16">
                {/* Short Originals */}
                <motion.section
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-1"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Short Original Films</h2>
                  <div className="space-y-4">
                    <ExpandableCardStandard items={shortOriginalFilms && shortOriginalFilms.length > 0 ? shortOriginalFilms : fallbackData.shortOriginals.map(item => ({
                      _id: item.id,
                      _type: 'shortOriginalFilm' as const,
                      title: item.title,
                      thumbnail: { _type: 'image' as const, asset: { _ref: '', _type: 'reference' as const } },
                      videoUrl: item.videoUrl,
                      description: item.description,
                      category: { _id: '', _type: 'workCategory' as const, name: item.category, slug: 'short-films' },
                      order: 0
                    }))} />
                  </div>
                </motion.section>

                {/* Digital Commercials */}
                <motion.section
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex-1"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Digital Commercials</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {(digitalCommercials && digitalCommercials.length > 0 ? digitalCommercials : fallbackData.digitalCommercials.map(item => ({
                      _id: item.id,
                      title: item.title,
                      thumbnail: { _type: 'image' as const, asset: { _ref: '', _type: 'reference' as const } },
                      videoUrl: item.videoUrl,
                      description: item.description
                    }))).map((item, index) => {
                      const videoItem = createVideoItem(item, fallbackData.digitalCommercials[index]?.thumbnail);
                      return (
                        <VideoCard
                          key={videoItem.id}
                          item={videoItem}
                          size="medium"
                        />
                      );
                    })}
                  </div>
                </motion.section>

                {/* Documentaries */}
                <motion.section
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex-1"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Documentary Films</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {(documentaryFilms && documentaryFilms.length > 0 ? documentaryFilms : fallbackData.documentaries.map(item => ({
                      _id: item.id,
                      title: item.title,
                      thumbnail: { _type: 'image' as const, asset: { _ref: '', _type: 'reference' as const } },
                      videoUrl: item.videoUrl,
                      description: item.description
                    }))).map((item, index) => {
                      const videoItem = createVideoItem(item, fallbackData.documentaries[index]?.thumbnail);
                      return (
                        <VideoCard
                          key={videoItem.id}
                          item={videoItem}
                          size="medium"
                        />
                      );
                    })}
                  </div>
                </motion.section>
              </div>

              {/* Right Column */}
              <div className="flex flex-col space-y-16">
                {/* Webseries */}
                <motion.section
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-1"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Web Series</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {(webSeries && webSeries.length > 0 ? webSeries : fallbackData.webseries.map(item => ({
                      _id: item.id,
                      title: item.title,
                      thumbnail: { _type: 'image' as const, asset: { _ref: '', _type: 'reference' as const } },
                      videoUrl: item.videoUrl,
                      description: item.description
                    }))).map((item, index) => {
                      const videoItem = createVideoItem(item, fallbackData.webseries[index]?.thumbnail);
                      return (
                        <VideoCard
                          key={videoItem.id}
                          item={videoItem}
                          size="medium"
                        />
                      );
                    })}
                  </div>
                </motion.section>

                {/* Film Promo Digital Films */}
                <motion.section
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex-1"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Film Promo Digital Films</h2>
                  <div className="space-y-4">
                    <ExpandableCardGrid items={filmPromoDigitalFilms && filmPromoDigitalFilms.length > 0 ? filmPromoDigitalFilms : fallbackData.filmPromos.map(item => ({
                      _id: item.id,
                      _type: 'filmPromoDigital' as const,
                      title: item.title,
                      thumbnail: { _type: 'image' as const, asset: { _ref: '', _type: 'reference' as const } },
                      videoUrl: item.videoUrl,
                      description: item.description,
                      category: { _id: '', _type: 'workCategory' as const, name: item.category, slug: 'film-promos' },
                      order: 0
                    }))} />
                  </div>
                </motion.section>

                {/* Digital Corporate Films */}
                <motion.section
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex-1"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Digital Corporate Films</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {(digitalCorporateFilms && digitalCorporateFilms.length > 0 ? digitalCorporateFilms : fallbackData.corporateFilms.map(item => ({
                      _id: item.id,
                      title: item.title,
                      thumbnail: { _type: 'image' as const, asset: { _ref: '', _type: 'reference' as const } },
                      videoUrl: item.videoUrl,
                      description: item.description
                    }))).map((item, index) => {
                      const videoItem = createVideoItem(item, fallbackData.corporateFilms[index]?.thumbnail);
                      return (
                        <VideoCard
                          key={videoItem.id}
                          item={videoItem}
                          size="medium"
                        />
                      );
                    })}
                  </div>
                </motion.section>
              </div>
            </div>

            {/* Upcoming Projects */}
            {/* Digital Films */}
            <motion.section
              className="mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Digital Films</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {(digitalFilms && digitalFilms.length > 0 ? digitalFilms : fallbackData.webseries.map(item => ({
                  _id: item.id,
                  title: item.title,
                  thumbnail: { _type: 'image' as const, asset: { _ref: '', _type: 'reference' as const } },
                  videoUrl: item.videoUrl,
                  description: item.description
                }))).map((item, index) => {
                  const videoItem = createVideoItem(item, fallbackData.webseries[index]?.thumbnail);
                  return (
                    <VideoCard
                      key={videoItem.id}
                      item={videoItem}
                      size="medium"
                    />
                  );
                })}
              </div>
            </motion.section>

            {/* Music Films */}
            <motion.section
              className="mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Music Films</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {(musicFilms && musicFilms.length > 0 ? musicFilms : fallbackData.corporateFilms.map(item => ({
                  _id: item.id,
                  title: item.title,
                  thumbnail: { _type: 'image' as const, asset: { _ref: '', _type: 'reference' as const } },
                  videoUrl: item.videoUrl,
                  description: item.description
                }))).map((item, index) => {
                  const videoItem = createVideoItem(item, fallbackData.corporateFilms[index]?.thumbnail);
                  return (
                    <VideoCard
                      key={videoItem.id}
                      item={videoItem}
                      size="medium"
                    />
                  );
                })}
              </div>
            </motion.section>

            {/* Showreel */}
            <motion.section
              className="mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Showreel</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {fallbackData.corporateFilms.filter(item => item.title.toLowerCase().includes('showreel')).map((item) => {
                  const videoItem = createVideoItem({
                    _id: item.id,
                    title: item.title,
                    thumbnail: { _type: 'image' as const, asset: { _ref: '' } },
                    videoUrl: item.videoUrl,
                    description: item.description
                  }, item.thumbnail);
                  return (
                    <VideoCard
                      key={videoItem.id}
                      item={videoItem}
                      size="medium"
                    />
                  );
                })}
              </div>
            </motion.section>

            {/* Upcoming Releases (2025) */}
            <motion.section
              className="mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                Upcoming Releases (2025)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {(upcomingReleases && upcomingReleases.length > 0 ? upcomingReleases : fallbackData.upcomingProjects.map(item => ({
                  _id: item.id,
                  title: item.title,
                  thumbnail: { _type: 'image' as const, asset: { _ref: '', _type: 'reference' as const } },
                  videoUrl: item.videoUrl,
                  description: item.description
                }))).map((item, index) => {
                  const videoItem = createVideoItem(item, fallbackData.upcomingProjects[index]?.thumbnail);
                  return (
                    <VideoCard
                      key={videoItem.id}
                      item={videoItem}
                      size="medium"
                    />
                  );
                })}
              </div>
            </motion.section>



            {/* Watch Showreel Button */}
            <div className="text-center mt-16">
              <motion.button
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Find showreel item from any category or use fallback
                  const allItems = [
                    ...(digitalCorporateFilms || []),
                    ...(musicFilms || []),
                    ...(featureFilms || [])
                  ];

                  const showreelItem = allItems.find(item =>
                    item.title.toLowerCase().includes('showreel')
                  );

                  const showreelUrl = showreelItem?.videoUrl ||
                    fallbackData.corporateFilms.find(item =>
                      item.title.toLowerCase().includes('showreel')
                    )?.videoUrl || 'https://www.youtube.com/watch?v=Ek4g8TUXwZ8';

                  window.open(showreelUrl, '_blank');
                }}
              >
                Watch My Showreel
              </motion.button>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}