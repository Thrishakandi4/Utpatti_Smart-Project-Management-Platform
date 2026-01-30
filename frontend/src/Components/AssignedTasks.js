import React from 'react';
import axios from 'axios';
import {useState,useEffect} from 'react';
import styles from './AssignedTasks.module.css';

const AssignedTasks=({userId, onBack})=>{
const phases=["Backlog","In Progress","QA","Done"];
const [tasks,setTasks]=useState({});
const [userName,setUserName]=useState("");
const [selectedTask,setSelectedTask]=useState(null);

useEffect(()=>{
const fetchUserAndTasks=async()=>{
try{
const userRes=await axios.get("http://localhost:5000/api/users");
const user=userRes.data.find(u=>u._id===userId);
if(!user){
console.log("User not found");
return;
}
setUserName(user.name);
const tasksRes=await axios.get("http://localhost:5000/api/tasks");
const userTasks=tasksRes.data.filter(task=>task.assignedto===user._id);
const grouped={};
phases.forEach(p=>grouped[p]=[]);
userTasks.forEach(task=>{
if(!grouped[task.status]){grouped[task.status]=[];}
grouped[task.status].push(task);
});
setTasks(grouped);
}catch(err){
console.log("Error fetching tasks:", err);
}
}
fetchUserAndTasks();
},[userId])

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
console.log("Error moving task:",err);
}
};

const getPhaseIndex=(phase)=>phases.indexOf(phase);
const nextPhase=(phase)=>phases[getPhaseIndex(phase)+1];
const prevPhase=(phase)=>phases[getPhaseIndex(phase)-1];
return(
<div className={styles.container}>
<nav className={styles.nav}>
<ul className={styles.ulmain}>
<li className={styles.navItem}><button onClick={onBack} className={styles.backBtn}>← Back to Users</button></li>
<h2 className={styles.heading}>My Tasks - {userName}</h2>
</ul>
</nav>
<div className={styles.kanban}>
<div className={styles.board}>
{phases.map(phase=>(
<div key={phase} className={styles.column}>
<div className={styles.columnHeader}>{phase}</div>
<div className={styles.cardContainer}>
{tasks[phase]&&tasks[phase].map(task=>(
<div key={task._id} className={styles.card}>
<h4>{task.title}</h4>
<button className={styles.infoBtn} onClick={()=>setSelectedTask(task)}>ℹ️ Details</button>
<div className={styles.actions}>
{getPhaseIndex(phase)>0&&<button className={styles.btnPrev} onClick={()=>moveTask(task._id,prevPhase(phase))}>← Prev</button>}
{getPhaseIndex(phase)<phases.length-1&&<button className={styles.btnNext} onClick={()=>moveTask(task._id,nextPhase(phase))}>Next →</button>}
</div>
</div>
))}<div className={styles.emptyPlaceholder}>{!tasks[phase]||tasks[phase].length===0?"No tasks":""}</div>
</div>
</div>
))}
</div>
</div>
{selectedTask&&<div className={styles.modal} onClick={()=>setSelectedTask(null)}>
<div className={styles.modalContent} onClick={(e)=>e.stopPropagation()}>
<h3>{selectedTask.title}</h3>
<p><strong>Description:</strong> {selectedTask.description||"No description"}</p>
<p><strong>Status:</strong> {selectedTask.status}</p>
<p><strong>Assigned To:</strong> {selectedTask.assignedto}</p>
{selectedTask.history&&selectedTask.history.length>0&&<div><strong>History:</strong><ul>{selectedTask.history.map((h,i)=><li key={i}>{h.phase} - {new Date(h.changedAt).toLocaleString()}</li>)}</ul></div>}
<button className={styles.closeBtn} onClick={()=>setSelectedTask(null)}>Close</button>
</div>
</div>}
</div>
)
}
export default AssignedTasks;