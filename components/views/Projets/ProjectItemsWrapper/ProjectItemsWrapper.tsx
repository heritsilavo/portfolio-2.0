"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ShowImagesModal from "./ShowImagesModal";

type ProjectItemsWrapperProps = {
  className?: string;
  href?: string;
  children: React.ReactNode;
  openDesignsImages?: boolean;
  images?: string[];
};

/**
 * ProjectItemsWrapper
 * 
 * Ce composant agit comme un conteneur interactif :
 * - Si `href` est défini → redirige vers le lien
 * - Si `openDesignsImages` est vrai → ouvre un carrousel modal d'images
 * 
 * ⚙️ Fonctionnalités :
 * - Navigation au clavier (flèches, Escape)
 * - Navigation par clic
 * - Accessibilité optimisée
 */
export default function ProjectItemsWrapper({
  className,
  href,
  children,
  openDesignsImages = false,
  images = [],
}: ProjectItemsWrapperProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showImagesModal, setShowImagesModal] = useState(false);

  /** 🔁 Réinitialiser l'index quand la modal se ferme */
  useEffect(() => {
    if (!showImagesModal) setCarouselIndex(0);
  }, [showImagesModal]);

  /** ⬅️➡️ Navigation dans le carrousel */
  const goToPrevious = useCallback(() => {
    setCarouselIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCarouselIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  /** ⌨️ Navigation clavier */
  useEffect(() => {
    if (!showImagesModal || images.length <= 1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "Escape":
          setShowImagesModal(false);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showImagesModal, images.length, goToPrevious, goToNext]);

  /** 🖱️ Ouvre la modal du carrousel */
  const openCarouselModal = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      if (images.length === 0) {
        console.warn("Aucune image à afficher.");
        return;
      }

      setShowImagesModal(true);
    },
    [images.length]
  );

  /** ❌ Ferme la modal */
  const handleCloseModal = useCallback(() => {
    setShowImagesModal(false);
  }, []);

  /** 🧭 Gestion du clic principal */
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (openDesignsImages && images.length > 0) {
        openCarouselModal(e);
      } else if (href) {
        linkRef.current?.click();
      }
    },
    [openDesignsImages, images.length, href, openCarouselModal]
  );

  /** 🧩 Rendu */
  return (
    <div
      className={`${href ? "cursor-pointer" : ""} ${className || ""}`}
      onClick={handleClick}
      role={href ? "button" : undefined}
      tabIndex={href ? 0 : undefined}
      title={href}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && href) {
          e.preventDefault();
          handleClick(e as any);
        }
      }}
    >
      {/* Lien invisible pour ouverture externe */}
      {href && (
        <Link
          ref={linkRef}
          href={href}
          target="_blank"
          className="sr-only"
          aria-hidden="true"
        >
          Ouvrir le lien
        </Link>
      )}

      {/* Contenu principal */}
      {children}

      {/* Modal d'affichage d'images */}
      {showImagesModal && (
        <ShowImagesModal
          open={showImagesModal}
          images={images}
          onClose={handleCloseModal}
          link={href}
        />
      )}
    </div>
  );
}
