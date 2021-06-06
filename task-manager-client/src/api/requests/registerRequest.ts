import axios, { AxiosResponse } from 'axios';
import ILoggedUser from '../../models/interfaces/ILoggedUser';
import API_ROUTES from '../apiRoutes';

function registerRequest(username: string, password: string): Promise<AxiosResponse<ILoggedUser>> {
  return axios.post<ILoggedUser>(API_ROUTES.registerUrl, {
    username,
    password,
  });
}

export default registerRequest;
