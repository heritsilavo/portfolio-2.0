import "./Projet.css";
import Projet1 from "./ProjetsItems/Projet1/Projet1";
import Projet2 from "./ProjetsItems/Projet2/Projet2";

export default function Projets() {
  return (
    <section className="w-full grid-container">
      <Projet1 className="projet-item projet-item-1 bg-accent" />
      <Projet2 className="projet-item projet-item-2 bg-accent"/>
      <div className="projet-item projet-item-3 bg-accent"> 3 </div>
      <div className="projet-item projet-item-4 bg-accent"> 4 </div>
      <div className="projet-item projet-item-5 bg-accent max-md:hidden"> 5 </div>
      <div className="projet-item projet-item-6 bg-accent max-md:hidden"> 6 </div>
      <div className="projet-item projet-item-7 bg-accent max-lg:hidden"> 7 </div>
    </section>
  );
}
