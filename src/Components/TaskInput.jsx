import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {getUserTasks,setTask} from '../TodoSlice/todoSlice'
import { useNavigate } from 'react-router-dom';





const AddTask = () => {

    const[userInput,setUserInput] = useState({id:"",title:"",date:"",completed:false})

    const[titleError,setTitleError] = useState("")
    const[dateError,setDateError] = useState("")


    const navigate = useNavigate()


    let dispath = useDispatch()
    const userData = useSelector((state)=>state.todo.userTasks)

   const onHandleChange = (e) => {
    setUserInput({...userInput,[e.target.name]:e.target.value})
    setDateError("")
    setTitleError("")
    }

    const onHandleAdd = () => {

      // Simple validation applied without RegExp

      if(userInput.title.trim().length<=0) {
        setTitleError("Enter Valid Task Title")
      }

      if(userInput.date.length<=0) {
        setDateError("Enter Valid Date for Task Completion")
      }

      if(userInput.title.trim().length>0 && userInput.date.length>0) {

        dispath(setTask({...userInput,id:userData.length+1}))
        console.log(userData)
        navigate("/")
      }
        
    }

    const onHandleClickBack = () => {
        navigate("/")
    }
  return (
    <div>

      <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Task Title
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          name='title'
          onChange={onHandleChange}
        />
      </InputGroup>
      <span style={{color:"red"}}>{titleError}</span>

      <br />
      <br/>

      <InputGroup className="mb-3" style={{width:"50%",justifyContent:'space-between'}}>
        <label htmlFor="">Enter Date</label>
      <input type='date' name = "date" onChange={onHandleChange}
/>
      </InputGroup>
      <span style={{color:"red"}}>{dateError}</span>
        </Modal.Body>

        

        <Modal.Footer>
          <Button variant="secondary" onClick = {onHandleClickBack}>Back</Button>
          <Button variant="primary" onClick={onHandleAdd}>Save Task</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>

    
    </div>
  )
}

export default AddTask