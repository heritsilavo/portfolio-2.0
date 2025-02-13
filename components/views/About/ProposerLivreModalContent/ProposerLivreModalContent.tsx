import { ProposerLivre } from "@/models/proposer-livre";
import "./ProposerLivreModalContent.css";
import React from "react";

type ProposerLivreModalContentProps = {
  formData: ProposerLivre;
  setFormData: React.Dispatch<React.SetStateAction<ProposerLivre>>;
};

export default function ProposerLivreModalContent({
  formData,
  setFormData,
}: ProposerLivreModalContentProps) {
  return (
    <div className="form-container">
      <div className="input-box">
        <label htmlFor="nom" className="form-label">
          Qui est celui qui propose ?:
        </label>
        <input
          className="my-input h-[40px] text-lg"
          type="text"
          name="nom"
          id="nom"
          onChange={(e)=>setFormData(old=>({...old, nom: e.target.value}))}
        />
      </div>

      <div className="input-box">
        <label htmlFor="contact" className="form-label">
          Votre contact:
        </label>
        <input
          className="my-input h-[40px] text-lg"
          type="text"
          name="contact"
          id="contact"
          onChange={(e)=>setFormData(old=>({...old, contact: e.target.value}))}
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
          onChange={(e)=>setFormData(old=>({...old, title: e.target.value}))}
        />
      </div>

      <div className="input-box">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <textarea
          className="my-input text-lg "
          name="description"
          id="description"
          onChange={(e)=>setFormData(old=>({...old, description: e.target.value}))}
        ></textarea>
      </div>
    </div>
  );
}
