import { useState } from 'react';

const initialCards: number[][] = [
    [6,1] , [4,3], [5,1] , [3,4] , [1,1] , [3,4] , [1,2]
];

const useDomino = () => {
    const [dominoCards, setDominoCards] = useState<number[][]>(initialCards);
    const [doublesCount, setDoublesCount] = useState<number>(0);

    const countDoubles = () => {
        const count = dominoCards.filter(card => card[0] === card[1]).length;
        setDoublesCount(count);
    };

    const sortCards = (order: 'asc' | 'desc') => {
        const sortedCards = [...dominoCards].sort((a, b) => {
            const totalA = a[0] + a[1];
            const totalB = b[0] + b[1];
            return order === 'asc' ? totalA - totalB : totalB - totalA;
        });
        setDominoCards(sortedCards);
    };

    const removeDuplicates = () => {
        const uniqueCards: number[][] = [];
        const cardSet = new Set();
        dominoCards.forEach(card => {
            const total = card[0] + card[1];
            if (!cardSet.has(total)) {
                cardSet.add(total);
                uniqueCards.push(card);
            }
        });
        setDominoCards(uniqueCards);
    };

    const flipCards = () => {
        const flippedCards = dominoCards.map(card => [card[1], card[0]]);
        setDominoCards(flippedCards);
    };

    const removeByTotal = (total: number) => {
        setDominoCards(prevCards => prevCards.filter(card => {
            const cardTotal = card[0] + card[1];
            return cardTotal !== total;
        }));
    };

    const resetData = () => {
        setDominoCards(initialCards);
        setDoublesCount(0);
    };

    return {
        dominoCards,
        doublesCount,
        countDoubles,
        sortCards,
        removeDuplicates,
        flipCards,
        removeByTotal,
        resetData,
    };
};

export default useDomino;
