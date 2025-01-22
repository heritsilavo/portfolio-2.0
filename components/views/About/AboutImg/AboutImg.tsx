import MoiTransparentImg from "@/components/views/About/AboutImg/MoiTransparentImg";
import GreenBackGround from "./GreenBackground";

export default function AboutImg() {
  return (
    <GreenBackGround className="relative bg-accent w-full lg:w-1/2 h-[100dvh] lg:h-[100vh] z-10">
      <div className="w-full h-full absolute flex flex-col items-center justify-center">
        <MoiTransparentImg className="drop-shadow-2xl w-[250px] sm:w-[270px] md:max-lg:w-[310px] h-[247px] sm:h-[267px] md:max-lg:h-[307px]" />
        <div className="mt-4 text-center text-white font-bold text-2xl md:text-3xl">
          HERITSILAVO
        </div>
        <div className="mt-4 text-center text-white font-semibold text-lg md:text-xl">
          "Construisons votre avenir numérique ligne par ligne"
        </div>
      </div>
    </GreenBackGround>
  );
}