import {ENDPOINTS, INITIAL_CALLBACK, METHODS, STATUS} from 'Constants/api';
import {
  GET_BILL_FAILURE,
  GET_BILL_REQUEST,
  GET_BILL_SUCCESS,
  ADD_BILL_FAILURE,
  ADD_BILL_REQUEST,
  ADD_BILL_SUCCESS,
  GET_BILL_DETAIL_FAILURE,
  GET_BILL_DETAIL_REQUEST,
  GET_BILL_DETAIL_SUCCESS,
  ADD_BILL_DETAIL_FAILURE,
  ADD_BILL_DETAIL_REQUEST,
  ADD_BILL_DETAIL_SUCCESS,
  SET_SELECTED_BILL,
  UPDATE_BILL_FAILURE,
  UPDATE_BILL_REQUEST,
  UPDATE_BILL_SUCCESS,
} from '@redux/constants/bill';
import {query} from 'services/api';

export const getAllBill = (dispatch) => async (
  data,
  callback = INITIAL_CALLBACK,
) => {
  try {
    dispatch({type: GET_BILL_REQUEST});
    const result = await query({
      method: METHODS.get,
      endpoint: ENDPOINTS.bill,
    });
    if (result.status === STATUS.OK) {
      dispatch({type: GET_BILL_SUCCESS, payload: result.data});
      callback.onSuccess();
    } else {
      dispatch({type: GET_BILL_FAILURE});
      callback.onFailure();
    }
  } catch (error) {
    dispatch({type: GET_BILL_FAILURE, payload: error});
    callback.onFailure();
  }
};

export const addBillItem = (dispatch) => async (
  data,
  callback = INITIAL_CALLBACK,
) => {
  try {
    dispatch({type: ADD_BILL_REQUEST});
    const result = await query({
      method: METHODS.post,
      endpoint: ENDPOINTS.bill,
      data: {
        inventory: data.inventory,
        type: data.type,
      },
    });

    // console.warn(result);

    if (result.status === STATUS.CREATED) {
      dispatch({type: ADD_BILL_SUCCESS, payload: result.data});
      callback.onSuccess();
    } else {
      dispatch({type: ADD_BILL_FAILURE});
    }
  } catch (error) {
    console.warn(error);
    dispatch({type: ADD_BILL_FAILURE, payload: error});
    callback.onFailure();
  }
};

export const getBillDetailByBill = (dispatch) => async (
  data,
  callback = INITIAL_CALLBACK,
) => {
  try {
    dispatch({type: GET_BILL_DETAIL_REQUEST});
    const result = await query({
      method: METHODS.get,
      endpoint: `${ENDPOINTS.billDetail}/bill/${data.billId}`,
    });
    if (result.status === STATUS.OK) {
      dispatch({type: GET_BILL_DETAIL_SUCCESS, payload: result.data});
      callback.onSuccess();
    } else {
      dispatch({type: GET_BILL_DETAIL_FAILURE});
      callback.onFailure();
    }
  } catch (error) {
    dispatch({type: GET_BILL_DETAIL_FAILURE, payload: error});
    callback.onFailure();
  }
};

export const addBillDetail = (dispatch) => async (
  data,
  callback = INITIAL_CALLBACK,
) => {
  try {
    dispatch({type: ADD_BILL_DETAIL_REQUEST});
    const result = await query({
      method: METHODS.post,
      endpoint: ENDPOINTS.billDetail,
      data: {
        bill: data.billId,
        product: data.productId,
        quantity: data.quantity,
      },
    });
    if (result.status === STATUS.CREATED) {
      dispatch({type: ADD_BILL_DETAIL_SUCCESS, payload: result.data});
      callback.onSuccess();
    } else {
      dispatch({type: ADD_BILL_DETAIL_FAILURE});
      callback.onFailure();
    }
  } catch (error) {
    dispatch({type: ADD_BILL_DETAIL_FAILURE, payload: error});
    callback.onFailure();
  }
};

export const setSelectedId = (dispatch) => async (_id) => {
  dispatch({type: SET_SELECTED_BILL, payload: _id});
};

export const saveChange = (dispatch) => async (
  data,
  callback = INITIAL_CALLBACK,
) => {
  try {
    dispatch({type: UPDATE_BILL_REQUEST});
    const result = await query({
      method: METHODS.patch,
      endpoint: `${ENDPOINTS.bill}/${data.id}`,
      data: {
        editable: false,
      },
    });
    if (result.status === STATUS.OK) {
      dispatch({type: UPDATE_BILL_SUCCESS});
      callback.onSuccess();
    } else {
      dispatch({type: UPDATE_BILL_FAILURE});
      callback.onFailure();
    }
  } catch (error) {
    dispatch({type: UPDATE_BILL_FAILURE});
    callback.onFailure();
  }
};
