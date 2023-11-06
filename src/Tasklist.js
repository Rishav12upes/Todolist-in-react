import React, { useEffect, useState } from 'react';
import './App.css'; // Make sure to import your CSS file
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function Tasklist(props) {
  const { task, removeTask, editTask } = props;
  const [filterKey, setFilterKey] = useState('');
  const [filterResult, setFilterResult] = useState([]);
  const [disabledRows, setDisabledRows] = useState({});

  useEffect(() => {
    filterTask();
  }, [filterKey]);

console.log('$$$$$$$$$$$$$$$$$$$$$$$44',task);
  const handleOnChange = (event) => {
    setFilterKey(event.target.value);
  };

  const filterTask = () => {
    console.log(task,'----------------------')
    
    let filterArray = (task||[]).filter((val) => val.title?.toLowerCase().includes(filterKey));
    setFilterResult(filterArray);
  };

  const toggleDisable = (id) => {
    const updatedDisabledRows = { ...disabledRows };
    updatedDisabledRows[id] = !updatedDisabledRows[id];
    setDisabledRows(updatedDisabledRows);
  };

  const tasklist = filterResult.map((val) => {
    const isRowDisabled = disabledRows[val.id];

    return (
      <tr key={val.id}>
        <td>{val.title}</td>
        <td>{val.description}</td>
        <td>
          <span onClick={() => removeTask(val.id)} style={{ cursor: 'pointer' }}>
            <DeleteIcon />
          </span>
          <span
            style={{
              cursor: isRowDisabled ? 'not-allowed' : 'pointer',
              marginLeft: '30px',
              color: isRowDisabled ? 'gray' : 'inherit',
            }}
            onClick={() => (isRowDisabled ? null : editTask(val.id))}
          >
            <EditIcon />
          </span>
        </td>
        <td>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleDisable(val.id)}
            />
          </label>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h2 className='contactsHeader'>Task List</h2>
      <div className='searchBar'>
        <input type='text' placeholder='Search...' onChange={handleOnChange} />
      </div>
      <table className='task-table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{tasklist}</tbody>
      </table>
    </div>
  );
}
