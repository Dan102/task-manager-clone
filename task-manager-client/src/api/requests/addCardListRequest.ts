import axios, { AxiosResponse } from "axios";
import API_ROUTES from "../apiRoutes";


function addCardListRequest(boardId: number, title: string): Promise<AxiosResponse<void>> {
    return axios.post<void>(API_ROUTES.cardListUrl, {
        "BoardId": boardId,
        "Title": title
    });
}

export default addCardListRequest;