import { getReadedBooks } from "@/utils/livres";
import Image from "next/image";

export default function TxtMobileSection3() {
  return (
    <div className="w-[full] text-center space-y-3 mt-5">
      <h1 className="text-foreground text-2xl font-bold lg:text-xl 2xl:text-2xl my-3 lg:my-0">
        Quels genre de livre je lis ?
      </h1>

      <div className="w-[85%] mx-auto flex flex-wrap justify-between">
        {getReadedBooks().map((book, index) => (
          <Image
            key={index}
            width={150}
            height={0}
            className="w-[140px] object-cover rounded-xs cursor-pointer mt-5"
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
