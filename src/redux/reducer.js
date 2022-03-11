import { CHANGE_LOCALE } from "./actions";

export const initialState = { localelocale: "en-US" };
const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_LOCALE:
      return {
        ...state,
        locale: payload,
      };
    default:
      return state;
  }
};

export default reducer;
