import {
  GET_BILL_REQUEST,
  GET_BILL_SUCCESS,
  GET_BILL_FAILURE,
  ADD_BILL_REQUEST,
  ADD_BILL_SUCCESS,
  ADD_BILL_FAILURE,
  SET_SELECTED_BILL,
  GET_BILL_DETAIL_REQUEST,
  GET_BILL_DETAIL_SUCCESS,
  GET_BILL_DETAIL_FAILURE,
  UPDATE_BILL_FAILURE,
  UPDATE_BILL_REQUEST,
  UPDATE_BILL_SUCCESS,
} from '@redux/constants/bill';

const INITIAL_STATE = {
  billList: [],
  isLoading: false,
  error: '',
  selectedId: '',
  billDetail: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BILL_REQUEST:
      return {...state, isLoading: true};
    case GET_BILL_SUCCESS:
      return {...state, isLoading: false, billList: action.payload};
    case GET_BILL_FAILURE:
      return {...state, isLoading: false, error: action.payload};
    case ADD_BILL_REQUEST:
      return {...state, isLoading: true};
    case ADD_BILL_SUCCESS:
      return {...state, isLoading: false};
    case ADD_BILL_FAILURE:
      return {...state, isLoading: false, error: action.payload};
    case SET_SELECTED_BILL:
      return {...state, selectedId: action.payload};
    case GET_BILL_DETAIL_REQUEST:
      return {...state, isLoading: true};
    case GET_BILL_DETAIL_SUCCESS:
      return {...state, isLoading: false, billDetail: action.payload};
    case GET_BILL_DETAIL_FAILURE:
      return {...state, isLoading: false, error: action.payload};
    case UPDATE_BILL_REQUEST:
      return {...state, isLoading: true};
    case UPDATE_BILL_SUCCESS:
      return {...state, isLoading: false};
    case UPDATE_BILL_FAILURE:
      return {...state, isLoading: false};
    default:
      return {...state};
  }
};
