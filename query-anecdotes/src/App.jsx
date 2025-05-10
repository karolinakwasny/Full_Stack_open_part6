import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests/requests.js'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './contexts/useNotification.js'

const App = () => {
  const queryClient = useQueryClient()
  const notificationAndDispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      if (error.response) {
        notificationAndDispatch({
          type: 'SET_NOTIFICATION',
          payload: error.response.data.error
        })
      } else
      notificationAndDispatch({
        type: 'SET_NOTIFICATION',
        payload: `anecdote service not available due to problems in server`
      })
    }

  })
  const handleVote = (anecdote) => {
    console.log('vote')
    newAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationAndDispatch({
      type: 'SET_NOTIFICATION',
      payload: `you voted for '${anecdote.content}'`
    })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
