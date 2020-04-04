import {INITIAL_CALLBACK, METHODS, ENDPOINTS, STATUS} from 'Constants/api';
import {
  GET_PRODUCT_FAILURE,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_REQUEST,
  DEL_PRODUCT_FAILURE,
  DEL_PRODUCT_REQUEST,
  DEL_PRODUCT_SUCCESS,
  SET_SELECTED_ID,
  GET_PRODUCT_BY_INVENTORY_FAILURE,
  GET_PRODUCT_BY_INVENTORY_REQUEST,
  GET_PRODUCT_BY_INVENTORY_SUCCESS,
} from '@redux/constants/product';
import {query} from 'services/api';

export const getProduct = (dispatch) => async (
  data,
  callback = INITIAL_CALLBACK,
) => {
  try {
    dispatch({type: GET_PRODUCT_REQUEST});
    const result = await query({
      method: METHODS.get,
      endpoint: ENDPOINTS.product,
    });
    if (result.status === STATUS.OK) {
      dispatch({type: GET_PRODUCT_SUCCESS, payload: result.data});
      callback.onSuccess();
    } else {
      dispatch({type: GET_PRODUCT_FAILURE, payload: error});
      callback.onFailure();
    }
  } catch (error) {
    dispatch({type: GET_PRODUCT_FAILURE, payload: error});
    callback.onFailure();
  }
};

export const getProductListByInventory = (dispatch) => async (
  data,
  callback = INITIAL_CALLBACK,
) => {
  try {
    dispatch({type: GET_PRODUCT_BY_INVENTORY_REQUEST});
    const result = await query({
      method: METHODS.get,
      endpoint: ENDPOINTS.product,
    });
    if (result.status === STATUS.OK) {
      dispatch({type: GET_PRODUCT_BY_INVENTORY_SUCCESS, payload: result.data});
      callback.onSuccess();
    } else {
      dispatch({type: GET_PRODUCT_BY_INVENTORY_FAILURE, payload: error});
      callback.onFailure();
    }
  } catch (error) {
    dispatch({type: GET_PRODUCT_BY_INVENTORY_FAILURE, payload: error});
    callback.onFailure();
  }
};

export const addProduct = (dispatch) => async (
  data,
  callback = INITIAL_CALLBACK,
) => {
  try {
    dispatch({type: ADD_PRODUCT_REQUEST});
    const result = await query({
      method: METHODS.post,
      endpoint: ENDPOINTS.product,
      data: {
        name: data.name,
        price: data.price,
        describe: data.describe,
      },
    });
    if (result.status === STATUS.CREATED) {
      dispatch({type: ADD_PRODUCT_SUCCESS, payload: result.data});
      callback.onSuccess();
    } else {
      dispatch({type: ADD_PRODUCT_FAILURE});
      callback.onFailure();
    }
  } catch (error) {
    dispatch({type: ADD_PRODUCT_FAILURE, payload: error});
    callback.onFailure();
  }
};

export const deleteProduct = (dispatch) => async (
  data,
  callback = INITIAL_CALLBACK,
) => {
  try {
    dispatch({type: DEL_PRODUCT_REQUEST});
    const result = await query({
      method: METHODS.delete,
      endpoint: `${ENDPOINTS.product}/${data.id}`,
    });
    if (result.status === STATUS.OK) {
      dispatch({type: DEL_PRODUCT_SUCCESS});
      callback.onSuccess();
    } else {
      dispatch({type: DEL_PRODUCT_FAILURE, payload: error});
      callback.onFailure();
    }
  } catch (error) {
    dispatch({type: DEL_PRODUCT_FAILURE, payload: error});
    callback.onFailure();
  }
};

export const setSelectedId = (dispatch) => (_id) => {
  dispatch({type: SET_SELECTED_ID, payload: _id});
};
