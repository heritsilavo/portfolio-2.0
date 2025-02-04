import Image from "next/image";
import "./Projet1.css"

type Projet1Props = {
  className?: string;
};

export default function Projet1({ className }: Projet1Props) {
  return <div className={`p1-container ${className} `}>
    <h2 className="p1-title">GARDEFACILE</h2>
    <h2 className="p1-description">Une application dédiée aux assistantes maternelles pour le suivi des contrats, la gestion des plannings quotidiens, ainsi que l’administration des déclarations et des congés.</h2>
    <div className="p1-illustration">
      <Image 
        fill
        src={'/illustration_garde_facile.svg'}
        alt="Illustration garde facile"
      />
    </div>
  </div>;
}
