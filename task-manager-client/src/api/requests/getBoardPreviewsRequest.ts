import axios, { AxiosResponse } from "axios";
import IBoardPreview from "../../models/interfaces/IBoardPreview";
import API_ROUTES from "../apiRoutes";


function getBoardPreviewsRequest(): Promise<AxiosResponse<IBoardPreview[]>> {
    return axios.get<IBoardPreview[]>(API_ROUTES.boardsUrl);
}

export default getBoardPreviewsRequest;