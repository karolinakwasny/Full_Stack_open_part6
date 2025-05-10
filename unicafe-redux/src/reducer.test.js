import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    console.log(newState)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })
  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })
  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })
  test('zero is set to initial state', () => {
    const state = initialState

    const actions = [
      { type: 'GOOD' },
      { type: 'OK' },
      { type: 'OK' },
      { type: 'BAD' },
      { type: 'GOOD' },
      { type: 'GOOD' },
      { type: 'GOOD' },
      { type: 'GOOD' },
      { type: 'OK' },
      { type: 'OK' },
      { type: 'BAD' }
    ]
    const newState = actions.reduce(counterReducer, state)
    deepFreeze(newState)
    expect(newState).toEqual({
      good: 5,
      ok: 4,
      bad: 2
    })

    const actionZero = {
      type: 'ZERO'
    }
    const finalState = counterReducer(newState, actionZero)
    expect(finalState).toEqual(initialState)
    expect(finalState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})
