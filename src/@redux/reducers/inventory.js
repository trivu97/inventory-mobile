import {
  GET_INVENTORY_REQUEST,
  GET_INVENTORY_SUCCESS,
  GET_INVENTORY_FAILURE,
  GET_INVENTORY_BY_PRODUCT_REQUEST,
  GET_INVENTORY_BY_PRODUCT_SUCCESS,
  GET_INVENTORY_BY_PRODUCT_FAILURE,
  ADD_INVENTORY_REQUEST,
  ADD_INVENTORY_SUCCESS,
  ADD_INVENTORY_FAILURE,
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

const INITIAL_STATE = {
  inventoryList: [],
  inventoryDetailList: [],
  error: '',
  isLoading: false,
  selectedId: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_INVENTORY_REQUEST:
      return {...state, isLoading: true};
    case GET_INVENTORY_SUCCESS:
      return {...state, isLoading: false, inventoryList: action.payload};
    case GET_INVENTORY_FAILURE:
      return {...state, isLoading: false, error: action.payload};
    case GET_INVENTORY_BY_PRODUCT_REQUEST:
      return {...state, isLoading: true};
    case GET_INVENTORY_BY_PRODUCT_SUCCESS:
      return {...state, isLoading: false, inventoryDetailList: action.payload};
    case GET_INVENTORY_BY_PRODUCT_FAILURE:
      return {...state, isLoading: false, error: action.payload};
    case ADD_INVENTORY_REQUEST:
      return {...state, isLoading: true};
    case ADD_INVENTORY_SUCCESS:
      return {...state, isLoading: false};
    case ADD_INVENTORY_FAILURE:
      return {...state, isLoading: false};
    case DEL_INVENTORY_REQUEST:
      return {...state, isLoading: true};
    case DEL_INVENTORY_SUCCESS:
      return {...state, isLoading: false};
    case DEL_INVENTORY_FAILURE:
      return {...state, isLoading: false};
    case SET_SELECTED_INVENTORY:
      return {...state, selectedId: action.payload};
    case GET_INVENTORY_BY_INVENTORY_REQUEST:
      return {...state, isLoading: true};
    case GET_INVENTORY_BY_INVENTORY_SUCCESS:
      return {...state, isLoading: false, inventoryDetailList: action.payload};
    case GET_INVENTORY_BY_INVENTORY_FAILURE:
      return {...state, isLoading: false, error: action.payload};
    case UPDATE_INVENTORY_REQUEST:
      return {...state, isLoading: true};
    case UPDATE_INVENTORY_SUCCESS:
      return {...state, isLoading: false};
    case UPDATE_INVENTORY_FAILURE:
      return {...state, isLoading: false};
    case ADD_INVENTORY_DETAIL_REQUEST:
      return {...state, isLoading: true};
    case ADD_INVENTORY_DETAIL_SUCCESS:
      return {...state, isLoading: false};
    case ADD_INVENTORY_DETAIL_FAILURE:
      return {...state, isLoading: false};
    default:
      return {...state};
  }
};
