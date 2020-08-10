import {
  SHOW_BACKDROP,
  HIDE_BACKDROP
} from '../Types/Page';

const initialState = {
  backdrop: 0
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {

    case SHOW_BACKDROP:
      return { ...state, backdrop: payload };

    case HIDE_BACKDROP:
      return { ...state, backdrop: payload };

    default:
      return state;
  }
};