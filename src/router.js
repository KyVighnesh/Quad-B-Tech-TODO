import { createBrowserRouter } from "react-router-dom";
import ViewTasks from "./Components/TaskList";
import AddTask from './Components/TaskInput'

const router = createBrowserRouter([
    {path:"",element:<ViewTasks/>},
    {path:"/addTask",element:<AddTask/>}
])


export default router;