import axios, { AxiosResponse } from 'axios';
import API_ROUTES from '../apiRoutes';

function removeCardListRequest(listId: number): Promise<AxiosResponse<void>> {
  return axios.delete<void>(API_ROUTES.cardListUrl + '/' + listId);
}

export default removeCardListRequest;
