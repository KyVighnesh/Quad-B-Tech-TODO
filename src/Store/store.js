import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../TodoSlice/todoSlice'


export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
})

