import {
  GET_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
} from '@redux/constants/user';

const INITIAL_STATE = {
  token: '',
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTdlZmM5NGM2YjczMTJhNjg5NWY0OTkiLCJpYXQiOjE1ODU4ODQxNzcsImV4cCI6MTU4NjMxNjE3N30.3Nel797HX0xCV-9rF_-L5VUXSZz2WxblG57keQDt24w',
  isLoading: false,
  employee: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_REQUEST:
      return {...state, isLoading: true};
    case GET_EMPLOYEE_SUCCESS:
      return {...state, isLoading: false, employee: action.payload};
    case GET_EMPLOYEE_FAILURE:
      return {...state, isLoading: false};
    case LOGIN_REQUEST:
      return {...state, isLoading: true};
    case LOGIN_FAILURE:
      return {...state, isLoading: false};
    case LOGIN_SUCCESS:
      return {...state, token: action.payload, isLoading: false};
    case LOGOUT:
      return {...state, token: '', employee: {}};
    default:
      return {...state};
  }
};
