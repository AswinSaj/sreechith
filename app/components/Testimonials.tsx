"use client";
import { motion } from "framer-motion";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    quote: string;
    image: string;
}

export default function Testimonials() {
    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: "Sarah Chen",
            role: "Creative Director",
            company: "Nexus Studios",
            quote: "Working with this cinematographer was transformative. Their ability to capture emotion through light and shadow brought our brand story to life in ways we never imagined possible.",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
        },
        {
            id: 2,
            name: "Marcus Rodriguez",
            role: "Film Director",
            company: "Independent Films",
            quote: "The visual storytelling expertise is unmatched. Every frame was meticulously crafted, creating a cinematic experience that resonated deeply with our audience and elevated the entire production.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
        },
        {
            id: 3,
            name: "Emily Watson",
            role: "Brand Manager",
            company: "Luxury Brands Co.",
            quote: "The attention to detail and artistic vision exceeded all expectations. Our commercial campaign achieved unprecedented engagement, thanks to the stunning cinematography that perfectly captured our brand essence.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
        }
    ];

    return (
        <section className="bg-black py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        What They Say
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Trusted by directors, brands, and creative professionals worldwide
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:bg-gray-900/70 transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.2,
                                ease: "easeOut"
                            }}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                        >
                            {/* Quote */}
                            <div className="mb-6">
                                <svg
                                    className="w-8 h-8 text-gray-600 mb-4"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                                </svg>
                                <p className="text-gray-300 text-lg leading-relaxed italic">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>
                            </div>

                            {/* Author Info */}
                            <div className="flex items-center">
                                <div
                                    className="w-12 h-12 mr-4 rounded-full bg-cover bg-center bg-gray-600"
                                    style={{ backgroundImage: `url(${testimonial.image})` }}
                                />
                                <div>
                                    <h4 className="text-white font-semibold text-lg">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        {testimonial.role}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <p className="text-gray-400 text-lg mb-6">
                        Ready to create something extraordinary together?
                    </p>
                    <motion.button
                        className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start Your Project
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}