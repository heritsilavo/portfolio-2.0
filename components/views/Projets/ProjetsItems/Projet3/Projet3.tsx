"use client";
import Link from "next/link";
import "./Projet3.css";
import Image from "next/image";
import ProjectItemsWrapper from "../../ProjectItemsWrapper/ProjectItemsWrapper";

type Projet3Props = {
  className?: string;
};

export default function Projet3({ className }: Projet3Props) {
  return (
    <ProjectItemsWrapper
      href="https://my-movie-app-tsilavo.vercel.app/"
      className={`p3-container ${className}`}
    >
      <h2 className="p3-title">MyMovieApp</h2>
      <p className="p3-text">
        Une application web permettant d'afficher une liste des films récents et
        leurs genres, en s'appuyant sur l'API de
        <span className="font-bold">TheMovieDatabase</span> .J'ai réalisé ce
        projet en suivant la formation
        <span className="font-bold"> Next.js</span> sur{" "}
        <span className="font-bold">Dyma.fr</span>.
      </p>
      <Link
        onClick={(e) => e.stopPropagation()}
        href="https://developer.themoviedb.org/reference/intro/getting-started"
        target="_blank"
        className="p3-image"
      >
        <Image fill src={"/TMDB.svg"} alt="TMDB.svg" />
      </Link>
      <Link
        className="p3-button"
        target="_blank"
        onClick={(e) => e.stopPropagation()}
        href="https://dyma.fr/formations/next-js"
      >
        {" "}
        Voir la formation dans Dyma.fr{" "}
      </Link>
    </ProjectItemsWrapper>
  );
}
