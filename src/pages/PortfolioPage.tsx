import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PortfolioCategoryCards from '@/components/gallery/PortfolioCategoryCards';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import GalleryLightbox from '@/components/gallery/GalleryLightbox';
import { galleryImages, galleryCategories } from '@/components/gallery/GalleryData';
import { useImagePreloader } from '@/components/gallery/useImagePreloader';

const PortfolioPage: React.FC = () => {
  const siteUrl = "https://www.roll-onpainting.com";
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isImagesLoaded } = useImagePreloader(galleryImages);

  const filteredImages = activeCategory
    ? galleryImages.filter(img => img.category === activeCategory)
    : galleryImages;

  const activeCategoryName = activeCategory
    ? galleryCategories.find(c => c.id === activeCategory)?.name ?? activeCategory
    : null;

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setActiveCategory(null);
    setSelectedImage(null);
  };

  const handleImageClick = (src: string) => setSelectedImage(src);
  const closeModal = () => setSelectedImage(null);

  const navigateImages = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.src === selectedImage);
    if (currentIndex === -1) return;
    const newIndex = direction === 'prev'
      ? (currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1)
      : (currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1);
    setSelectedImage(filteredImages[newIndex].src);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": `${siteUrl}/portfolio`,
    "name": "Portfolio | Roll On Painting | Muskoka",
    "description": "Browse our gallery of completed painting projects across Muskoka. Interior, exterior, commercial, and specialty finishes.",
    "isPartOf": { "@id": `${siteUrl}/#website` },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
        { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": `${siteUrl}/portfolio` }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>Portfolio | Painting Projects Gallery | Roll On Painting Muskoka</title>
        <meta name="description" content="Browse Roll On Painting's portfolio of completed projects in Muskoka. Interior, exterior, commercial, epoxy, and GoNano coating projects. See our quality firsthand." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}/portfolio`} />
        <meta property="og:title" content="Portfolio | Roll On Painting Muskoka" />
        <meta property="og:description" content="See our completed painting projects across Muskoka — interior, exterior, commercial, and specialty coatings." />
        <meta property="og:url" content={`${siteUrl}/portfolio`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar activeSection="portfolio" />

        <main className="pt-16">
          {/* Header */}
          <section className="pt-10 pb-6 md:pt-14 md:pb-8">
            <div className="container mx-auto px-4 text-center">
              {activeCategory ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-atomic-navy transition-colors mb-4 text-sm font-medium"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    All Categories
                  </button>
                  <h1 className="text-3xl md:text-5xl font-bold text-atomic-navy mb-3">
                    {activeCategoryName}
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {filteredImages.length} projects in this collection
                  </p>
                </motion.div>
              ) : (
                <>
                  <h1 className="text-3xl md:text-5xl font-bold text-atomic-navy mb-3">Our Portfolio</h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Browse our completed projects across Muskoka. Select a category to explore.
                  </p>
                </>
              )}
              <div className="mx-auto mt-4 h-1 w-20 bg-atomic-turquoise rounded-full" />
            </div>
          </section>

          {/* Content */}
          <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
              <AnimatePresence mode="wait">
                {activeCategory ? (
                  <motion.div
                    key="gallery"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GalleryGrid
                      images={filteredImages}
                      onImageClick={handleImageClick}
                      isImagesLoaded={isImagesLoaded}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="categories"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PortfolioCategoryCards onSelectCategory={handleSelectCategory} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          <GalleryLightbox
            selectedImage={selectedImage}
            images={filteredImages}
            closeModal={closeModal}
            navigateImages={navigateImages}
          />

          {/* CTA */}
          <section className="py-16 bg-atomic-navy text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Like What You See?</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Let us transform your property next. Get a free, no-obligation quote today.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-atomic-turquoise text-white px-8 py-3 rounded-lg font-medium hover:bg-atomic-turquoise/90 transition-colors">
                Request a Free Quote
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PortfolioPage;
