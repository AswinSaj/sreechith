# Requirements Document

## Introduction

Transform the existing static portfolio website into a fully dynamic, content-managed website powered by Sanity CMS. The website will feature a Sanity Studio at `/studio` path, dynamic content fetching for all sections, enhanced UI components with video modals, and improved visual layouts. All content including videos, images, testimonials, work samples, and about information will be managed through Sanity CMS.

## Requirements

### Requirement 1

**User Story:** As a content manager, I want to access Sanity Studio at `/studio` path without the main website navbar, so that I can manage all website content in a clean, dedicated interface.

#### Acceptance Criteria

1. WHEN a user navigates to `/studio` THEN the system SHALL display Sanity Studio interface
2. WHEN Sanity Studio is displayed THEN the system SHALL NOT show the main website navbar
3. WHEN Sanity Studio is accessed THEN the system SHALL provide full content management capabilities

### Requirement 2

**User Story:** As a website visitor, I want to see dynamic video content fetched from Sanity, so that I can view the latest showreel and featured work.

#### Acceptance Criteria

1. WHEN the homepage loads THEN the system SHALL fetch and display showreel video file from Sanity
2. WHEN featured section loads THEN the system SHALL display video thumbnails as images from Sanity
3. WHEN a thumbnail is clicked THEN the system SHALL open a modal with the video from Sanity link
4. WHEN video content is updated in Sanity THEN the system SHALL reflect changes on the website

### Requirement 3

**User Story:** As a website visitor, I want to see dynamic testimonials with quotes and author names, so that I can read authentic feedback about the work.

#### Acceptance Criteria

1. WHEN the testimonials section loads THEN the system SHALL fetch quotes from Sanity
2. WHEN testimonials are displayed THEN the system SHALL show both quote text and author names
3. WHEN testimonial content is updated in Sanity THEN the system SHALL reflect changes immediately

### Requirement 4

**User Story:** As a website visitor, I want to interact with work samples that show video previews on hover, so that I can quickly preview content before clicking.

#### Acceptance Criteria

1. WHEN works section loads THEN the system SHALL display thumbnails for all work items from Sanity
2. WHEN a user hovers over a work thumbnail THEN the system SHALL display a modal with video and description
3. WHEN work items are updated in Sanity THEN the system SHALL reflect changes on the website
4. WHEN the works section is displayed THEN it SHALL span the full screen width

### Requirement 5

**User Story:** As a website visitor, I want to see dynamic about page content including owner image, biography, and timeline, so that I can learn about the person behind the work.

#### Acceptance Criteria

1. WHEN the about page loads THEN the system SHALL fetch owner image from Sanity
2. WHEN about content is displayed THEN the system SHALL show dynamic about text from Sanity
3. WHEN timeline section loads THEN the system SHALL display dynamic years, descriptions, and images from Sanity
4. WHEN about content is updated in Sanity THEN the system SHALL reflect changes on the website

### Requirement 6

**User Story:** As a website visitor, I want to see IMDB branding in navigation and footer, so that I can easily identify and access IMDB-related content.

#### Acceptance Criteria

1. WHEN the navbar loads THEN the system SHALL display IMDB PNG logo in navigation buttons
2. WHEN the footer loads THEN the system SHALL display IMDB PNG logo in footer elements
3. WHEN IMDB buttons are clicked THEN the system SHALL provide appropriate navigation or actions

### Requirement 7

**User Story:** As a website visitor, I want to see properly proportioned featured sections, so that the layout appears balanced and professional.

#### Acceptance Criteria

1. WHEN the featured section loads THEN the system SHALL display content in square-like proportions
2. WHEN featured content is displayed THEN it SHALL NOT appear stretched or distorted
3. WHEN the layout is rendered THEN it SHALL maintain visual balance across different screen sizes

### Requirement 8

**User Story:** As a website visitor, I want to see enhanced work sections with expandable card components, so that I can interact with content in an engaging way.

#### Acceptance Criteria

1. WHEN digital commercials section loads THEN the system SHALL use expandable card components
2. WHEN film promo section loads THEN the system SHALL use expandable card grid components
3. WHEN expandable cards are interacted with THEN the system SHALL provide smooth animations and transitions
4. WHEN outside clicks occur THEN the system SHALL properly handle card collapse using useOutsideClick hook

### Requirement 9

**User Story:** As a developer, I want all website content to be dynamically fetched from Sanity CMS, so that content updates don't require code deployments.

#### Acceptance Criteria

1. WHEN any page loads THEN the system SHALL fetch all content from Sanity CMS
2. WHEN content is updated in Sanity THEN the system SHALL reflect changes without code deployment
3. WHEN Sanity CMS is unavailable THEN the system SHALL handle errors gracefully
4. WHEN content fetching occurs THEN the system SHALL implement proper loading states