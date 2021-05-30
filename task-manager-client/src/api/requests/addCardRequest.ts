import axios, { AxiosResponse } from "axios";
import API_ROUTES from "../apiRoutes";


function addCardRequest(listIndex: number, title: string): Promise<AxiosResponse<void>> {
    return axios.post<void>(API_ROUTES.cardUrl, {
        "CardListId": listIndex,
        title
    });
}

export default addCardRequest;