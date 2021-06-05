import axios, { AxiosResponse } from 'axios';
import ICardList from '../../models/interfaces/ICardList';
import API_ROUTES from '../apiRoutes';

function updateBoardCardListsRequest(id: number, cardLists: ICardList[]): Promise<AxiosResponse<void>> {
  return axios.patch<void>(API_ROUTES.updateBoardCardListsUrl(String(id)), {
    CardLists: cardLists.map(x => x.cards),
  });
}

export default updateBoardCardListsRequest;
