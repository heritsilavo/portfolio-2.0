import AboutImg from "./AboutImg";
import AboutTxts from "./AboutTxts";

export default function About() {
  return (
    <div className="w-[100vw] lg:h-[100vh] flex flex-col lg:flex-row">
      <AboutImg />
      <AboutTxts/>
    </div>
  );
}
