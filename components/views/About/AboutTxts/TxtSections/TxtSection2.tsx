import CardCompétence from "@/components/CardCompétence/CardCompétence";
import Link from "next/link";

type TxtSectionsProps = {
  className?: string;
};

export default function TxtSections2({ className }: TxtSectionsProps) {
  return (
    <div
      className={`h-[100dvh] flex flex-col items-center justify-center space-y-4 xl:space-y-8 relative ${className}`}
    >
      <h1 className="text-foreground text-2xl font-bold lg:text-xl 2xl:text-2xl">
        Mes compétences
      </h1>

      <div className="w-[90%] lg:w-[80%] relative flex flex-wrap items-end justify-center gap-y-4 -scroll-mt-16 mb-5 lg:space-x-2 xl:space-x-8">
        <CardCompétence className="lg:w-[130px] xl:w-[160px] 2xl:w-[180px] mb-2 " variant="AngularJs" />
        <CardCompétence className="lg:w-[150px] xl:w-[180px] 2xl:w-[200px]" variant="NextJS" />
        <CardCompétence className="lg:w-[130px] xl:w-[160px] 2xl:w-[180px] mb-2 " variant="ReactNative" />
      </div>

      <Link href="https://profile.codersrank.io/user/heritsilavo/" target="_blank" className="italic text-accent font-bold underline cursor-pointer absolute bottom-[10px] right-[20px]">{"</>CodersRank"}</Link>
    </div>
  );
}
