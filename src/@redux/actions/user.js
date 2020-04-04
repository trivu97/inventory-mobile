import {INITIAL_CALLBACK, METHODS, ENDPOINTS, STATUS} from 'Constants/api';
import {
  GET_EMPLOYEE_FAILURE,
  GET_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_SUCCESS,
  LOGOUT,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from '@redux/constants/user';
import {query} from 'services/api';

export const getEmployee = (dispatch) => async (
  data,
  callback = INITIAL_CALLBACK,
) => {
  try {
    dispatch({type: GET_EMPLOYEE_REQUEST});
    const result = await query({
      method: METHODS.get,
      endpoint: ENDPOINTS.user,
    });
    if (result.status === STATUS.OK) {
      dispatch({type: GET_EMPLOYEE_SUCCESS, payload: result.data});
      callback.onSuccess();
    } else {
      dispatch({type: GET_EMPLOYEE_FAILURE});
      callback.onFailure();
    }
  } catch (error) {
    dispatch({type: GET_EMPLOYEE_FAILURE, payload: error});
    callback.onFailure();
  }
};

export const logout = (dispatch) => {
  dispatch({type: LOGOUT});
};

export const login = (dispatch) => async (
  {username, password},
  callback = INITIAL_CALLBACK,
) => {
  try {
    dispatch({type: LOGIN_REQUEST});
    const result = await query({
      method: METHODS.post,
      endpoint: `${ENDPOINTS.user}/login`,
      data: {
        username,
        password,
      },
    });
    if (result.status === STATUS.OK) {
      dispatch({type: LOGIN_SUCCESS, payload: result.data.token});
      callback.onSuccess();
    } else {
      dispatch({type: LOGIN_FAILURE});
      callback.onFailure({message: 'Error'});
    }
  } catch (error) {
    dispatch({type: LOGIN_FAILURE});
    callback.onFailure(error);
  }
};
