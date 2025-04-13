"use client";
import React, { createContext, useContext, useRef, useState } from "react";
import "./MainComponent.css";
import ModalComponent from "../ModalComponent/ModalComponent";

type MainComponentProps = {
  children: React.ReactNode;
};

export const MainRefContext =
  createContext<React.RefObject<HTMLDivElement> | null>(null);

export default function MainComponent({ children }: MainComponentProps) {
  const mainRef = useRef<HTMLDivElement>(null);


  return (
    <MainRefContext.Provider value={mainRef}>
      <ModalComponent>
        <main
          ref={mainRef}
          className="__scrollable__main__ w-[100vw] h-[100dvh] overflow-x-hidden overflow-y-auto"
        >
          {children}
        </main>
      </ModalComponent>
    </MainRefContext.Provider>
  );
}

export const useMainRef = () => {
  return useContext(MainRefContext);
};
