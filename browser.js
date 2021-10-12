import { createStore } from "./index.js";

const counterReducer = (action, state) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + action.payload
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - action.payload
      }
    default:
      return state;
  }
}

const otherReducer = (action, state) => {
  switch (action.type) {
    case 'SOME_ACTION':
      return {
        ...state,
        text: state.text === 'FOO' ? 'BAR' : 'FOO'
      }
    default:
      return state;
  }
}



const reducers = {
  counterReducer,
  otherReducer
}

const initialState = {
  counterReducer: {
    count: 0
  },
  otherReducer: {
    text: 'FOO'
  }
}

window.store = createStore(reducers, initialState)

window.store.subscribe(state => state.counterReducer.count, (newVal, oldVal) => {
  console.log(`Counter subscriber, old value: ${oldVal}, new value: ${newVal}`)
  document.getElementById('counter').innerHTML = `Counter: ${newVal}`
})

window.store.subscribe(state => state.otherReducer.text, (newVal, oldVal) => {
  console.log(`Other subscriber, old value: ${oldVal}, new value: ${newVal}`)
  document.getElementById('text').innerHTML = `Text: ${newVal}`
})
