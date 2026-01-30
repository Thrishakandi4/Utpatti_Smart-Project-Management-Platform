import React,{useState,useEffect} from 'react';
import axios from 'axios';
import styles from './KanbanBoard.module.css';
const KanbanBoard=()=>{
const phases=["Backlog","In Progress","QA","Done"];
const [tasks,setTasks]=useState({});
const [users,setUsers]=useState([]);
const [selectedTask,setSelectedTask]=useState(null);
useEffect(()=>{
const fetchData=async()=>{
try{
const [tasksRes,usersRes]=await Promise.all([
axios.get("https://utpatti-smart-project-management-1kwp.onrender.com/api/tasks"),
axios.get("https://utpatti-smart-project-management-1kwp.onrender.com/api/users")
]);
setUsers(usersRes.data);
const grouped={};
phases.forEach(p=>grouped[p]=[]);
tasksRes.data.forEach(task=>{
if(!grouped[task.status]){grouped[task.status]=[];}
grouped[task.status].push(task);
});
setTasks(grouped);
}catch(err){
console.error("Error fetching data:",err);
}
};
fetchData();
},[]);
const getUserName=(userId)=>{
const user=users.find(u=>u._id===userId);
return user?user.name:'Unknown User';
};
const moveTask=async(taskId,newPhase)=>{
try{
await axios.put(`http://localhost:5000/api/tasks/${taskId}`,{status:newPhase});
const updated={...tasks};
Object.keys(updated).forEach(phase=>{
updated[phase]=updated[phase].filter(t=>t._id!==taskId);
});
const task=Object.values(tasks).flat().find(t=>t._id===taskId);
if(task){
task.status=newPhase;
if(!updated[newPhase]){updated[newPhase]=[];}
updated[newPhase].push(task);
setTasks(updated);
}
}catch(err){
console.error("Error moving task:",err);
}
};
const getPhaseIndex=(phase)=>phases.indexOf(phase);
const nextPhase=(phase)=>phases[getPhaseIndex(phase)+1];
const prevPhase=(phase)=>phases[getPhaseIndex(phase)-1];
return(
<div className={styles.kanban}>
<div className={styles.header}>
<h2>Tasks Status</h2>
</div>
<div className={styles.board}>
{phases.map(phase=>(
<div key={phase} className={styles.column}>
<div className={styles.columnHeader}>{phase}</div>
<div className={styles.cardContainer}>
{tasks[phase]&&tasks[phase].map(task=>(
<div key={task._id} className={styles.card}>
<h4>{task.title}</h4>
<p className={styles.assigned}>👤 {getUserName(task.assignedto)}</p>
<button className={styles.infoBtn} onClick={()=>setSelectedTask(task)}>ℹ️ Details</button>
</div>
))}<div className={styles.emptyPlaceholder}>{!tasks[phase]||tasks[phase].length===0?"No tasks":""}</div>
</div>
</div>
))}
</div>
{selectedTask&&<div className={styles.modal} onClick={()=>setSelectedTask(null)}>
<div className={styles.modalContent} onClick={(e)=>e.stopPropagation()}>
<h3>{selectedTask.title}</h3>
<p><strong>Description:</strong> {selectedTask.description||"No description"}</p>
<p><strong>Status:</strong> {selectedTask.status}</p>
<p><strong>Assigned To:</strong> {getUserName(selectedTask.assignedto)}</p>
{selectedTask.history&&selectedTask.history.length>0&&<div><strong>History:</strong><ul>{selectedTask.history.map((h,i)=><li key={i}>{h.phase} - {new Date(h.changedAt).toLocaleString()}</li>)}</ul></div>}
<button className={styles.closeBtn} onClick={()=>setSelectedTask(null)}>Close</button>
</div>
</div>}
</div>
);
};
export default KanbanBoard;
