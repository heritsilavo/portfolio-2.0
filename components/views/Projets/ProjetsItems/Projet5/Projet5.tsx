import ProjectItemsWrapper from "../../ProjectItemsWrapper/ProjectItemsWrapper";
import "./Projet5.css";
import Image from "next/image";

type Projet5Props = {
  className?: string;
};

export default function Projet5({ className }: Projet5Props) {
  return (
    <ProjectItemsWrapper href="https://github.com/heritsilavo/stage_l2" className={`p5-container ${className} `}>
      <div className="p5-image">
        <Image fill src={"/projet-recrutement-img.svg"} alt="projet-recrutement-img.svg" />
      </div>
      <div className="p5-title">Plateforme de recrutement</div>
      <div className="p5-description">
        Une palteforme ou les entreprises pourrait envoyer des postes
        et des candidats postulent au poste.(<span className="font-bold">Stage en 2<sup>e</sup> année de licence </span>)
      </div>
    </ProjectItemsWrapper>
  );
}
