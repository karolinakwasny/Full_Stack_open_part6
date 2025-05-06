import { useDispatch, useSelector } from "react-redux"
import { voteForAnecdote } from "../reducers/anecdoteReducer"
import { setNotificationTimeout } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)

  const filteredAnecdotes = anecdotes.filter(anecdote =>
    filter === '' || anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )
  const vote = (id) => {
    dispatch(voteForAnecdote(id))
    const anecdote = anecdotes.find(a => a.id === id).content
    dispatch(setNotificationTimeout(`you voted '${anecdote}'`))
  }

  return (
    <div>
      {[...filteredAnecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
      )}
    </div>
  )
}

export default AnecdoteList
