import {combineReducers} from 'redux';
import user from './user';
import bill from './bill';
import inventory from './inventory';
import product from './product';

export default combineReducers({
  user,
  bill,
  inventory,
  product,
});
