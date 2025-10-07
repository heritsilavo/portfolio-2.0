"use client";
import React, { useEffect, useCallback, useState } from "react";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type ShowImagesModalProps = {
  open: boolean;
  images: string[];
  onClose: () => void;
  link?: string;
};

export default function ShowImagesModal({
  open,
  images,
  onClose,
  link,
}: ShowImagesModalProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Réinitialiser l'index quand la modal se ferme
  useEffect(() => {
    if (!open) setCarouselIndex(0);
  }, [open]);

  // Navigation du carousel
  const goToPrevious = useCallback(() => {
    setCarouselIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCarouselIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  }, [images.length]);

  // Navigation clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open || images.length <= 1) return;
      if (e.key === "ArrowLeft") goToPrevious();
      else if (e.key === "ArrowRight") goToNext();
      else if (e.key === "Escape") onClose();
    };

    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, images.length, goToPrevious, goToNext, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-6"
          onClick={onClose}
        >
          {/* Conteneur principal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative flex flex-col items-center gap-4 w-full max-w-5xl bg-white rounded-2xl p-4 sm:p-6 shadow-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton de fermeture */}
            <button
              className="absolute top-3 right-3 font-bold text-gray-500 hover:text-gray-700 text-xl bg-white rounded-full w-9 h-9 flex items-center justify-center shadow"
              onClick={onClose}
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              <h2 className="text-base sm:text-lg font-semibold text-center">
                Aperçu de l'application ({images.length} image
                {images.length > 1 ? "s" : ""})
              </h2>

              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm sm:text-base font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ExternalLink size={16} className="sm:w-5 sm:h-5" />
                  Voir le lien
                </a>
              )}
            </div>

            {/* Image */}
            <div className="relative w-full flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden max-h-[80vh] sm:max-h-[85vh]">
              {imageError ? (
                <div className="text-center text-gray-500 p-4">
                  <p>Erreur de chargement</p>
                  <button
                    onClick={goToNext}
                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Image suivante
                  </button>
                </div>
              ) : (
                <motion.img
                  key={carouselIndex} // anime le changement d’image
                  src={images[carouselIndex]}
                  alt={`Aperçu ${carouselIndex + 1}`}
                  className="object-contain w-full max-w-[90%] sm:max-w-[80%] max-h-[70vh] rounded-md"
                  onError={() => setImageError(true)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>

            {/* Navigation */}
            {images.length > 1 && (
              <div className="flex flex-col items-center gap-3 w-full mt-2">
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
                  <button
                    onClick={goToPrevious}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base"
                  >
                    Précédent
                  </button>

                  <div className="flex items-center gap-3">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">
                      {carouselIndex + 1} / {images.length}
                    </span>
                    <div className="flex gap-2">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCarouselIndex(i)}
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${
                            i === carouselIndex ? "bg-blue-500" : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={goToNext}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base"
                  >
                    Suivant
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Utilisez les flèches ← → pour naviguer
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
