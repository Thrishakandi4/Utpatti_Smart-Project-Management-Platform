import React from 'react';
import axios from 'axios';
import {useState,useEffect} from 'react';
import AssignedTasks from './AssignedTasks';
import styles from './User.module.css';
import {Link} from 'react-router-dom';

const User=()=>{
    const [users,setUsers]=useState([]);
    const [selectedUserId,setSelectedUserId]=useState(null);
    const [editingUserId,setEditingUserId]=useState(null);
    const [editData,setEditData]=useState({name:"", email:"", role:""});
    
    useEffect(()=>{
        const fetchUsers=async()=>{
            try{
                const res=await axios.get("http://localhost:5000/api/users");
                setUsers(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchUsers();
    },[])

    const handleDeleteUser=async(userId)=>{
        if(window.confirm("Are you sure you want to delete this user?")){
            try{
                await axios.delete(`http://localhost:5000/api/users/${userId}`);
                setUsers(users.filter(user=>user._id!==userId));
                console.log("User deleted successfully");
            }
            catch(err){
                console.log("Error deleting user:", err);
            }
        }
    }

    const handleEditClick=(user)=>{
        setEditingUserId(user._id);
        setEditData({name:user.name, email:user.email, role:user.role});
    }

    const handleUpdateUser=async(userId)=>{
        try{
            await axios.put(`http://localhost:5000/api/users/${userId}`, editData);
            setUsers(users.map(user=>user._id===userId ? {...user, ...editData} : user));
            setEditingUserId(null);
            alert("User updated successfully");
        }
        catch(err){
            console.log("Error updating user:", err);
            alert("Error updating user: " + err.message);
        }
    }

    const handleCancel=()=>{
        setEditingUserId(null);
    }
    
    if(selectedUserId){
        return <AssignedTasks userId={selectedUserId} onBack={()=>setSelectedUserId(null)}/>
    }
    
    return(
        <div> 
        <nav>
            <ul className={styles.ulmain}>
               
                 
                <li className={styles.item}><Link to="/" className={styles.itemsub}>Home</Link></li>
                <p className={styles.description}>View, edit, delete users and manage their assigned tasks</p>
                
            </ul>
        </nav>
       <table border="1" style={{width:"100%"}}>
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Assigned Tasks</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {users && users.map((user)=>(
                <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>
                        {editingUserId===user._id ? (
                            <input 
                                type="text" 
                                value={editData.name}
                                onChange={(e)=>setEditData({...editData, name:e.target.value})}
                            />
                        ) : user.name}
                    </td>
                    <td>
                        {editingUserId===user._id ? (
                            <input 
                                type="email" 
                                value={editData.email}
                                onChange={(e)=>setEditData({...editData, email:e.target.value})}
                            />
                        ) : user.email}
                    </td>
                    <td>
                        {editingUserId===user._id ? (
                            <select 
                                value={editData.role}
                                onChange={(e)=>setEditData({...editData, role:e.target.value})}
                            >
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                            </select>
                        ) : user.role}
                    </td>
                    <td><button onClick={()=>setSelectedUserId(user._id)}>See Assigned Tasks</button></td>
                    <td>
                        {editingUserId===user._id ? (
                            <>
                                <button onClick={()=>handleUpdateUser(user._id)} style={{backgroundColor:"#4CAF50"}}>Save</button>
                                <button onClick={handleCancel} style={{backgroundColor:"#808080", marginLeft:"5px"}}>Cancel</button>
                            </>
                        ) : (
                            <button onClick={()=>handleEditClick(user)} style={{backgroundColor:"#2196F3"}}>Edit</button>
                        )}
                    </td>
                    <td><button onClick={()=>handleDeleteUser(user._id)} style={{backgroundColor:"#d32f2f"}}>Delete</button></td>
                </tr>
            ))}
        </tbody>
       </table>
       </div>
    )
}
export default User;