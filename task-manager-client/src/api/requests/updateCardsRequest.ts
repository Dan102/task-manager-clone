import axios, { AxiosResponse } from 'axios';
import ICard from '../../models/interfaces/ICard';
import ICardUpdate from '../../models/interfaces/ICardUpdate';
import API_ROUTES from '../apiRoutes';

function updateCardsRequest(cards: ICardUpdate[]): Promise<AxiosResponse<void>> {
  return axios.put<void>(API_ROUTES.cardUrl, cards);
}

export default updateCardsRequest;
