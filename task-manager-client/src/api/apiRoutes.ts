const baseUrl = 'https://localhost:44321/api';
const API_ROUTES = {
  boardUrl: baseUrl + '/boards',
  cardListUrl: baseUrl + '/card-lists',
  cardUrl: baseUrl + '/cards',
  loginUrl: baseUrl + '/users/login',
  registerUrl: baseUrl + '/users',
  updateBoardFavouriteUrl: (id: string): string => `${baseUrl}/boards/${id}/favourite`,
  updateBoardCardListsUrl: (id: string): string => `${baseUrl}/boards/${id}/card-lists`,
};

export default API_ROUTES;
