const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newStateGood = {
        ...state,
        good: state.good + 1
      }
      return newStateGood
    case 'OK':
      const newStateOk = {
        ...state,
        ok: state.ok + 1
      }
      return newStateOk
    case 'BAD':
      const newStateBad = {
        ...state,
        bad: state.bad + 1
      }
      return newStateBad
    case 'ZERO':
      return initialState
    default: return state
  }

}

export default counterReducer
