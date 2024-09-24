import React, { useEffect, useState } from "react";
import useDomino from "../hooks/useDomino";

const Domino: React.FC = () => {
  const {
    dominoCards,
    doublesCount,
    countDoubles,
    sortCards,
    removeDuplicates,
    flipCards,
    removeByTotal,
    resetData: originalResetData, // untuk menampung sementara kartu yang dihapus karena kalau saya hanya pakai resetdata kartu yang terhapus tidak akan tereset
  } = useDomino();

  const [inputValue, setInputValue] = useState<number | "">("");
  const [removedCards, setRemovedCards] = useState<number[][]>([]);

  const handleRemoveByTotal = () => {
    if (inputValue) {
      const cardsToRemove = dominoCards.filter(
        (card) => card[0] + card[1] === inputValue
      );
      setRemovedCards(cardsToRemove);
      removeByTotal(inputValue);
      setInputValue("");
    }
  };

  const resetData = () => {
    originalResetData();
    setRemovedCards([]);
  };

  useEffect(() => {
    countDoubles();
  }, [dominoCards, countDoubles]);

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Domino Cards
      </h1>

      <div className="mb-4 p-4 border border-gray-300 rounded bg-white shadow">
        <h2 className="text-xl font-semibold mb-2">Kartu Domino</h2>
        <div className="flex flex-wrap justify-center">
          {dominoCards.length === 0 ? (
            <p className="text-gray-500">
              Tidak ada kartu domino untuk ditampilkan.
            </p>
          ) : (
            dominoCards.map((card, index) => (
              <div
                key={index}
                className="w-16 h-28 m-2 flex flex-col items-center justify-center border-2 border-blue-600 rounded-lg bg-white shadow-lg transition-transform transform hover:scale-105 relative"
              >
                <div className="absolute w-[90%] h-1 bg-blue-600 top-1/2 transform -translate-y-1/2" />
                <div className="flex-grow flex items-center justify-center">
                  <span className="text-2xl font-bold">{card[0]}</span>
                </div>
                <div className="flex-grow flex items-center justify-center">
                  <span className="text-2xl font-bold">{card[1]}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="text-center mb-4">
        <span className="ml-2 font-semibold">
          Doubles Number: {doublesCount}
        </span>
      </div>

      <div className="flex justify-center flex-wrap mt-4">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 mr-2"
          onClick={() => sortCards("asc")}
        >
          Sort (Asc)
        </button>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 mr-2"
          onClick={() => sortCards("desc")}
        >
          Sort (Desc)
        </button>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 mr-2"
          onClick={flipCards}
        >
          Flip
        </button>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 mr-2"
          onClick={removeDuplicates}
        >
          Remove Dup
        </button>
       
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          onClick={resetData}
        >
          Reset
        </button>
      </div>

      <div className="flex justify-center items-center mt-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.target.value))}
          placeholder="Jumlah yang dihapus"
          className="border border-gray-400 rounded py-2 px-3 mr-2"
        />
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          onClick={handleRemoveByTotal}
        >
          Remove
        </button>
      </div>

      <div className="flex justify-center mt-4"></div>

      {removedCards.length > 0 && (
        <div className="mt-6 p-4 border border-gray-300 rounded bg-white shadow">
          <h2 className="text-xl font-semibold mb-2">Kartu yang baru saja dihapus</h2>
          <div className="flex flex-wrap justify-center">
            {removedCards.map((card, index) => (
              <div
                key={index}
                className="w-16 h-28 m-2 flex flex-col items-center justify-center border-2 border-red-600 rounded-lg bg-white shadow-lg transition-transform transform hover:scale-105 relative"
              >
                <div className="absolute w-[90%] h-1 bg-red-600 top-1/2 transform -translate-y-1/2" />
                <div className="flex-grow flex items-center justify-center">
                  <span className="text-2xl font-bold">{card[0]}</span>
                </div>
                <div className="flex-grow flex items-center justify-center">
                  <span className="text-2xl font-bold">{card[1]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Domino;
