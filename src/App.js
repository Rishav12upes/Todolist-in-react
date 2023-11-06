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
  ||[]});

  const [editValue, setEditTask] = useState({})
  // const [updateBoolen, setBoolen] = useState(false)

  useEffect(()=>{
    localStorage.setItem(localStorageKey,JSON.stringify(task))

  },[task])
console.log()
//   useEffect(()=>{
//     setBoolen(true)
// console.log('7777777777777')
//   },[updateBoolen])

  const editvalue = (data) => {
    const updatedList = task.map((item) =>
      item.id === data.id ? { ...item, ...data } : item
    );
    setTask(updatedList);
    setEditTask({}); // Clear the editValue
  };
  // console.log('&&&&&&&&&&&&&&&&',task)
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
  
  // const addTask=(data, boolen)=>
  // { 
  //   // console.log(data,"from app.js");
  //   if(boolen){
  //     // task[0] = data
  //     console.log('666666666666666666666666------')
  //     // setTask(task);
  //     editvalue(task,data)
  //     console.log('11111111111111111111111------')
  //   }else{
  //     data.id = uuid4();
  //   setTask([...task,data]);
  //   }
  // }

//   const editvalue = (task,data) =>
//   {
//    setBoolen(true)
//    let objIndex = task.findIndex((obj => obj.id == data.id));

// //Log object to Console.
// console.log("Before update: ", task[objIndex])

// //Update object's name property.
// task[objIndex].title = "Laila"
//    setTask(task);
//   }
  

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

  // const saveEditedTask = (id, updatedData) => {
  //   const updatedList = task.map((val) => (val.id === id ? { ...val, data: updatedData } : val));
  //   setTask(updatedList);
  //   setEditingTask(null);
  // };
  return (
    <div>
    <Header/>
    <Addtasks addTask={addTask} editedtask={editValue} />
    <Tasklist task={task} removeTask={removeTask} editTask={editTask}/>
   
    </div>
  );
}

export default App;
