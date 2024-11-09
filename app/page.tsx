import AcceuilIllustration from "@/components/AcceuilIllustration";
import Accueil from "./views/Accueil";

export default function Home() {
  return (
    <main className="w-full relative overflow-x-hidden overflow-y-auto">
      {/* <AcceuilIllustration className='p-20 w-[100vw] h-[100vh]'></AcceuilIllustration> */}
      <Accueil/>
    </main>
  );
}