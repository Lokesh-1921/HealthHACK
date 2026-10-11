import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ChevronDown, Maximize2, Images, Sparkles } from 'lucide-react';
import { galleryPhotos, type GalleryPhoto } from '../data/gallery';

export default function GallerySection() {
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const activeIndex = activePhoto
    ? galleryPhotos.findIndex(p => p.id === activePhoto.id)
    : -1;

  const handleNext = useCallback(() => {
    if (activeIndex === -1) return;
    const nextIdx = (activeIndex + 1) % galleryPhotos.length;
    setActivePhoto(galleryPhotos[nextIdx]);
  }, [activeIndex]);

  const handlePrev = useCallback(() => {
    if (activeIndex === -1) return;
    const prevIdx = (activeIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
    setActivePhoto(galleryPhotos[prevIdx]);
  }, [activeIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!activePhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePhoto(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, handleNext, handlePrev]);

  return (
    <section id="gallery" tabIndex={-1} className="section gallery-section">
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading heading-row reveal">
          <div>
            <span className="eyebrow">
              <Images size={15} />
              EVENT GALLERY
            </span>
            <h2>
              Innovation in Action.<br />
              <span>Glimpses of Health Hackathon.</span>
            </h2>
          </div>
          <p>
            From midnight hardware prototyping to final jury pitches — explore real moments from our past editions.
          </p>
        </div>

        {/* Photo Grid — Clean photos without any text overlay or filter tabs */}
        <div className={`gallery-grid ${mobileExpanded ? 'is-expanded' : ''}`} data-stagger>
          {galleryPhotos.map((photo, i) => (
            <article
              key={photo.id}
              className="gallery-card reveal"
              tabIndex={0}
              onClick={() => setActivePhoto(photo)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePhoto(photo);
                }
              }}
              role="button"
              aria-label={`View photo: ${photo.title}`}
            >
              <div className="gallery-card-inner">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="gallery-img"
                  loading={i < 6 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <div className="gallery-card-hover-overlay" aria-hidden="true">
                  <span className="gallery-expand-icon">
                    <Maximize2 size={18} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile "More images" Toggle */}
        <div className="gallery-mobile-toggle">
          <button
            type="button"
            className="gallery-more-btn"
            onClick={() => setMobileExpanded(!mobileExpanded)}
            aria-expanded={mobileExpanded}
          >
            {mobileExpanded ? 'Show fewer images' : 'More images'}
            <ChevronDown size={18} className={`more-icon ${mobileExpanded ? 'open' : ''}`} />
          </button>
        </div>

        {/* Gallery Footer Note */}
        <div className="gallery-footnote reveal">
          <Sparkles size={18} />
          <p>
            Health Hackathon brings together over <strong>3000+ innovators</strong>, clinical specialists, and world-class mentors across VIT Bhopal & Johns Hopkins.
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="lightbox-content"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setActivePhoto(null)}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Previous Button */}
            <button
              type="button"
              className="lightbox-nav prev"
              onClick={handlePrev}
              aria-label="Previous photo"
            >
              <ChevronLeft size={30} />
            </button>

            {/* Next Button */}
            <button
              type="button"
              className="lightbox-nav next"
              onClick={handleNext}
              aria-label="Next photo"
            >
              <ChevronRight size={30} />
            </button>

            {/* Image Container */}
            <div className="lightbox-image-wrap">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="lightbox-img"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
