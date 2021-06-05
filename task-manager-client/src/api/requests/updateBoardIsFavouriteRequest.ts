import axios, { AxiosResponse } from 'axios';
import API_ROUTES from '../apiRoutes';

function updateBoardIsFavouriteRequest(id: number, isFavourite: boolean): Promise<AxiosResponse<void>> {
  return axios.patch<void>(API_ROUTES.updateBoardFavouriteUrl(String(id)), {
    IsFavourite: isFavourite,
  });
}

export default updateBoardIsFavouriteRequest;
