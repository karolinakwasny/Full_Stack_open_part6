import { useContext } from 'react'
import NotificationContext from './ContextProvider'

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext)
  return notification
}

export const useNotificationDispatch = () => {
  const [, dispatch] = useContext(NotificationContext)
  return (payload) => {
    dispatch({
      type: payload.type,
      payload: payload.payload
    })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }
}
