"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSanityData } from "@/hooks/useSanityData";
import { FEATURED_WORKS_QUERY } from "@/lib/queries";
import { FeaturedWork } from "@/lib/types";
import { urlFor } from "@/lib/sanity";
import { VideoModal } from "./VideoModal";



// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div
        key={i}
        className={`${
          i === 1 || i === 4 || i === 5 ? "md:col-span-2" : "col-span-1"
        } bg-gray-800 rounded-xl h-64 animate-pulse`}
      />
    ))}
  </div>
);

// Error fallback component
const ErrorFallback = ({ error }: { error: string }) => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="text-center text-white">
      <p className="text-lg mb-2">Unable to load featured content</p>
      <p className="text-sm text-gray-400">{error}</p>
    </div>
  </div>
);

// Featured work card content component
const FeaturedWorkContent = ({ work }: { work: FeaturedWork }) => (
  <div className="cursor-pointer">
    <p className="font-bold md:text-4xl text-xl text-white">
      {work.title}
    </p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      {work.description}
    </p>
    <p className="font-normal text-sm text-neutral-400">
      {work.category}
    </p>
  </div>
);



export default function FeaturedSection() {
  const { data: featuredWorks, loading, error } = useSanityData<FeaturedWork[]>(FEATURED_WORKS_QUERY);
  const [selectedVideo, setSelectedVideo] = useState<{
    url: string;
    title: string;
    description: string;
  } | null>(null);

  // Transform featured works data into cards format for LayoutGrid
  const transformToCards = (works: FeaturedWork[]) => {
    if (!works || works.length === 0) return [];

    return works.map((work, index) => {
      // Create more square-like proportions by adjusting className patterns
      const getClassName = (index: number) => {
        const patterns = [
          "md:col-span-2 aspect-square md:aspect-[2/1]", // First item - wider but more square
          "col-span-1 aspect-square", // Second item - square
          "col-span-1 aspect-square", // Third item - square
          "md:col-span-2 aspect-square md:aspect-[2/1]", // Fourth item - wider but more square
          "col-span-1 aspect-square", // Fifth item - square
          "col-span-1 aspect-square", // Sixth item - square
        ];
        return patterns[index % patterns.length];
      };

      return {
        id: parseInt(work._id.replace(/\D/g, '')) || index, // Convert _id to number
        content: <FeaturedWorkContent work={work} />,
        className: getClassName(index),
        thumbnail: work.thumbnail ? urlFor(work.thumbnail).width(800).height(600).url() : "",
      };
    });
  };



  // Handle card click to open video modal
  const handleCardClick = (work: FeaturedWork) => {
    if (work.videoUrl) {
      setSelectedVideo({
        url: work.videoUrl,
        title: work.title,
        description: work.description,
      });
    }
  };

  // Custom LayoutGrid with video modal functionality
  const CustomLayoutGrid = ({ cards }: { cards: ReturnType<typeof transformToCards> }) => {
    const [selected, setSelected] = useState<(typeof cards)[0] | null>(null);
    const [lastSelected, setLastSelected] = useState<(typeof cards)[0] | null>(null);

    const handleClick = (card: (typeof cards)[0]) => {
      setLastSelected(selected);
      setSelected(card);
      
      // Find the original work data and trigger video modal
      const work = featuredWorks?.find(w => parseInt(w._id.replace(/\D/g, '')) === card.id || w._id === card.id.toString());
      if (work) {
        handleCardClick(work);
      }
    };

    const handleOutsideClick = () => {
      setLastSelected(selected);
      setSelected(null);
    };

    return (
      <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
        {cards.map((card, i) => (
          <div key={i} className={card.className}>
            <motion.div
              onClick={() => handleClick(card)}
              className={`${card.className} relative overflow-hidden cursor-pointer bg-white rounded-xl h-full w-full`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              layoutId={`card-${card.id}`}
            >
              <img
                src={card.thumbnail}
                alt="thumbnail"
                className="object-cover object-center absolute inset-0 h-full w-full transition duration-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-6">
                  {card.content}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
        <motion.div
          onClick={handleOutsideClick}
          className={`fixed inset-0 bg-black opacity-50 z-10 ${
            selected?.id ? "pointer-events-auto" : "pointer-events-none"
          }`}
          animate={{ opacity: selected?.id ? 0.3 : 0 }}
        />
      </div>
    );
  };

  if (loading) {
    return (
      <section className="bg-black py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              Featured
            </h2>
          </motion.div>
          <LoadingSkeleton />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-black py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              Featured
            </h2>
          </motion.div>
          <ErrorFallback error={error} />
        </div>
      </section>
    );
  }



  return (
    <>
      <section className="bg-black py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Featured Heading */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              Featured
            </h2>
          </motion.div>

          {/* Enhanced Grid Content with square-like proportions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {featuredWorks && featuredWorks.length > 0 ? (
              <CustomLayoutGrid cards={transformToCards(featuredWorks)} />
            ) : (
              <div className="text-center text-white py-20">
                <p className="text-lg">No featured works available</p>
                {loading && <p className="text-sm text-gray-400 mt-2">Loading...</p>}
                {error && <p className="text-sm text-red-400 mt-2">Error: {error}</p>}
                {!loading && !error && (
                  <div className="text-sm text-gray-400 mt-4 max-w-md mx-auto">
                    <p className="mb-2">No featured works found in Sanity CMS.</p>
                    <p className="text-xs">
                      To add featured works, go to your Sanity Studio at{' '}
                      <a href="/studio" className="text-blue-400 hover:text-blue-300" target="_blank">
                        /studio
                      </a>{' '}
                      and create some &ldquo;Featured Work&rdquo; documents.
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.url || ""}
        title={selectedVideo?.title || ""}
        description={selectedVideo?.description || ""}
      />
    </>
  );
}