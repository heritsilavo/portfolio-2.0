import About from "@/components/views/About/About";
import Accueil from "@/components/views/Accueil/Accueil";
import NavBar from "@/components/NavBar/NavBar";
import MainComponent from "@/components/MainComponent/MainComponent";
import Projets from "@/components/views/Projets/Projets";

export default function Home() {
  return (
    <MainComponent>
      <NavBar></NavBar>
      <Accueil />
      <About></About>
      <Projets />
    </MainComponent>
  );
}