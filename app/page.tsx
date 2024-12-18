import About from "@/components/views/About/About";
import Accueil from "@/components/views/Accueil/Accueil";
import NavBar from "@/components/NavBar";
import MainComponent from "@/components/MainComponent/MainComponent";

export default function Home() {
  return (

    <MainComponent>
      <NavBar></NavBar>
      <Accueil />
      <About></About>
    </MainComponent>
  );
}
