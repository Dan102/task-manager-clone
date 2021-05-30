import axios, { AxiosResponse } from 'axios';
import IBoard from '../../models/interfaces/IBoard';
import API_ROUTES from '../apiRoutes';

function getBoardRequest(boardId: number): Promise<AxiosResponse<IBoard>> {
  return axios.get<IBoard>(API_ROUTES.boardUrl + '/' + boardId);
}

export default getBoardRequest;
