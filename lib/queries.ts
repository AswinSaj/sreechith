// GROQ queries for all content types

// Showreel queries
export const SHOWREEL_QUERY = `*[_type == "showreel" && isActive == true][0]{
  _id,
  title,
  videoFile,
  youtubeUrl,
  isActive
}`;

// Featured work queries
export const FEATURED_WORKS_QUERY = `*[_type == "featuredWork" && isActive == true] | order(order asc){
  _id,
  title,
  thumbnail,
  videoUrl,
  description,
  category,
  order
}`;

// Testimonials queries
export const TESTIMONIALS_QUERY = `*[_type == "testimonial" && isActive == true] | order(_createdAt desc){
  _id,
  quote,
  authorName,
  authorRole,
  authorCompany,
  authorImage,
  isActive
}`;

// Work items queries
export const WORK_ITEMS_QUERY = `*[_type == "workItem"] | order(category->name asc, order asc){
  _id,
  title,
  thumbnail,
  videoUrl,
  description,
  category->{
    _id,
    name,
    slug,
    description
  },
  order,
  isExpandableCard
}`;

// Work items by category
export const WORK_ITEMS_BY_CATEGORY_QUERY = (categorySlug: string) => `
*[_type == "workItem" && category->slug == "${categorySlug}"] | order(order asc){
  _id,
  title,
  thumbnail,
  videoUrl,
  description,
  category->{
    _id,
    name,
    slug,
    description
  },
  order,
  isExpandableCard
}`;

// Work categories query
export const WORK_CATEGORIES_QUERY = `*[_type == "workCategory"] | order(name asc){
  _id,
  name,
  slug,
  description
}`;

// About content query
export const ABOUT_CONTENT_QUERY = `*[_type == "aboutContent"][0]{
  _id,
  ownerImage,
  ownerName,
  ownerTitle,
  aboutText,
  shortBio,
  timeline[]{
    year,
    title,
    description,
    image,
    category
  },
  skills,
  socialLinks,
  contactInfo
}`;

// Digital commercials (legacy - for workItem structure)
export const LEGACY_DIGITAL_COMMERCIALS_QUERY = `*[_type == "workItem" && category->slug == "digital-commercials"] | order(order asc){
  _id,
  title,
  thumbnail,
  videoUrl,
  description,
  category->{
    name,
    slug
  },
  order
}`;

// Film promos (expandable card grid)
export const FILM_PROMOS_QUERY = `*[_type == "workItem" && category->slug == "film-promos"] | order(order asc){
  _id,
  title,
  thumbnail,
  videoUrl,
  description,
  category->{
    name,
    slug
  },
  order
}`;

// Feature films queries
export const FEATURE_FILMS_QUERY = `*[_type == "featureFilm" && isActive == true] | order(featured desc, displayOrder asc){
  _id,
  title,
  thumbnail,
  description,
  videoUrl,
  featured,
  displayOrder,
  isActive
}`;

// Featured feature films only
export const FEATURED_FEATURE_FILMS_QUERY = `*[_type == "featureFilm" && isActive == true] | order(featured desc, displayOrder asc){
  _id,
  title,
  thumbnail,
  description,
  videoUrl,
  featured,
  displayOrder,
  isActive
}`;

// Web series queries
export const WEB_SERIES_QUERY = `*[_type == "webSeries" && isActive == true] | order(featured desc, displayOrder asc){
  _id,
  title,
  thumbnail,
  description,
  videoUrl,
  featured,
  displayOrder,
  isActive
}`;

// Short original films queries
export const SHORT_ORIGINAL_FILMS_QUERY = `*[_type == "shortOriginalFilm" && isActive == true] | order(featured desc, displayOrder asc){
  _id,
  title,
  thumbnail,
  description,
  videoUrl,
  featured,
  displayOrder,
  isActive
}`;

// Digital commercials queries
export const DIGITAL_COMMERCIALS_QUERY = `*[_type == "digitalCommercial" && isActive == true] | order(featured desc, displayOrder asc){
  _id,
  title,
  thumbnail,
  description,
  videoUrl,
  featured,
  displayOrder,
  isActive
}`;

// Digital films queries
export const DIGITAL_FILMS_QUERY = `*[_type == "digitalFilm" && isActive == true] | order(featured desc, displayOrder asc){
  _id,
  title,
  thumbnail,
  description,
  videoUrl,
  featured,
  displayOrder,
  isActive
}`;

// Documentary films queries
export const DOCUMENTARY_FILMS_QUERY = `*[_type == "documentaryFilm" && isActive == true] | order(featured desc, displayOrder asc){
  _id,
  title,
  thumbnail,
  description,
  videoUrl,
  featured,
  displayOrder,
  isActive
}`;

// Digital corporate films queries
export const DIGITAL_CORPORATE_FILMS_QUERY = `*[_type == "digitalCorporateFilm" && isActive == true] | order(featured desc, displayOrder asc){
  _id,
  title,
  thumbnail,
  description,
  videoUrl,
  featured,
  displayOrder,
  isActive
}`;

// Music films queries
export const MUSIC_FILMS_QUERY = `*[_type == "musicFilm" && isActive == true] | order(featured desc, displayOrder asc){
  _id,
  title,
  thumbnail,
  description,
  videoUrl,
  featured,
  displayOrder,
  isActive
}`;

// Film promo digital queries
export const FILM_PROMO_DIGITAL_QUERY = `*[_type == "filmPromoDigital" && isActive == true] | order(featured desc, displayOrder asc){
  _id,
  title,
  thumbnail,
  description,
  videoUrl,
  featured,
  displayOrder,
  isActive
}`;

// Upcoming releases queries
export const UPCOMING_RELEASES_QUERY = `*[_type == "upcomingRelease" && isActive == true] | order(featured desc, releaseDate asc, displayOrder asc){
  _id,
  title,
  thumbnail,
  description,
  videoUrl,
  releaseDate,
  featured,
  displayOrder,
  isActive
}`;