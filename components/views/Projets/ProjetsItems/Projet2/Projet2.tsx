import ProjectItemsWrapper from "../../ProjectItemsWrapper/ProjectItemsWrapper";
import "./Projet2.css";
import Image from "next/image";

type Projet2Props = {
  className?: string;
};

export default function Projet2({ className }: Projet2Props) {
  return (
    <ProjectItemsWrapper href="https://www.npmjs.com/package/@heritsilavo/mapper" className={`p2-container ${className} `}>
      <div className="flex items-center space-x-4">
        <div className="p2-img">
          <Image
            fill
            src={"/heritsilavo-npm-profil-pic.svg"}
            alt="heritsilavo-npm-profil-pic.svg"
          />
        </div>
        <p className="font-bold text-lg lg:text-sm xl:text-lg 2xl:text-2xl"> @heritsilavo/mapper </p>
      </div>
      <p className="md:text-lg lg:text-xs xl:text-sm 2xl:text-lg">
        Bibliothèque de mapping d'objets TypeScript avec API fluide, inspirée par AutoMapper (.NET) et MapStruct (Java).
      </p>
    </ProjectItemsWrapper>
  );
}
