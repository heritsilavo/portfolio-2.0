"use client";
import { useModal } from "@/components/ModalComponent/ModalComponent";
import { Livre } from "@/models/livre";
import { getReadedBooks } from "@/utils/livres";
import Image from "next/image";
import ProposerLivreModalContent from "../../ProposerLivreModalContent/ProposerLivreModalContent";
import { useRef } from "react";
import { defaultProposerLivre, ProposerLivre, ProposerLivreSchema } from "@/models/proposer-livre";
import { z } from "zod";

type TxtSectionsProps = {
  className?: string;
};

export default function TxtSections({ className }: TxtSectionsProps) {
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
        confirmBtnDisableByDefault: true
      });
    }
  };

  return (
    <div
      className={`h-[100dvh] flex flex-col items-center justify-center space-y-4 xl:space-y-8 ${className}`}
    >
      <h1 className="text-foreground text-2xl font-bold lg:text-xl 2xl:text-2xl">
        Quels genre de livre je lis ?
      </h1>

      <div className="w-[90%] lg:w-[80%] relative flex flex-wrap justify-between gap-y-4 mt-14 mb-5">
        {getReadedBooks().map((book, index) => (
          <Image
            key={index}
            width={150}
            height={0}
            className="w-[150px] lg:w-[100px] xl:w-[120px] 2xl:w-[170px] object-cover rounded-xs cursor-pointer"
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