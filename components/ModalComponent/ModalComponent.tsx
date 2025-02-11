"use client";
import React, { createContext, useContext, useState } from "react";
import "./ModalComponent.css"

type ModalComponentProps = {
  children: React.ReactNode;
};

type ModalContextType = {
  open: boolean;
  content: React.ReactNode;
  header?: string;
  btnsLabel?: {
    cancel: string,
    confirm: string
  }
};

const ModalContext = createContext<{
  modal: ModalContextType;
  setModal: React.Dispatch<React.SetStateAction<ModalContextType>>;
}>({ modal: { content: null, open: false }, setModal: () => {} });

export default function ModalComponent({ children }: ModalComponentProps) {
  const [modal, setModal] = useState<ModalContextType>({
    content: null,
    open: false,
  });

  const hideModal = ()=>{setModal(()=>({...modal, open:false}))};

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {
        modal.open && <div onClick={hideModal}  className="modal-transparent-background">
        <div onClick={(event)=>{event.stopPropagation()}} className="modal-container">
          <div className="modal-header">
            {modal.header || "Modal header"}
          </div>
          <div className="modal-content">
            {modal.content}
          </div>
          <div className="modal-footer">
            <button onClick={hideModal} className="modal-btn modal-btn-cancel">{modal.btnsLabel?.cancel || "Annuler"}</button>
            <button onClick={hideModal} className="modal-btn modal-btn-confirm">{modal.btnsLabel?.confirm || "Confirmer"}</button>
          </div>
        </div>
      </div>
      }

      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
    return useContext(ModalContext);
}