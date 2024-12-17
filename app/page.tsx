import About from "@/components/views/About/About";
import Accueil from "@/components/views/Accueil";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <main className="w-full max-h-[100%] overflow-x-hidden overflow-y-auto relative">
      <NavBar></NavBar>
      <Accueil />
      <About></About>
    </main>
  );
}
