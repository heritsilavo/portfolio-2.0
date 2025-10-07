"use client";
import Link from "next/link";
import ProjectItemsWrapper from "../../ProjectItemsWrapper/ProjectItemsWrapper";
import "./Projet5.css";
import Image from "next/image";

type Projet5Props = {
  className?: string;
};

export default function Projet5({ className }: Projet5Props) {

  const images = [
    "/NoteMd/1.jpeg",
    "/NoteMd/2.jpeg",
    "/NoteMd/3.jpeg"
  ]

  return (
    <ProjectItemsWrapper images={images} openDesignsImages href="https://note-md-web.vercel.app/" className={`p5-container ${className} `}>
      <div className="p5-image">
        <Image fill src={"/note-md-illustration.svg"} alt="note-md-illustration.svg" />
      </div>
      <div className="p5-title">NoteMD</div>
      <div className="p5-description">
        NotesMD est votre solution complète pour une gestion de notes Markdown sans accroc, avec synchronisation en temps réel et organisation intelligente.
        (
        <Link
          onClick={e => e.stopPropagation()}
          href="https://github.com/heritsilavo/notes-md/releases/latest/download/app-uat-release.apk"
          className="hover:text-shadow-md p-2 font-bold"
          passHref
        >
          <strong>Télécharger apk</strong>
        </Link>
        )
      </div>
    </ProjectItemsWrapper>
  );
}
