import React, { useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { useState } from 'react';
import { AiFillSketchCircle, AiOutlineDelete } from 'react-icons/ai';
const App = () => {
  const [taskName, setTaskName]=useState("");
  const [allTasks, setAllTasks]=useState([]);
  const inputHandler=(event)=>{
    setTaskName(event.target.value);
  }
  const fetchAllTasks=async ()=>{
    const {data: response}=await axios.get(`https://task-server-8gjg.onrender.com/task/getAllTasks`);
    setAllTasks(response);
  }
  const submitHandler=async (event)=>{
    event.preventDefault();
    if(taskName.length===0)
    {
      toast("please enter a valid task name");
      return;
    }
    const res=await axios.post(`https://task-server-8gjg.onrender.com/task/insertTask`, {taskName});
    if(res.data.result==="true"){
      setTaskName("")
      toast(res.data.message);
      fetchAllTasks();
    }else{
      toast(res.data.message);
    }
  }
  useEffect(()=>{
    fetchAllTasks();
  }, []);
  const deleteTask=async (event,x)=>{
    const response=await axios.post(`https://task-server-8gjg.onrender.com/task/deleteTask`, x);
    fetchAllTasks();
    toast(response.data.message);
  }
  return (
    <div>
      <h2>Tasks To Do</h2>
      <div className='formDiv'>
        <form onSubmit={submitHandler}>
          <input type='text' value={taskName} onChange={inputHandler} placeholder='Add a task'/>
          <button type='submit'>Add</button>
        </form>
      </div>
      <div className='tasksDiv'>
        {allTasks.map((x,key)=>{
          return <div key={key} className='taskDiv'>
            <div className='nameDiv'> 
            {x.name}
            </div>
            <button className='logosDiv' onClick={event=>deleteTask(event, x)} key={key}>
              <AiOutlineDelete className='logo'/>
            </button>
          </div>
        })}
      </div>
      <ToastContainer />
    </div>
  )
}

export default App;