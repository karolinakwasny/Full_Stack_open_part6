import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../ContextProvider'

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
        notificationAndDispatch({ type: 'SET_NOTIFICATION', payload: error.response.data.error })
      } else
      notificationAndDispatch({ type: 'SET_NOTIFICATION', payload: `anecdote service not available due to problems in server` })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationAndDispatch({ type: 'SET_NOTIFICATION' , payload: `you created '${content}'`})
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
