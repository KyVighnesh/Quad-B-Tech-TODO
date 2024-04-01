import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userTasks: [],
}

export const todoSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getUserTasks:(state)=> {
       let task = JSON.parse(localStorage.getItem('task'));   // If user stored any task previously it will validate and pass to the component

       console.log(task)

       if(task) {
        state.userTasks = task;
       }
    },

    setTask:(state,action)=> {
        state.userTasks.push(action.payload)   // New Task added to the existing data

        localStorage.setItem('task',JSON.stringify(state.userTasks))
      },

      setCompleted :(state,action)=> {
        state.userTasks = state.userTasks.map((ele)=> {    // If user want to mark it completed without deleting
            if(state.userTasks[action.payload].id == ele.id){
                ele.completed = true;
            }

            return ele
        })

        localStorage.setItem('task',JSON.stringify(state.userTasks))
      },

      deleteTask:(state,action)=> {   // If user want to delete the task, it will be filtered and removed accordingly
        state.userTasks = state.userTasks.filter((ele)=> {
            return ele.id !== state.userTasks[action.payload].id
        })

        localStorage.setItem('task',JSON.stringify(state.userTasks))
      }
  },

})

export const {getUserTasks,setTask,setCompleted,deleteTask} = todoSlice.actions

export default todoSlice.reducer