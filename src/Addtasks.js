import { useEffect, useState } from 'react';
import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Addtasks = (props) => {
    const {addTask,editedtask}=props;
  const [taskData, setTaskData] = useState({title:'',description:''});
  const [titleError, setTitleError] = useState(false);
  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };
useEffect(() =>{
    setTaskData(editedtask)
},[editedtask])

  const handleAdd = () => {
    console.log("**************",taskData);
    if (!taskData.title) {
      setTitleError(true);
      return;
    }else{ setTitleError(false);}
    // console.log(editedtask)
   
    // addTask(taskData);
    if (editedtask?.id) {
        addTask(taskData,true)
        } 
        else{
        addTask(taskData,false);
        }
    setTaskData({ title: '', description: '' });
  };

  return (
    <div className="formHeader">
      <form>
        <label>Title*</label>
        <br />
        <TextField
          required
          id="outlined-required"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          error={titleError}
          helperText={titleError ? 'Title is required' : ''}
        />
        <br />
        <br />
        <label>Description (optional)</label>
        <br />
        <TextField id="outlined-multiline-static"multiline rows={5} name="description"value={taskData.description} onChange={handleChange}/>
      </form>
      <br />
      <Button
        variant="contained"color="success"className="btn"onClick={handleAdd}>
       {editedtask.id ? 'Update Tasks' : 'Add Tasks'} 
      </Button>
    </div>
  );
};

export default Addtasks;
