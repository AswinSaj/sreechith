"use client";

import LoadingScreen from "./components/LoadingScreen";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import FeaturedSection from "./components/FeaturedSection";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import { useLoading } from "./contexts/LoadingContext";
import { useSanityData } from "@/hooks/useSanityData";
import { SHOWREEL_QUERY } from "@/lib/queries";
import { processVideoUrl, getSanityFileUrl } from "@/lib/sanity";
import type { Showreel } from "@/lib/types";

export default function Home() {
  const { isLoading, setIsLoading } = useLoading();
  const { data: showreelData, loading: showreelLoading, error: showreelError } = useSanityData<Showreel>(SHOWREEL_QUERY);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Process showreel video content
  const getShowreelVideoContent = () => {
    if (!showreelData) {
      // Fallback to original YouTube URL when Sanity data is unavailable
      return {
        type: 'youtube' as const,
        embedUrl: "https://www.youtube.com/embed/rIPwDmJVjjo?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=rIPwDmJVjjo&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&enablejsapi=1",
        title: "Cinematography Showreel"
      };
    }

    // Prefer video file over YouTube URL
    if (showreelData.videoFile) {
      const fileUrl = getSanityFileUrl(showreelData.videoFile);
      if (fileUrl) {
        return {
          type: 'direct' as const,
          embedUrl: fileUrl,
          title: showreelData.title || "Cinematography Showreel"
        };
      }
    }

    // Use YouTube URL if available
    if (showreelData.youtubeUrl) {
      const processed = processVideoUrl(showreelData.youtubeUrl);
      if (processed.type === 'youtube' && processed.embedUrl) {
        // Add YouTube parameters for autoplay and styling
        const embedUrl = `${processed.embedUrl}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${processed.videoId}&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&enablejsapi=1`;
        return {
          type: 'youtube' as const,
          embedUrl,
          title: showreelData.title || "Cinematography Showreel"
        };
      }
    }

    // Fallback to original YouTube URL
    return {
      type: 'youtube' as const,
      embedUrl: "https://www.youtube.com/embed/rIPwDmJVjjo?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=rIPwDmJVjjo&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&enablejsapi=1",
      title: "Cinematography Showreel"
    };
  };

  const videoContent = getShowreelVideoContent();

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="bg-black">
      <div className="pt-16"> {/* Add padding to account for fixed navbar */}
        {/* Container Scroll Hero with Dynamic Video */}
        <ContainerScroll
          titleComponent={
            <div>
              <h1 className="text-5xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-bold mb-4">
                Sreechith Vijayan Damodar
              </h1>
              <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto px-4">
                Crafting cinematic experiences through the art of light, movement, and shadow.
                Every frame tells a story.
              </p>
              {/* Loading state indicator */}
              {showreelLoading && (
                <div className="mt-4 text-neutral-500 text-sm">
                  Loading showreel...
                </div>
              )}
              {/* Error state indicator */}
              {showreelError && (
                <div className="mt-4 text-neutral-400 text-sm">
                  Using fallback content
                </div>
              )}
            </div>
          }
        >
          {videoContent.type === 'direct' ? (
            <video
              src={videoContent.embedUrl}
              title={videoContent.title}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
            />
          ) : (
            <iframe
              src={videoContent.embedUrl}
              title={videoContent.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="w-full h-full"
              style={{ border: 'none' }}
              allowFullScreen
            />
          )}
        </ContainerScroll>

        <FeaturedSection />
        <Testimonials />
      </div>
      <Footer />
    </div>
  );
}
