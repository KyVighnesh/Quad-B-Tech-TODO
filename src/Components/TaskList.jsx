import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getUserTasks,setCompleted,deleteTask} from '../TodoSlice/todoSlice'
import {useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Styles from '../StyleSheets/viewTask.css'
import { useNavigate } from 'react-router-dom';






const ViewTasks = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const[tasks,setTasks] = useState([])

    let task = useSelector((state)=> state.todo.userTasks)    // get state value from slice

    useEffect(()=> {

        // If ther is a previous data/history of the user we can pull it from local storage and render
        dispatch(getUserTasks())


   },[])


    useEffect(()=> {

        // If task exists otherwise it will consider the blank array declared by default in state
        
        if(task.length>=0) {
            setTasks(task)
            console.log(task)
        }
    },[task])

    const handleAddTask = () => {
        // Navigating to other compoenent to add new Task
        navigate('/AddTask')
    }

    const onHandleComplete = (element,index) => {
        dispatch(setCompleted(index))
    
    }

    const onHandleDelete = (element,index) => {
        dispatch(deleteTask(index))
    }
  return (

    <div id = "component-body">
        <div id='main-container'>
            <div className='header'>
            <h4>TODO LIST</h4>
            </div>
 {['sm'].map((breakpoint) => (
        <ListGroup key={breakpoint} style={{width:'100%'}}>

            {tasks.map((ele,index)=> {
                return(
                    
<div className = "list-parent" style={{width:'80%'}}>
<ListGroup.Item className = "listGroupItems" style={{width:'100%'}}>

    <li style={{textDecoration:ele.completed?"line-through":""}}>{ele.title}</li>
    <li style={{textDecoration:ele.completed?"line-through":""}}>{ele.date}</li>
    <Button variant="primary" onClick = {()=>onHandleComplete(ele,index)} style={{textDecoration:ele.completed?"line-through":""}}>Mark Completed</Button>{' '}

    <Button variant="danger" onClick = {()=>onHandleDelete(ele,index)}>Delete</Button>{' '}



</ListGroup.Item>


</div>          
                )
            })}
          
        </ListGroup>
      ))}

      <br />
      <br />

      <div className="add-button">
            <Button variant="dark" onClick={handleAddTask}>Add New Task</Button>

            </div>

</div>
    </div>
  )
}

export default ViewTasks
