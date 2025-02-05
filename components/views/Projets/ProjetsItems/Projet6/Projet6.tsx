import Image from "next/image";
import "./Projet6.css";
import ProjectItemsWrapper from "../../ProjectItemsWrapper/ProjectItemsWrapper";

type Projet6Props = {
  className?: string;
};

export default function Projet6({ className }: Projet6Props) {
  return <ProjectItemsWrapper href="https://github.com/heritsilavo" className={`p6-container ${className} `}>
    <div className="p6-image">
    <Image fill src={"/github.svg"} alt="github.svg" />
    </div>

    <div className="p6-text">
        <p className="p6-text-item">Voir tout sur</p>
        <p className="p6-text-item">GitHub</p>
    </div>
  </ProjectItemsWrapper>;
}
