import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import AssignedTasks from './AssignedTasks';
import AddUser from './AddUser';
import styles from './User.module.css';

function User(){
  const [users,setUsers]=useState([]);
  const [showAddUser,setShowAddUser]=useState(false);
  const [editingUser,setEditingUser]=useState(null);
  const [editForm,setEditForm]=useState({name:'',email:'',role:''});
  const [selectedUserId,setSelectedUserId]=useState(null);
  const navigate=useNavigate();

  useEffect(()=>{
    fetchUsers();
  },[]);

  const fetchUsers=async()=>{
    try{
      const response=await axios.get('https://utpatti-smart-project-management-1kwp.onrender.com/api/users');
      setUsers(response.data);
    }catch(error){
      alert('Error fetching users');
    }
  };

  const handleDeleteUser=async(id)=>{
    if(!window.confirm('Delete this user?'))return;
    try{
      await axios.delete(`https://utpatti-smart-project-management-1kwp.onrender.com/api/users/${id}`);
      fetchUsers();
    }catch(error){
      alert('Error deleting user');
    }
  };

  const handleEditClick=(user)=>{
    setEditingUser(user._id);
    setEditForm({name:user.name,email:user.email,role:user.role});
  };

  const handleUpdateUser=async(id)=>{
    try{
      await axios.put(`https://utpatti-smart-project-management-1kwp.onrender.com/api/users/${id}`,editForm);
      setEditingUser(null);
      fetchUsers();
    }catch(error){
      alert('Error updating user');
    }
  };

  return(
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={()=>navigate('/')}>← Back to Home</button>
        <h1>User Management</h1>
        <button className={styles.addBtn} onClick={()=>setShowAddUser(true)}>+ Add User</button>
      </div>

      {showAddUser && <AddUser onClose={()=>{setShowAddUser(false);fetchUsers();}}/>}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user=>(
            <tr key={user._id}>
              <td>
                {editingUser===user._id?(
                  <input value={editForm.name} onChange={(e)=>setEditForm({...editForm,name:e.target.value})}/>
                ):user.name}
              </td>
              <td>
                {editingUser===user._id?(
                  <input value={editForm.email} onChange={(e)=>setEditForm({...editForm,email:e.target.value})}/>
                ):user.email}
              </td>
              <td>
                {editingUser===user._id?(
                  <input value={editForm.role} onChange={(e)=>setEditForm({...editForm,role:e.target.value})}/>
                ):user.role}
              </td>
              <td>
                {editingUser===user._id?(
                  <>
                    <button onClick={()=>handleUpdateUser(user._id)}>Save</button>
                    <button onClick={()=>setEditingUser(null)}>Cancel</button>
                  </>
                ):(
                  <>
                    <button onClick={()=>handleEditClick(user)}>Edit</button>
                    <button onClick={()=>handleDeleteUser(user._id)}>Delete</button>
                    <button onClick={()=>setSelectedUserId(user._id)}>View Tasks</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUserId && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeBtn} onClick={()=>setSelectedUserId(null)}>×</button>
            <AssignedTasks userId={selectedUserId}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
