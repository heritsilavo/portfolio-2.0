"use client";
import React, { createContext, useContext, useRef } from "react";

type MainComponentProps = {
  children: React.ReactNode;
};

const MainRefContext = createContext<React.RefObject<HTMLDivElement> | null>(null);

export default function MainComponent({ children }: MainComponentProps) {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <MainRefContext.Provider value={mainRef}>
      <main
        ref={mainRef}
        className="w-full max-h-[100%] overflow-x-hidden overflow-y-auto relative"
      >
        {children}
      </main>
    </MainRefContext.Provider>
  );
}

export const useMainRef = () => {
  return useContext(MainRefContext);
};
