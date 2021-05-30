import ICardList from './ICardList';

export default interface IBoard {
  id: number;
  title: string;
  cardLists: ICardList[];
}
