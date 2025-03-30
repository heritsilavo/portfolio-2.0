"use client";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import "./ModalComponent.css";
import { TailSpin } from "react-loader-spinner";
import gsap from "gsap";

type ModalComponentProps = {
  children: React.ReactNode;
};

type ModalContextType = {
  open: boolean;
  content: React.ReactNode;
  header?: string;
  btnsLabel?: {
    cancel: string;
    confirm: string;
  };
  onConfirm?: () => any;
  onClose?: () => any;
  noHeader?: boolean;
  noFooter?: boolean;
  modalContainerClassname?: string;
  modalContentClassname?: string;
  confirmBtnDisableByDefault?: boolean;
  confirmBtnDisabled?: boolean;
  animationType?: "elastic" | "smooth" | "fade"; // Nouvelle option pour le type d'animation
};

const ModalContext = createContext<{
  modal: ModalContextType;
  setModal: React.Dispatch<React.SetStateAction<ModalContextType>>;
}>({ modal: { content: null, open: false }, setModal: () => {} });

export default function ModalComponent({ children }: ModalComponentProps) {
  const [modal, setModal] = useState<ModalContextType>({
    content: null,
    open: false,
    confirmBtnDisableByDefault: false,
    confirmBtnDisabled: true,
    animationType: "elastic" // Valeur par défaut
  });
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalOutlineRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const animationTimeline = useRef<gsap.core.Timeline>();

  const hideModal = useCallback(() => {
    if (modal.onClose) {
      modal.onClose();
    }
    setModal(prev => ({
      ...prev,
      open: false
    }));
  }, [modal]);

  const onCLickConfirm = useCallback(async () => {
    if (modal.onConfirm) {
      setLoadingConfirm(true);
      setModal(prev => ({ ...prev, confirmBtnDisabled: true }));
      try {
        await modal.onConfirm();
      } finally {
        setLoadingConfirm(false);
      }
    }
    hideModal();
  }, [modal, hideModal]);

  // Gère les animations d'entrée/sortie
  useEffect(() => {
    if (!modalRef.current || !modalOutlineRef.current) return;

    // Nettoyer les animations précédentes
    if (animationTimeline.current) {
      animationTimeline.current.kill();
    }

    animationTimeline.current = gsap.timeline({ paused: true });

    if (modal.open) {
      // Animation d'entrée
      modalOutlineRef.current.classList.remove("hidden");
      
      // Fond transparent animé
      animationTimeline.current.fromTo(
        modalOutlineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "power2.out" },
        0
      );

      // Animation du contenu en fonction du type
      if (modal.animationType === "elastic") {
        animationTimeline.current.fromTo(
          modalRef.current,
          { scale: 0.7, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.6, 
            ease: "elastic.out(1, 0.75)" 
          },
          0.1
        );
      } else if (modal.animationType === "smooth") {
        animationTimeline.current.fromTo(
          modalRef.current,
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.4, 
            ease: "back.out(1.7)" 
          },
          0.1
        );
      } else { // fade
        animationTimeline.current.fromTo(
          modalRef.current,
          { opacity: 0 },
          { 
            opacity: 1, 
            duration: 0.3, 
            ease: "power2.out" 
          },
          0.1
        );
      }

      // Animation du contenu interne (optionnel)
      if (modalContentRef.current) {
        animationTimeline.current.fromTo(
          modalContentRef.current.children,
          { opacity: 0, y: 10 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.2, 
            stagger: 0.05,
            ease: "power2.out" 
          },
          0.3
        );
      }
    } else {
      // Animation de sortie
      if (modal.animationType === "elastic") {
        animationTimeline.current.to(
          modalRef.current,
          { 
            scale: 0.7, 
            opacity: 0, 
            duration: 0.4, 
            ease: "elastic.in(1, 0.75)" 
          },
          0
        );
      } else if (modal.animationType === "smooth") {
        animationTimeline.current.to(
          modalRef.current,
          { 
            y: 50, 
            opacity: 0, 
            duration: 0.3, 
            ease: "back.in(1.7)" 
          },
          0
        );
      } else { // fade
        animationTimeline.current.to(
          modalRef.current,
          { 
            opacity: 0, 
            duration: 0.2, 
            ease: "power2.in" 
          },
          0
        );
      }

      // Fond transparent animé
      animationTimeline.current.to(
        modalOutlineRef.current,
        { opacity: 0, duration: 0.2, ease: "power2.in" },
        modal.animationType === "elastic" ? 0.1 : 0
      );

      // Cache le modal après l'animation
      animationTimeline.current.call(() => {
        modalOutlineRef.current?.classList.add("hidden");
        setModal(old => ({ ...old, content: null }));
      });
    }

    animationTimeline.current.play();

    return () => {
      if (animationTimeline.current) {
        animationTimeline.current.kill();
      }
    };
  }, [modal.open, modal.animationType]);

  const confirmBtnDisabled = modal.confirmBtnDisableByDefault ? modal.confirmBtnDisabled : false;

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      <div 
        ref={modalOutlineRef} 
        onClick={hideModal} 
        className="modal-transparent-background hidden"
      >
        <div
          onClick={(event) => event.stopPropagation()}
          ref={modalRef}
          className={`modal-container ${modal?.modalContainerClassname || ""}`}
        >
          {!modal.noHeader && (
            <div className="modal-header">
              {modal.header || "Modal header"}
            </div>
          )}
          <div 
            ref={modalContentRef}
            className={`modal-content ${modal.modalContentClassname || ""}`}
          >
            {modal.content}
          </div>
          {!modal.noFooter && (
            <div className="modal-footer">
              <button
                onClick={hideModal}
                className="modal-btn modal-btn-cancel"
              >
                {modal.btnsLabel?.cancel || "Annuler"}
              </button>
              <button
                onClick={onCLickConfirm}
                className={`modal-btn ${confirmBtnDisabled ? "btn-disable" : "modal-btn-confirm"}`}
                disabled={confirmBtnDisabled || loadingConfirm}
              >
                {loadingConfirm ? (
                  <TailSpin
                    visible={true}
                    height="20"
                    width="20"
                    color="#fff"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                  />
                ) : (
                  modal.btnsLabel?.confirm || "Confirmer"
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  return useContext(ModalContext);
};