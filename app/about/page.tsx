"use client";
import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import Footer from "../components/Footer";
import { useSanityData } from "@/hooks/useSanityData";
import { ABOUT_CONTENT_QUERY } from "@/lib/queries";
import { AboutContent } from "@/lib/types";
import { urlFor, blocksToText } from "@/lib/sanity";

export default function About() {
  const { data: aboutContent, loading, error } = useSanityData<AboutContent>(ABOUT_CONTENT_QUERY);

  // Loading state
  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading about content...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-red-400 mb-4">Error loading about content</p>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  // Fallback data if no content is found
  const fallbackData: Partial<AboutContent> = {
    ownerName: "Sreechith Vijayan Damodar",
    ownerTitle: "Cinematographer",
    aboutText: [
      {
        _type: 'block',
        _key: 'fallback',
        children: [
          { 
            _type: 'span',
            _key: 'fallback-span',
            text: "I'm a passionate cinematographer with over a decade of experience in visual storytelling. My journey began with a simple fascination for how light and shadow could convey emotion, and it has evolved into a career dedicated to crafting compelling visual narratives."
          }
        ]
      }
    ],
    timeline: [],
    skills: [],
    socialLinks: {},
    contactInfo: {}
  };

  const content = aboutContent || fallbackData;
  const aboutTextParagraphs = content.aboutText ? blocksToText(content.aboutText).split('\n\n') : [];

  // Transform timeline data for the Timeline component
  const timelineData = content.timeline?.map((item) => ({
    title: item.year,
    content: (
      <div>
        <h3 className="text-white text-lg font-semibold mb-4">{item.title}</h3>
        <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8">
          {item.description}
        </p>
        {item.image && (
          <div className="grid grid-cols-1 gap-4">
            <div
              className="h-20 md:h-44 lg:h-60 w-full rounded-lg bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
              style={{
                backgroundImage: `url('${urlFor(item.image).width(500).height(300).fit('crop').url()}')`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            />
          </div>
        )}
        {item.category && (
          <div className="mt-4">
            <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-gray-700 rounded-full">
              {item.category}
            </span>
          </div>
        )}
      </div>
    ),
  })) || [];

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section with Photo and Description */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo Section */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative w-full h-[600px] rounded-2xl overflow-hidden">
                {aboutContent?.ownerImage ? (
                  <img
                    src={urlFor(aboutContent.ownerImage).width(800).height(1000).fit('crop').url()}
                    alt={content.ownerName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"
                    style={{
                      backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&crop=face')",
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  />
                )}
                {/* Overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>

            {/* Description Section */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  {content.ownerName}
                </h1>
                {content.ownerTitle && (
                  <p className="text-xl text-gray-400 mb-6">{content.ownerTitle}</p>
                )}
                <div className="w-20 h-1 bg-white mb-8"></div>
              </div>

              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                {aboutTextParagraphs.length > 0 ? (
                  aboutTextParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p>
                    I&apos;m a passionate cinematographer with over a decade of experience in visual storytelling.
                    My journey began with a simple fascination for how light and shadow could convey emotion,
                    and it has evolved into a career dedicated to crafting compelling visual narratives.
                  </p>
                )}
              </div>

              {/* Skills Section */}
              {content.skills && content.skills.length > 0 && (
                <div className="pt-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {content.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              {content.socialLinks && Object.keys(content.socialLinks).length > 0 && (
                <div className="pt-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Connect</h3>
                  <div className="flex flex-wrap gap-4">
                    {content.socialLinks.imdb && (
                      <a
                        href={content.socialLinks.imdb}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        IMDb
                      </a>
                    )}
                    {content.socialLinks.linkedin && (
                      <a
                        href={content.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                    {content.socialLinks.instagram && (
                      <a
                        href={content.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        Instagram
                      </a>
                    )}
                    {content.socialLinks.twitter && (
                      <a
                        href={content.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        Twitter
                      </a>
                    )}
                    {content.socialLinks.website && (
                      <a
                        href={content.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        Website
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Stats - Dynamic based on timeline */}
              <motion.div
                className="grid grid-cols-3 gap-8 pt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {content.timeline?.length || 0}+
                  </div>
                  <div className="text-gray-400 text-sm">Career Milestones</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {content.timeline?.filter(item => item.category === 'project').length || 0}+
                  </div>
                  <div className="text-gray-400 text-sm">Major Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {content.timeline?.filter(item => item.category === 'award').length || 0}+
                  </div>
                  <div className="text-gray-400 text-sm">Awards Won</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      {timelineData.length > 0 ? (
        <Timeline data={timelineData} />
      ) : (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400">
              No timeline data available. Add timeline entries in your Sanity Studio to showcase your career journey.
            </p>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}