"use client";
import { useModal } from "@/components/ModalComponent/ModalComponent";
import { Livre } from "@/models/livre";
import { getReadedBooks } from "@/utils/livres";
import Image from "next/image";
import ProposerLivreModalContent from "../../ProposerLivreModalContent/ProposerLivreModalContent";
import { defaultProposerLivre, ProposerLivre, ProposerLivreSchema } from "@/models/proposer-livre";
import { useRef, useState } from "react";
import { z } from "zod";

export default function TxtMobileSection3() {
  const { modal, setModal } = useModal();
  const formDataRef = useRef<ProposerLivre>(defaultProposerLivre);
  
  const handleChangeForm = function () {
      try {
        ProposerLivreSchema.parse(formDataRef.current)
        setModal((old) => ({...old, confirmBtnDisabled:false}))
        console.log("HAHAA");
        
      } catch (e) {
        setModal((old) => ({...old, confirmBtnDisabled:true}))
        if (e instanceof z.ZodError) {
          console.log(e.errors);
        }
      }
    }
  
    const onConfirmSuggestBook = async () => {
      try {
        const response = await fetch('/api/livre/proposer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataRef.current),
          cache: "force-cache"
        });
    
        if (!response.ok) {
          // Si la réponse n'est pas OK, on essaie de récupérer le message d'erreur du serveur
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erreur lors de la soumission du livre');
        }
    
        const result = await response.json();
        console.log('Livre proposé avec succès :', result);
      } catch (error) {
        console.error('Erreur :', error);
        // Vous pouvez également afficher l'erreur à l'utilisateur ici
      }
    };

  const onClickLivre = (livre: Livre) => {
    if (livre.type == "PROPOSER") {
      formDataRef.current = defaultProposerLivre;
      setModal({
        ...modal,
        open: true,
        header: "Me proposer un livre",
        content: (
          <ProposerLivreModalContent
            formDataRef={formDataRef}
            onChange={handleChangeForm}
          />
        ),
        onConfirm: onConfirmSuggestBook,
      });
    }
  };

  return (
    <div className="w-[full] text-center space-y-3 mt-5 mb-3">
      <h1 className="text-foreground text-2xl font-bold lg:text-xl 2xl:text-2xl my-3 lg:my-0">
        Quels genre de livre je lis ?
      </h1>

      <div className="w-[85%] mx-auto flex flex-wrap justify-between">
        {getReadedBooks().map((book, index) => (
          <Image
            key={index}
            width={150}
            height={0}
            className="w-[140px] object-cover rounded-xs cursor-pointer mt-5"
            style={{
              boxShadow:
                "0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
            alt={book.title}
            src={book.imgUrl}
            onClick={() => onClickLivre(book)}
          />
        ))}
      </div>
    </div>
  );
}