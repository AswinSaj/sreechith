'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(-1); // start hidden
  const [showText, setShowText] = useState(true);
  const [finished, setFinished] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
  ];

  useEffect(() => {
    if (showText) {
      // show text first for 1.5s
      const timer = setTimeout(() => {
        setShowText(false);
        setCurrentImageIndex(0);
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (!showText && currentImageIndex >= 0 && currentImageIndex < images.length - 1) {
      const timer = setTimeout(() => {
        setCurrentImageIndex((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }

    if (currentImageIndex === images.length - 1) {
      setTimeout(() => {
        setFinished(true);
        onComplete();
      }, 2000);
    }
  }, [showText, currentImageIndex, images.length, onComplete]);

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden z-[9999]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {showText ? (
            // First phase: Show Sreechit
            <motion.div
              className="w-full h-full flex items-center justify-center bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -100 }} // curtain-like scroll up
              transition={{ duration: 1 }}
            >
              <div className="text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Sreechit</h1>
                <h2 className="text-3xl md:text-5xl font-light italic">
                  Department of Photography
                </h2>
              </div>
            </motion.div>
          ) : (
            // Second phase: Images stack
            <div className="relative flex items-center justify-center">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  className="absolute rounded-2xl overflow-hidden shadow-2xl"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: index <= currentImageIndex ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{
                    width: 250,
                    height: 250,
                    zIndex: index,
                  }}
                >
                  <img
                    src={image}
                    alt={`Loading ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
