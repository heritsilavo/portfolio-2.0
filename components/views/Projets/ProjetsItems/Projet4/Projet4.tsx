import Image from "next/image"
import "./Projet4.css";
import ProjectItemsWrapper from "../../ProjectItemsWrapper/ProjectItemsWrapper";

type Projet4Props = {
  className?: string;
};

export default function Projet4({ className }: Projet4Props) {
    return <ProjectItemsWrapper href="https://jeu-de-memoire.vercel.app/" className={`p4-container ${className} `}>
        <div className="p4-image">
        <Image fill src={"/jeu-de-memoire.svg"} alt="jeu-de-memoire.svg" />
        </div>

        <p className="p4-text">Jeu de</p>
        <p className="p4-text">mémoire</p>
    </ProjectItemsWrapper>
}
