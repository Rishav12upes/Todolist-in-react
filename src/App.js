import Addtasks from './Addtasks';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Tasklist from './Tasklist';
import uuid4 from 'uuid4';
function App() {
  const  localStorageKey="task";
  const [task,setTask]=useState(()=>{
    return JSON.parse(localStorage.getItem(localStorageKey))
  ||[]})

  const [editValue, setEditTask] = useState({})
  

  useEffect(()=>{
    localStorage.setItem(localStorageKey,JSON.stringify(task))

  },[task])


  const editvalue = (data) => {
    const updatedList = task.map((item) =>
      item.id === data.id ? { ...item, ...data } : item
    );
    setTask(updatedList);
    setEditTask({}); // Clear the editValue
  };
  
  const addTask = (data) => {
    if (editValue.id) {
      // If editValue has an id, update the task
      editvalue(data);
    } else {
      data.id = uuid4();
      setTask([...task, data]);
    }
    // setEditTask({}); // Clear the editValue
  };
  

  const removeTask=(id)=>
  {
    const confirm = window.confirm("Do you want delete task.?")
    if(confirm){
      console.log(confirm,'-----------------------')

      const updatedList=task.filter((val)=>
      {
        return val.id !==id;
      })
      console.log(updatedList,'-------------updatedList----------')
      setTask(updatedList);
    }
    
  }
  console.log(task,'-----------------------')

  const editTask = (id) => {
  let tasks =  task.filter((val) => val.id==id);
  if(tasks.length){
    setEditTask(tasks[0])
  }
  };

  return (
    <div>
    <Header/>
    <Addtasks addTask={addTask} editedtask={editValue} />
    <Tasklist key={JSON.stringify(task)} task={task} removeTask={removeTask} editTask={editTask}/>
   
    </div>
  );
}

export default App;
