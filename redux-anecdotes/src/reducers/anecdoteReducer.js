import { createSlice, current } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers:{
    voteForAnecdote(state, action){
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      if (anecdote)
        anecdote.votes = anecdote.votes + 1
      // console.log('state after vote:', current(state))
    },
    createAnecdote(state, action) {
      state.push(action.payload)
      // console.log('state after create:', current(state))
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

export const { voteForAnecdote, createAnecdote, appendAnecdote, setAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export default anecdoteSlice.reducer

