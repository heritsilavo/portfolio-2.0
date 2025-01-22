type TxtSectionsProps = {
  className?: string;
};

export default function TxtSections1({ className }: TxtSectionsProps) {
  return (
    <div
      className={`h-[100dvh] flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      <h1 className="text-foreground text-2xl font-bold lg:text-xl 2xl:text-2xl my-3 lg:my-0">
        Mieux me connaitre
      </h1>

      <p className="text-foreground text-md lg:text-sm 2xl:text-lg w-[90%] lg:w-[80%] mx-auto text-justify">
        &nbsp;&nbsp;&nbsp;&nbsp; Développeur Frontend passionné diplômé de l'ENI
        à Fianarantsoa, Madagascar, je suis spécialisé en{" "}
        <span className="font-bold">Next.js</span>,{" "}
        <span className="font-bold">Typescrypt</span>, etc. Je crée des
        interfaces innovantes, optimisées et interactives, tout en cherchant à
        dépasser les attentes des utilisateurs.
      </p>

      <p className="text-foreground text-md lg:text-sm 2xl:text-lg w-[90%] lg:w-[80%] mx-auto text-justify">
        &nbsp;&nbsp;&nbsp;&nbsp; La musique 🎵 joue un rôle clé dans mon
        processus créatif, et en dehors du codage, je me ressource en jouant de
        la guitare 🎸 et en lisant des livres 📚, ce qui enrichit ma créativité
        et mon approche du développement web.
      </p>
    </div>
  );
}
