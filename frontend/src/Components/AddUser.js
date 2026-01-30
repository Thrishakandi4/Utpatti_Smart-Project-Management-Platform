import { useState } from 'react';
import axios from 'axios';
import styles from './AddUser.module.css';

function AddUser({onClose}){
    const [form,setForm]=useState({name:'',email:'',role:'Developer'});

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axios.post('https://utpatti-smart-project-management-1kwp.onrender.com/api/users',form);
            alert('User created successfully!');
            onClose();
        }catch(error){
            alert(error.response?.data?.message || 'Error creating user');
        }
    };

    return(
        <div className={styles.modal} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e)=>e.stopPropagation()}>
                <h2>Add New User</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required/>
                    <input type="email" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required/>
                    <select value={form.role} onChange={(e)=>setForm({...form,role:e.target.value})} required>
                        <option value="Developer">Developer</option>
                        <option value="Tester">Tester</option>
                        <option value="Member">Member</option>
                    </select>
                    <div className={styles.buttons}>
                        <button type="submit">Create User</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddUser;
