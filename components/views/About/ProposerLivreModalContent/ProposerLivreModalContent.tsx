export default function ProposerLivreModalContent() {
  return (
    <div className="w-full py-3 flex flex-col items-center space-y-3">
      <div className="w-[95%] sm: flex flex-col space-y-2">
        <label htmlFor="titre" className="text-gray-500 text-lg">
          Titre du livre:
        </label>
        <input
          className="h-[40px] text-lg text-gray-800 border p-1 border-gray-300 rounded-md"
          type="text"
          name="titre"
          id="titre"
        />
      </div>

      <div className="w-[95%] flex flex-col space-y-2">
        <label htmlFor="description" className="text-gray-500 text-lg">
          Description:
        </label>
        <textarea
          className="text-lg text-gray-800 border p-1 border-gray-300 rounded-md"
          name="description"
          id="description"
        ></textarea>
      </div>
    </div>
  );
}
