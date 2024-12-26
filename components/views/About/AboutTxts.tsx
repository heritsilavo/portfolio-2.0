import { getReadedBooks } from "@/utils/livres";
import Image from "next/image";

export default function AboutTxts() {
  return (
    <div className="relative bg-background w-full md:min-h-[50vh] lg:w-1/2 lg:h-[100vh] z-10 flex flex-col items-center space-y-4 lg:space-y-4 xl:space-y-8 lg:pt-12">
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

      <h1 className="text-foreground text-2xl font-bold lg:text-xl 2xl:text-2xl">
        Quels genre de livre je lis ?
      </h1>

      <div className="w-[90%] lg:w-[80%] relative flex flex-wrap justify-between gap-y-4 mt-14 mb-5">
        
        {
          getReadedBooks().map((book, index) => <Image
            key={index}
            width={150}
            height={0}
            className="w-[150px] lg:w-[100px] xl:w-[120px] 2xl:w-[170px] object-cover rounded-sm cursor-pointer"
            style={{boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)"}}
            alt={book.title}
            src={book.imgUrl}
          />)
        }
        
      </div>
    </div>
  );
}
