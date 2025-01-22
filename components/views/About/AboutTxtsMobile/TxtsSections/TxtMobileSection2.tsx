import CardCompétence from "@/components/CardCompétence/CardCompétence";

export default function TxtMobileSection2() {
  return (
    <div className="w-[full] text-center space-y-3 mt-5">
      <h1 className="text-foreground text-2xl font-bold lg:text-xl 2xl:text-2xl my-3 lg:my-0">
        Mes Competénces
      </h1>

      <div className="w-[85%] mx-auto flex flex-wrap justify-between">
        <CardCompétence variant="NextJS" className="mt-4 w-[150px] md:w-[170px]" />
        <CardCompétence variant="ReactNative" className="mt-4 w-[150px] md:w-[170px]" />
        <CardCompétence variant="AngularJs" className="mt-4 w-[150px] md:w-[170px]" />
      </div>
    </div>
  );
}
