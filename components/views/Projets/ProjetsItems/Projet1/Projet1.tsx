import Image from "next/image";
import "./Projet1.css";
import ProjectItemsWrapper from "../../ProjectItemsWrapper/ProjectItemsWrapper";

type Projet1Props = {
  className?: string;
};

export default function Projet1({ className }: Projet1Props) {
  const images = [
    "/garde-facile/1.png",
    "/garde-facile/2.png",
    "/garde-facile/3.png",
    "/garde-facile/4.png",
    "/garde-facile/5.png",
  ]
  return (
    <ProjectItemsWrapper images={images} openDesignsImages href="https://github.com/heritsilavo/garde-facile-front-react-native" className={`p1-container ${className} `}>
      <h2 className="p1-title">GARDEFACILE</h2>
      <h2 className="p1-description">
        Une application dédiée aux assistantes maternelles pour le suivi des
        contrats, la gestion des plannings quotidiens, ainsi que
        l’administration des déclarations et des congés.
        (<span className="font-bold">pour mon stage de 3<sup>e</sup> année de licence </span>)
      </h2>
      <div className="p1-illustration">
        <Image
          fill
          src={"/illustration_garde_facile.svg"}
          alt="Illustration garde facile"
        />
      </div>
    </ProjectItemsWrapper>
  );
}
