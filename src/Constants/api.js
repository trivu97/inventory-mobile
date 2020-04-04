/**
 * @dev
 */

// export const API_URL = 'http://192.168.31.44:5068/';

//Heroku url
export const API_URL = 'https://secure-sea-33103.herokuapp.com/';

/**
 * @production
 */
// export const API_URL = 'https://car-hub-production.herokuapp.com/';

export const METHODS = {
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  delete: 'DELETE',
};

export const STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
};

export const ENDPOINTS = {
  bill: 'bill',
  inventory: 'inventory',
  user: 'user',
  billDetail: 'billDetail',
  product: 'product',
  inventoryDetail: 'inventoryDetail',
};

export const INITIAL_CALLBACK = {
  onSuccess: () => null,
  onFailure: () => null,
};
