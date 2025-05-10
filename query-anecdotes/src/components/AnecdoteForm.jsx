import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests/requests'
import { useNotificationDispatch } from '../contexts/useNotification.js'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationAndDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
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

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length === 0) {
      notificationAndDispatch({
        type: 'SET_NOTIFICATION',
        payload: `anecdote must be at least 1 character long`
      })
      return
    }
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationAndDispatch({
      type: 'SET_NOTIFICATION',
      payload: `you created '${content}'`
    })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
