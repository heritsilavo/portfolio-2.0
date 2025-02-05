import "./Projet.css";
import Projet1 from "./ProjetsItems/Projet1/Projet1";
import Projet2 from "./ProjetsItems/Projet2/Projet2";
import Projet3 from "./ProjetsItems/Projet3/Projet3";
import Projet4 from "./ProjetsItems/Projet4/Projet4";
import Projet5 from "./ProjetsItems/Projet5/Projet5";
import Projet6 from "./ProjetsItems/Projet6/Projet6";
import ProjetsWrapper from "./ProjetsWrapper/ProjetsWrapper";

export default function Projets() {
  return (
    <ProjetsWrapper className="w-full grid-container">
      <Projet1 className="projet-item projet-item-1 bg-accent" />
      <Projet2 className="projet-item projet-item-2 bg-accent" />
      <Projet3 className="projet-item projet-item-3 bg-accent" />
      <Projet4 className="projet-item projet-item-4 bg-accent" />
      <Projet5 className="projet-item projet-item-5 bg-accent max-md:hidden" />
      <Projet6 className="projet-item projet-item-6 bg-accent max-md:hidden" />
      <Projet2 className="projet-item projet-item-7 bg-accent max-lg:hidden" />
    </ProjetsWrapper>
  );
}
