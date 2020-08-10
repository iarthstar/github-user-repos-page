import { SHOW_BACKDROP, HIDE_BACKDROP } from "../Types/Page";
import { GET_USER_SUCCESS, GET_USER_FAILURE } from "../Types/User";
import { getUserAPI } from "../../Api/User";


export const getUser = (queries, pagination) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: ++getState().page.backdrop });
  try {
    const { data } = await getUserAPI(queries, pagination);
    dispatch({ type: GET_USER_SUCCESS, payload: data });
    dispatch({ type: HIDE_BACKDROP, payload: --getState().page.backdrop });
  }
  catch (err) {
    dispatch({ type: GET_USER_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: --getState().page.backdrop });
  }
};