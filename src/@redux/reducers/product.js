import {
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  DEL_PRODUCT_REQUEST,
  DEL_PRODUCT_SUCCESS,
  DEL_PRODUCT_FAILURE,
  SET_SELECTED_ID,
} from '@redux/constants/product';

const initialState = {
  productList: [],
  isLoading: false,
  error: '',
  selectedId: '',
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_PRODUCT_REQUEST:
      return {...state, isLoading: true};
    case GET_PRODUCT_SUCCESS:
      return {...state, isLoading: false, productList: payload};
    case GET_PRODUCT_FAILURE:
      return {...state, isLoading: false, error: payload};
    case ADD_PRODUCT_REQUEST:
      return {...state, isLoading: true};
    case ADD_PRODUCT_SUCCESS:
      return {...state, isLoading: false};
    case ADD_PRODUCT_FAILURE:
      return {...state, isLoading: false};
    case DEL_PRODUCT_REQUEST:
      return {...state, isLoading: true};
    case DEL_PRODUCT_SUCCESS:
      return {...state, isLoading: false};
    case DEL_PRODUCT_FAILURE:
      return {...state, isLoading: false};
    case SET_SELECTED_ID:
      return {...state, selectedId: payload};
    default:
      return {...state};
  }
};
