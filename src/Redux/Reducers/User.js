import {
  GET_USER_SUCCESS,
  GET_USER_FAILURE
} from '../Types/User';

const initialState = {
  user: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {

    case GET_USER_SUCCESS:
      return { ...state, user: payload };

    case GET_USER_FAILURE:
      return { ...state, user: payload };

    default:
      return state;
  }
};