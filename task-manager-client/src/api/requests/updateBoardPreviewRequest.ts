import axios, { AxiosResponse } from 'axios';
import API_ROUTES from '../apiRoutes';

function updateBoardPreviewRequest(id: number, isFavourite: boolean): Promise<AxiosResponse<void>> {
  return axios.put<void>(API_ROUTES.boardUrl + '/' + id, {
    IsFavourite: isFavourite,
  });
}

export default updateBoardPreviewRequest;
