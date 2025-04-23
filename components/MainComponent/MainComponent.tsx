"use client";
import React, { createContext, useContext, useRef, useState } from "react";
import "./MainComponent.css";
import SplashScreen from "../views/SplashScreen/SplashScreen";
import { ModalComponent } from "@heritsilavo/modal"

type MainComponentProps = {
  children: React.ReactNode;
};

export const MainRefContext =
  createContext<React.RefObject<HTMLDivElement> | null>(null);

const StartAccAnimationsContext = createContext(false);

export default function MainComponent({ children }: MainComponentProps) {
  const mainRef = useRef<HTMLDivElement>(null);

  const [loadingAnimationFinished, setLoadingAnimationFinished] = useState(false);

  return (
    <MainRefContext.Provider value={mainRef}>
      <StartAccAnimationsContext.Provider value={loadingAnimationFinished}>
          <ModalComponent>
            <SplashScreen loadingAnimationFinished={loadingAnimationFinished} setLoadingAnimationFinished={setLoadingAnimationFinished} />
            <main
              ref={mainRef}
              className="__scrollable__main__ w-[100vw] h-[100dvh] overflow-x-hidden overflow-y-auto"
            >
              {children}

            </main>
          </ModalComponent>
      </StartAccAnimationsContext.Provider>
    </MainRefContext.Provider>
  );
}

export const useMainRef = () => {
  return useContext(MainRefContext);
};

export const useStartAccAnimation = () => useContext(StartAccAnimationsContext);
