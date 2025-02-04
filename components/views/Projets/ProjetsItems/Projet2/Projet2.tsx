import "./Projet2.css";
import Image from "next/image";

type Projet2Props = {
  className?: string;
};

export default function Projet2({ className }: Projet2Props) {
  return (
    <div className={`p2-container ${className} `}>
      <div className="flex items-center space-x-4">
        <div className="p2-img">
          <Image
            fill
            src={"/heritsilavo-npm-profil-pic.svg"}
            alt="heritsilavo-npm-profil-pic.svg"
          />
        </div>
        <p className="font-bold text-lg md:text-xl lg:text-sm xl:text-lg 2xl:text-2xl"> @heritsilavo/react-error-bondary </p>
      </div>
      <p className="lg:text-xs xl:text-sm 2xl:text-lg">
        Un package npm qui capture et gère les erreurs des composants
        React avec une notification personnalisable.
      </p>
    </div>
  );
}
