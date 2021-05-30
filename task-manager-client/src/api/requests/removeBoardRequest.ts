import axios, { AxiosResponse } from 'axios';
import API_ROUTES from '../apiRoutes';

function removeBoardRequest(boardId: number): Promise<AxiosResponse<void>> {
  return axios.delete<void>(API_ROUTES.boardUrl + '/' + boardId);
}

export default removeBoardRequest;
