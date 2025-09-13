"use client";
import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Calendar, Tag, User, Award } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  description?: string;
  category?: string;
  year?: number;
  client?: string;
  tags?: string[];
  thumbnail?: string;
  duration?: string;
  awards?: string[];
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title,
  description,
  category,
  year,
  client,
  tags,
  thumbnail,
  duration,
  awards,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Process video URL for embedding
  const getEmbedUrl = (url: string) => {
    // YouTube URL processing
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&rel=0`;
    }

    // Vimeo URL processing
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    }

    // Return original URL for direct video files
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);
  const isEmbedVideo = embedUrl !== videoUrl;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-7xl w-full h-[90vh] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 p-3 bg-black/60 hover:bg-black/80 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Split Layout Container */}
            <div className="flex h-full">
              {/* Left Side - Video */}
              <div className="flex-1 bg-black relative">
                {/* Video Player */}
                <div className="w-full h-full flex items-center justify-center">
                  {isEmbedVideo ? (
                    <iframe
                      src={embedUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={videoUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                      poster={thumbnail}
                    />
                  )}
                </div>

                {/* Video Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex items-center gap-4 text-white">
                    <Play className="w-5 h-5" />
                    <span className="text-sm opacity-80">
                      {duration || "Click to play"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side - Details */}
              <div className="w-96 bg-gray-900 overflow-y-auto">
                <div className="p-8 space-y-6">
                  {/* Title and Category */}
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
                      {title}
                    </h2>
                    {category && (
                      <div className="flex items-center gap-2 text-blue-400 text-sm">
                        <Tag className="w-4 h-4" />
                        <span className="capitalize">{category}</span>
                      </div>
                    )}
                  </div>

                  {/* Meta Information */}
                  <div className="space-y-3">
                    {year && (
                      <div className="flex items-center gap-3 text-gray-300">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{year}</span>
                      </div>
                    )}
                    
                    {client && (
                      <div className="flex items-center gap-3 text-gray-300">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{client}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {description && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {description}
                      </p>
                    </div>
                  )}

                  {/* Tags */}
                  {tags && tags.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Awards */}
                  {awards && awards.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-500" />
                        Awards & Recognition
                      </h3>
                      <div className="space-y-2">
                        {awards.map((award, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-gray-300 text-sm"
                          >
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span>{award}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-gray-800">
                    <div className="flex gap-3">
                      <button
                        onClick={() => window.open(videoUrl, '_blank')}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 text-sm"
                      >
                        Open in New Tab
                      </button>
                      <button
                        onClick={onClose}
                        className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors duration-200 text-sm"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};