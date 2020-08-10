  
import {
  SHOW_BACKDROP,
  HIDE_BACKDROP
} from '../Types/Page';

export const showLoading = (queries) => (dispatch) => {
  dispatch({ type: SHOW_BACKDROP, payload: queries });
};

export const hideLoading = (queries) => (dispatch) => {
  dispatch({ type: HIDE_BACKDROP, payload: queries });
};

export default {
  showLoading,
  hideLoading
};