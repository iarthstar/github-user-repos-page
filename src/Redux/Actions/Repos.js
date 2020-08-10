import { SHOW_BACKDROP, HIDE_BACKDROP } from "../Types/Page";
import { GET_REPOS_SUCCESS, GET_REPOS_FAILURE } from "../Types/Repos";
import { getReposAPI } from "../../Api/Repos";


export const getRepos = (queries, pagination) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: ++getState().page.backdrop });
  try {
    const { data } = await getReposAPI(queries, pagination);
    dispatch({ type: GET_REPOS_SUCCESS, payload: data });
    dispatch({ type: HIDE_BACKDROP, payload: --getState().page.backdrop });
  }
  catch (err) {
    dispatch({ type: GET_REPOS_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: --getState().page.backdrop });
  }
};