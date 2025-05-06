import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
      setNotification(state, action) {
        return action.payload
      },
      clearNotification() {
        return ''
      }
    }
  })

export const setNotificationTimeout = (message) => {
  return async dispatch => {
    dispatch(notificationSlice.actions.setNotification(message))
    setTimeout(() => {
      dispatch(notificationSlice.actions.clearNotification())
    }, 5000)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
