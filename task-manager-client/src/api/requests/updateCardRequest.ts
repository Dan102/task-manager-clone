import axios, { AxiosResponse } from 'axios';
import ICard from '../../models/interfaces/ICard';
import API_ROUTES from '../apiRoutes';

function updateCardRequest(card: ICard): Promise<AxiosResponse<void>> {
  return axios.put<void>(API_ROUTES.cardUrl + '/' + card.id, card);
}

export default updateCardRequest;
