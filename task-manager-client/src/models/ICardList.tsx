import ICard from "./ICard";

interface ICardList {
    id: number;
    title: string;
    cards: ICard[];
}

export default ICardList;