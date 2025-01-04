"use client";
import React, { createContext, useContext, useRef } from "react";
import "./MainComponent.css"

type MainComponentProps = {
  children: React.ReactNode;
};

export const MainRefContext = createContext<React.RefObject<HTMLDivElement> | null>(null);

export default function MainComponent({ children }: MainComponentProps) {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <MainRefContext.Provider value={mainRef}>
      <main
        ref={mainRef}
        className="__scrollable__main__ w-[100vw] h-[100dvh] overflow-x-hidden overflow-y-auto absolute top-0 left-0"
      >
        {children}
      </main>
    </MainRefContext.Provider>
  );
}

export const useMainRef = () => {
  return useContext(MainRefContext);
};
