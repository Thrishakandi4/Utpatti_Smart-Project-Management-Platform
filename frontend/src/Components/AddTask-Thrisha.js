import {useState,useEffect} from 'react';
import axios from 'axios';
import styles from './AddTask.module.css';

function AddTask({onClose}){
  const [form,setForm]=useState({title:'',description:'',assignedTo:'',phase:'Backlog'});
  const [users,setUsers]=useState([]);

  useEffect(()=>{
    fetchUsers();
  },[]);

  const fetchUsers=async()=>{
    try{
      const response=await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    }catch(error){
      alert('Error fetching users');
    }
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      await axios.post('http://localhost:5000/api/tasks',form);
      onClose();
    }catch(error){
      alert('Error creating task');
    }
  };

  return(
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e)=>e.stopPropagation()}>
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required/>
          <textarea placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} required/>
          <select value={form.assignedTo} onChange={(e)=>setForm({...form,assignedTo:e.target.value})}>
            <option value="">Select User</option>
            {users.map(u=><option key={u._id} value={u._id}>{u.name}</option>)}
          </select>
          <select value={form.phase} onChange={(e)=>setForm({...form,phase:e.target.value})}>
            <option value="Backlog">Backlog</option>
            <option value="In Progress">In Progress</option>
            <option value="QA">QA</option>
            <option value="Done">Done</option>
          </select>
          <div className={styles.buttons}>
            <button type="submit">Create Task</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
