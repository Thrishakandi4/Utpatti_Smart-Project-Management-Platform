import {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './AddTask.module.css';

function AddTask({onClose}){
    const [form,setForm]=useState({title:'',description:'',status:'Backlog',assignedto:''});
    const [users,setUsers]=useState([]);

    useEffect(()=>{
        const fetchUsers=async()=>{
            try{
                 
                const res=await axios.get('https://utpatti-smart-project-management-1kwp.onrender.com/api/users');
                setUsers(res.data);
                if(res.data.length>0){
                    setForm(prev=>({...prev,assignedto:res.data[0]._id}));
                }
            }catch(error){
                console.error('Error fetching users');
            }
        };
        fetchUsers();
    },[]);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axios.post('https://utpatti-smart-project-management-1kwp.onrender.com/api/tasks',{
                title:form.title,
                description:form.description,
                status:form.status,
                assignedto:form.assignedto
            });
            alert('Task created successfully!');
            onClose();
        }catch(error){
            alert(error.response?.data?.message || 'Error creating task');
        }
    };

    return(
        <div className={styles.modal} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e)=>e.stopPropagation()}>
                <h2>Add New Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Task Title</label>
                        <input type="text" placeholder="Enter task title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required/>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Description</label>
                        <textarea placeholder="Enter task description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} required></textarea>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Status</label>
                        <select value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})}>
                            <option value="Backlog">Backlog</option>
                            <option value="In Progress">In Progress</option>
                            <option value="QA">QA</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Assigned To *</label>
                        <select value={form.assignedto} onChange={(e)=>setForm({...form,assignedto:e.target.value})} required>
                            <option value="">Select User</option>
                            {users.map(user=>(
                                <option key={user._id} value={user._id}>{user.name} - {user.role}</option>
                            ))}
                        </select>
                    </div>
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
