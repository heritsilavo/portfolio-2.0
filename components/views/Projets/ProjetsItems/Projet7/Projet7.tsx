import ProjectItemsWrapper from "../../ProjectItemsWrapper/ProjectItemsWrapper";
import "./Projet7.css";
import Image from "next/image";

type Projet7Props = {
  className?: string;
};

export default function Projet7({ className }: Projet7Props) {
  return (
    <ProjectItemsWrapper href="https://www.npmjs.com/package/@heritsilavo/react-error-boundary" className={`p7-container ${className} `}>
      <div className="flex items-center space-x-4">
        <div className="p7-img">
          <Image
            fill
            src={"/heritsilavo-npm-profil-pic.svg"}
            alt="heritsilavo-npm-profil-pic.svg"
          />
        </div>
        <p className="font-bold text-lg lg:text-sm xl:text-lg 2xl:text-2xl"> @heritsilavo/modal </p>
      </div>
      <p className="md:text-lg lg:text-xs xl:text-sm 2xl:text-lg">
      Un composant modal flexible et animé pour les applications React et Next.js avec prise en charge TypeScript et animations GSAP.
      </p>
    </ProjectItemsWrapper>
  );
}
