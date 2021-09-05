import { combineReducers } from 'redux';
import auth from './auth';
import products from './products';
const app = combineReducers({
    auth,
    products
 })
 export default app