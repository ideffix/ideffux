export const createStore = (reducers, initialState) => {
  const subs = [];

  let state = initialState;

  const getState = () => state

  const dispatch = (action) => {
    const newState = Object.entries(reducers).reduce((currentState, [reducerName, reducerFn]) => ({
      ...currentState,
      [reducerName]: reducerFn(action, state[reducerName])
    }), {})

    subs
      .filter(sub => sub.selector(state) !== sub.selector(newState))
      .forEach(sub => sub.cb(sub.selector(newState), sub.selector(state)))

    state = newState
  }

  const subscribe = (selector, cb) => {
    subs.push({
      selector, cb
    })
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}
