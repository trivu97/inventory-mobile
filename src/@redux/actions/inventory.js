import {ENDPOINTS, INITIAL_CALLBACK, METHODS, STATUS} from 'Constants/api';
import {
  GET_INVENTORY_FAILURE,
  GET_INVENTORY_REQUEST,
  GET_INVENTORY_SUCCESS,
  GET_INVENTORY_BY_PRODUCT_FAILURE,
  GET_INVENTORY_BY_PRODUCT_REQUEST,
  GET_INVENTORY_BY_PRODUCT_SUCCESS,
  ADD_INVENTORY_FAILURE,
  ADD_INVENTORY_REQUEST,
  ADD_INVENTORY_SUCCESS,
  DEL_INVENTORY_FAILURE,
  DEL_INVENTORY_REQUEST,
  DEL_INVENTORY_SUCCESS,
  SET_SELECTED_INVENTORY,
  GET_INVENTORY_BY_INVENTORY_FAILURE,
  GET_INVENTORY_BY_INVENTORY_REQUEST,
  GET_INVENTORY_BY_INVENTORY_SUCCESS,
  UPDATE_INVENTORY_FAILURE,
  UPDATE_INVENTORY_REQUEST,
  UPDATE_INVENTORY_SUCCESS,
  ADD_INVENTORY_DETAIL_FAILURE,
  ADD_INVENTORY_DETAIL_REQUEST,
  ADD_INVENTORY_DETAIL_SUCCESS,
} from '@redux/constants/inventory';
import {query} from 'services/api';

export const getInventoryList = (dispatch) => async (
  data,
  callback = INITIAL_CALLBACK,
) => {
  try {
    dispatch({type: GET_INVENTORY_REQUEST});
    const result = await query({
      method: METHODS.get,
      endpoint: ENDPOINTS.inventory,
    });
    if (result.status === STATUS.OK) {
      dispatch({type: GET_INVENTORY_SUCCESS, payload: result.data});
      callback.onSuccess();
    } else {
      dispatch({type: GET_INVENTORY_FAILURE});
      callback.onFailure();
    }
  } catch (error) {
    dispatch({type: GET_INVENTORY_FAILURE, payload: error});
    callback.onFailure();
  }
};

export const getInventoryListByProduct = (dispatch) => async (
  data,
  callback = INITIAL_CALLBACK,
) => {
  try {
    dispatch({type: GET_INVENTORY_BY_PRODUCT_REQUEST});
    const result = await query({
      method: METHODS.get,
      endpoint: `${ENDPOINTS.inventoryDetail}/product/${data.productId}`,
    });
    if (result.status === STATUS.OK) {
      dispatch({type: GET_INVENTORY_BY_PRODUCT_SUCCESS, payload: result.data});
      callback.onSuccess();
    } else {
      dispatch({type: GET_INVENTORY_BY_PRODUCT_FAILURE});
      callback.onFailure();
    }
  } catch (error) {
    dispatch({type: GET_INVENTORY_BY_PRODUCT_FAILURE, payload: error});
    callback.onFailure();
  }
};

export const addInventory = (dispatch) => async (
  data,
  callback = INITIAL_CALLBACK,
) => {
  try {
    dispatch({type: ADD_INVENTORY_REQUEST});
    const result = await query({
      method: METHODS.post,
      endpoint: ENDPOINTS.inventory,
      data: {
        name: data.name,
        address: data.address,
        describe: data.describe,
      },
    });
    if (result.status === STATUS.CREATED) {
      dispatch({type: ADD_INVENTORY_SUCCESS, payload: result.data});
      callback.onSuccess();
    } else {
      dispatch({type: ADD_INVENTORY_FAILURE});
      callback.onFailure();
    }
  } catch (error) {
    dispatch({type: ADD_INVENTORY_FAILURE, payload: error});
    callback.onFailure();
  }
};

export const deleteInventory = (dispatch) => async (
  id,
  callback = INITIAL_CALLBACK,
) => {
  try {
    dispatch({type: DEL_INVENTORY_REQUEST});
    const result = await query({
      method: METHODS.delete,
      endpoint: `${ENDPOINTS.inventory}/${id}`,
    });
    if (result.status === STATUS.OK) {
      dispatch({type: DEL_INVENTORY_SUCCESS, payload: result.data});
      callback.onSuccess();
    } else {
      dispatch({type: DEL_INVENTORY_FAILURE, payload: error});
      callback.onFailure();
    }
  } catch (error) {
    dispatch({type: DEL_INVENTORY_FAILURE, payload: error});
    callback.onFailure();
  }
};

export const setSelectedInventory = (dispatch) => (id) => {
  dispatch({type: SET_SELECTED_INVENTORY, payload: id});
};

export const getInventoryDetailByInventory = (dispatch) => async (
  data,
  callback = INITIAL_CALLBACK,
) => {
  try {
    dispatch({type: GET_INVENTORY_BY_INVENTORY_REQUEST});
    const result = await query({
      method: METHODS.get,
      endpoint: `${ENDPOINTS.inventoryDetail}/inventory/${data.inventoryId}`,
    });
    if (result.status === STATUS.OK) {
      dispatch({
        type: GET_INVENTORY_BY_INVENTORY_SUCCESS,
        payload: result.data,
      });
      callback.onSuccess();
    } else {
      dispatch({type: GET_INVENTORY_BY_INVENTORY_FAILURE});
      callback.onFailure();
    }
  } catch (error) {
    dispatch({type: GET_INVENTORY_BY_INVENTORY_FAILURE, payload: error});
    callback.onFailure();
  }
};

export const updateInventoryDetail = (dispatch) => async (
  data,
  callback = INITIAL_CALLBACK,
) => {
  try {
    dispatch({type: UPDATE_INVENTORY_REQUEST});
    const result = await query({
      method: METHODS.patch,
      endpoint: `${ENDPOINTS.inventoryDetail}/${data.id}`,
      data: {
        quantity: data.quantity,
      },
    });
    if (result.status === STATUS.OK) {
      dispatch({type: UPDATE_INVENTORY_SUCCESS});
      callback.onSuccess();
    } else {
      dispatch({type: UPDATE_INVENTORY_FAILURE});
      callback.onFailure();
    }
  } catch (error) {
    dispatch({type: UPDATE_INVENTORY_FAILURE, error: error});
    callback.onFailure();
  }
};

export const createInventoryDetail = (dispatch) => async (
  data,
  callback = INITIAL_CALLBACK,
) => {
  try {
    console.log('come here');
    dispatch({type: ADD_INVENTORY_DETAIL_REQUEST});
    const result = await query({
      method: METHODS.post,
      endpoint: ENDPOINTS.inventoryDetail,
      data: {
        product: data.product,
        inventory: data.inventory,
        quantity: data.quantity,
      },
    });
    if (result.status === STATUS.CREATED) {
      dispatch({type: ADD_INVENTORY_DETAIL_SUCCESS});
      callback.onSuccess();
    } else {
      dispatch({type: ADD_INVENTORY_DETAIL_FAILURE});
      callback.onFailure();
    }
  } catch (error) {
    dispatch({type: ADD_INVENTORY_DETAIL_FAILURE, error: error});
    callback.onFailure();
  }
};
