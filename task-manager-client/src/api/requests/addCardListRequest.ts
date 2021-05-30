import axios, { AxiosResponse } from "axios";
import API_ROUTES from "../apiRoutes";


function addCardListRequest(boardId: number, title: string, color: string): Promise<AxiosResponse<void>> {
    return axios.post<void>(API_ROUTES.cardListUrl, {
        boardId,
        title,
        color
    });
}

export default addCardListRequest;