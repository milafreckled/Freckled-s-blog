const logMiddleware = () => {
  return (store) => (next) => async (action) => {
    console.log(store.getState());
    next(action);
  };
};
