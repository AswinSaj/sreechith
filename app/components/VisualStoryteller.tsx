"use client";
import { motion } from "framer-motion";

export default function VisualStoryteller() {
  return (
    <section className="bg-black py-20 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Visual Storyteller
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl text-gray-300 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          I tell stories through light, movement, and shadow—where every frame is a world of its own. 
          With over a decade of experience in cinematography, I craft visual narratives that resonate 
          with audiences and elevate brands.
        </motion.p>
      </motion.div>
    </section>
  );
}