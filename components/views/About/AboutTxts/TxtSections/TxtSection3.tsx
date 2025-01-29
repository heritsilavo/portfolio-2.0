import { getReadedBooks } from "@/utils/livres";
import Image from "next/image";

type TxtSectionsProps = {
  className?: string;
};

export default function TxtSections({ className }: TxtSectionsProps) {
  return (
    <div
      className={`h-[100dvh] flex flex-col items-center justify-center space-y-4 xl:space-y-8 ${className}`}
    >
        <h1 className="text-foreground text-2xl font-bold lg:text-xl 2xl:text-2xl">
            Quels genre de livre je lis ?
          </h1>

          <div className="w-[90%] lg:w-[80%] relative flex flex-wrap justify-between gap-y-4 mt-14 mb-5">
            {getReadedBooks().map((book, index) => (
              <Image
                key={index}
                width={150}
                height={0}
                className="w-[150px] lg:w-[100px] xl:w-[120px] 2xl:w-[170px] object-cover rounded-xs cursor-pointer"
                style={{
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
                alt={book.title}
                src={book.imgUrl}
              />
            ))}
          </div>
    </div>
  );
}
