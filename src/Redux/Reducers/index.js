import { combineReducers } from 'redux';
import Page from './Page';
import Repos from './Repos';
import User from './User';

export default combineReducers({
  page: Page,
  repos: Repos,
  user: User
});