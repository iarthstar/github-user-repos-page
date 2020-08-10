import {
  GET_REPOS_SUCCESS,
  GET_REPOS_FAILURE
} from '../Types/Repos';

const initialState = {
  repos: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {

    case GET_REPOS_SUCCESS:
      return { ...state, repos: payload };

    case GET_REPOS_FAILURE:
      return { ...state, repos: payload };

    default:
      return state;
  }
};