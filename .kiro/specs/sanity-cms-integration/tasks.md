# Implementation Plan

- [x] 1. Set up Sanity CMS integration and project configuration





  - Install Sanity dependencies (@sanity/client, @sanity/image-url, sanity, @sanity/vision)
  - Create Sanity project configuration files (sanity.config.ts, sanity.cli.ts)
  - Set up environment variables for Sanity project ID and dataset
  - Create lib/sanity.ts with client configuration and image URL builder
  - _Requirements: 1.1, 1.2, 9.1, 9.2_

- [x] 2. Create Sanity Studio setup and routing






  - Create app/studio/[[...tool]]/page.tsx for Sanity Studio routing
  - Configure Studio with custom branding and schema
  - Implement conditional navbar rendering to exclude navbar from /studio path
  - Test Studio access and content management interface
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 3. Define Sanity schemas for all content types





  - Create schemas/showreel.ts for video showreel content
  - Create schemas/featuredWork.ts for featured section content
  - Create schemas/testimonial.ts for testimonials with quotes and author info
  - Create schemas/workItem.ts and schemas/workCategory.ts for works portfolio
  - Create schemas/aboutContent.ts for about page dynamic content
  - Create schemas/index.ts to export all schemas
  - _Requirements: 2.1, 2.2, 3.1, 3.2, 4.1, 5.1, 5.2, 5.3, 9.1, 9.2_

- [x] 4. Create data fetching utilities and hooks





  - Create lib/queries.ts with GROQ queries for all content types
  - Create hooks/useSanityData.ts for client-side data fetching with loading states
  - Implement error handling and fallback mechanisms for failed requests
  - Create utility functions for image URL generation and video URL processing
  - _Requirements: 2.4, 3.2, 4.2, 5.4, 9.1, 9.2, 9.3, 9.4_

- [ ] 5. Update useOutsideClick hook for expandable cards
  - Modify hooks/use-outside-click.tsx to match the required implementation
  - Add proper TypeScript types and event handling for mousedown and touchstart
  - Test hook functionality with expandable card components
  - _Requirements: 8.4_

- [ ] 6. Install and configure expandable card components
  - Run pnpm dlx shadcn@latest add for expandable card demo components
  - Install expandable-card-demo-standard.json and expandable-card-demo-grid.json
  - Create wrapper components for digital commercials and film promo sections
  - Integrate useOutsideClick hook with expandable card functionality
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 7. Create enhanced video modal component
  - Create components/VideoModal.tsx with video playback capabilities
  - Implement modal state management and outside click handling
  - Add support for YouTube URLs and direct video file playback
  - Style modal with proper responsive design and animations
  - _Requirements: 2.3, 4.2_

- [x] 8. Update homepage with dynamic showreel content




  - Modify app/page.tsx to fetch showreel data from Sanity
  - Replace hardcoded YouTube URL with dynamic video content
  - Implement loading states and error handling for video content
  - Add fallback content youtube link when Sanity data is unavailable
  - _Requirements: 2.1, 2.4, 9.1, 9.4_

- [x] 9. Transform FeaturedSection to use dynamic content






  - Update app/components/FeaturedSection.tsx to fetch data from Sanity
  - Implement thumbnail click functionality to open video modals
  - Adjust layout proportions to be more square-like instead of stretched
  - Add proper loading states and error handling
  - _Requirements: 2.2, 2.3, 7.1, 7.2, 7.3_

- [ ] 10. Update Testimonials component with dynamic content
  - Modify app/components/Testimonials.tsx to fetch testimonials from Sanity
  - Replace hardcoded testimonial data with dynamic quotes and author information
  - Implement proper image handling for author photos using Sanity CDN
  - Add loading states and graceful fallbacks
  - _Requirements: 3.1, 3.2_

- [x] 11. Enhance Navbar with IMDB logo integration




  - Update app/components/Navbar.tsx to include IMDB PNG logo in buttons imdb-logo.png
  - Implement conditional rendering to hide navbar on /studio path
  - Style IMDB logo integration in both desktop and mobile navigation
  - Test navigation functionality across different routes
  - _Requirements: 1.2, 6.1, 6.3_

- [ ] 12. Update Footer with IMDB branding
  - Modify app/components/Footer.tsx to include IMDB PNG logo
  - Ensure consistent branding across navigation and footer elements
  - Implement responsive design for footer IMDB integration
  - _Requirements: 6.2_

- [x] 13. Transform works page to use dynamic content






  - Update app/works/page.tsx to fetch all work items from Sanity
  - Implement full-screen width for feature films sections using CSS breakout technique
  - Replace hardcoded work data with dynamic content from Sanity
  - Add proper categorization and filtering based on work categories
  - _Requirements: 4.1, 4.3, 9.1, 9.2_

- [ ] 14. Implement hover video modals for works section
  - Add hover functionality to work thumbnails to show video previews
  - Create modal components for video playback with descriptions
  - Implement smooth animations and transitions for hover interactions
  - Test modal functionality across different work categories
  - _Requirements: 4.2, 8.3_

- [ ] 15. Integrate expandable cards in works sections
  - Replace digital commercials section with expandable card demo standard
  - Replace film promo section with expandable card demo grid
  - Connect expandable cards to dynamic Sanity content
  - Implement proper card collapse functionality using useOutsideClick
  - _Requirements: 8.1, 8.2, 8.4_

- [ ] 16. Create dynamic about page
  - Update app/about/page.tsx to fetch about content from Sanity
  - Implement dynamic owner image display using Sanity CDN
  - Replace static about text with rich text content from Sanity
  - Create dynamic timeline component with years, descriptions, and images
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 17. Implement comprehensive error handling and loading states
  - Create reusable loading spinner and error boundary components
  - Add loading states to all components that fetch Sanity data
  - Implement graceful degradation when Sanity CMS is unavailable
  - Create fallback content for all dynamic sections
  - _Requirements: 9.3, 9.4_

- [ ] 18. Add content management and preview functionality
  - Set up Sanity preview mode for draft content viewing
  - Implement real-time content updates using Sanity's live queries
  - Create content validation and publishing workflows
  - Test content updates reflecting immediately on the website
  - _Requirements: 9.2, 9.4_

- [ ] 19. Optimize performance and implement SEO improvements
  - Implement image optimization using Sanity CDN and Next.js Image component
  - Add lazy loading for video content and thumbnails
  - Optimize bundle size and implement code splitting for Sanity Studio
  - Add proper meta tags and structured data for SEO
  - _Requirements: 9.1, 9.4_

- [ ] 20. Final integration testing and deployment preparation
  - Test all dynamic content functionality across different devices
  - Verify Sanity Studio access and content management workflows
  - Test video modal functionality and expandable card interactions
  - Ensure proper error handling and fallback content display
  - Validate responsive design and performance optimizations
  - _Requirements: 1.3, 2.4, 3.2, 4.3, 5.4, 6.3, 7.3, 8.3, 9.4_