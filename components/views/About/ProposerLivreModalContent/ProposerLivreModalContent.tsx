import { ProposerLivre } from "@/models/proposer-livre";
import "./ProposerLivreModalContent.css";
import React, { MutableRefObject, useRef } from "react";

type ProposerLivreModalContentProps = {
  formDataRef: MutableRefObject<ProposerLivre>;
  onChange: () => any;
};

export default function ProposerLivreModalContent({
  formDataRef, onChange
}: ProposerLivreModalContentProps) {
  const nomRef = useRef<HTMLInputElement>(null)
  const contactRef = useRef<HTMLInputElement>(null)

  const updateFormData = (key: keyof ProposerLivre, value: string) => {
    formDataRef.current = { ...formDataRef.current, [key]: value };
    onChange();
  };

  const handleClickAnonyme = () => {

    if (nomRef.current && contactRef.current) {
      nomRef.current.value = "anonyme"
      contactRef.current.value = "anonyme"
      updateFormData("nom", "anonyme");
      updateFormData("contact", "anonyme");
    }
  }

  return (
    <div className="form-container">
      <div className="input-box">
        <label htmlFor="nom" className="form-label">
          Qui est celui qui propose ?:
        </label>
        <div className="input-group">
          <input
            ref={nomRef}
            className="my-input h-[40px] text-lg"
            type="text"
            name="nom"
            id="nom"
            defaultValue={formDataRef.current?.nom || ""}
            onChange={(e) => updateFormData("nom", e.target.value)}
          />
          <button onClick={handleClickAnonyme} className="input-group-btn">Anonyme</button>
        </div>
      </div>

      <div className="input-box">
        <label htmlFor="contact" className="form-label">
          Votre contact:
        </label>
        <input
          ref={contactRef}
          className="my-input h-[40px] text-lg"
          type="text"
          name="contact"
          id="contact"
          defaultValue={formDataRef.current?.contact}
          onChange={(e) => updateFormData("contact", e.target.value)}
        />
      </div>

      <div className="input-box">
        <label htmlFor="titre" className="form-label">
          Titre du livre:
        </label>
        <input
          className="my-input h-[40px] text-lg"
          type="text"
          name="titre"
          id="titre"
          defaultValue={formDataRef.current?.title}
          onChange={(e) => updateFormData("title", e.target.value)}
        />
      </div>

      <div className="input-box">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <textarea
          className="my-input text-lg min-h-[10px] max-h-[100px]"
          name="description"
          id="description"
          defaultValue={formDataRef.current?.description}
          onChange={(e) => updateFormData("description", e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
