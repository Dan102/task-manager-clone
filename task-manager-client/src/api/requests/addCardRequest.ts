import axios, { AxiosResponse } from 'axios';
import API_ROUTES from '../apiRoutes';

function addCardRequest(
  listId: number,
  title: string,
  description?: string,
  deadline?: Date,
  priority?: number,
): Promise<AxiosResponse<void>> {
  return axios.post<void>(API_ROUTES.cardUrl, {
    CardListId: listId,
    title,
    description,
    deadline,
    priority
  });
}

export default addCardRequest;
