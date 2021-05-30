import ICard from './ICard';

export default interface ICardList {
  id: number;
  title: string;
  cards: ICard[];
  color: string;
}
