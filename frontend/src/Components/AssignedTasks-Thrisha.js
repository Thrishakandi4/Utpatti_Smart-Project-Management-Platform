import {useState,useEffect} from 'react';
import axios from 'axios';
import styles from './AssignedTasks.module.css';

function AssignedTasks({userId}){
  const [tasks,setTasks]=useState([]);
  const phases=['Backlog','In Progress','QA','Done'];

  useEffect(()=>{
    fetchTasks();
  },[userId]);

  const fetchTasks=async()=>{
    try{
      const response=await axios.get(`https://utpatti-smart-project-management-1kwp.onrender.com/api/tasks?assignedTo=${userId}`);
      setTasks(response.data.filter(t=>t.assignedTo && t.assignedTo._id===userId));
    }catch(error){
      alert('Error fetching tasks');
    }
  };

  const moveTask=async(taskId,newPhase)=>{
    try{
      await axios.put(`https://utpatti-smart-project-management-1kwp.onrender.com/api/tasks/${taskId}`,{phase:newPhase});
      fetchTasks();
    }catch(error){
      alert('Error moving task');
    }
  };

  return(
    <div className={styles.container}>
      <h2>Assigned Tasks</h2>
      <div className={styles.board}>
        {phases.map(phase=>(
          <div key={phase} className={styles.column}>
            <h3 className={styles.columnHeader}>{phase}</h3>
            <div className={styles.taskList}>
              {tasks.filter(t=>t.phase===phase).map(task=>(
                <div key={task._id} className={styles.taskCard}>
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <div className={styles.taskActions}>
                    {phase!=='Backlog' && <button onClick={()=>moveTask(task._id,phases[phases.indexOf(phase)-1])}>←</button>}
                    {phase!=='Done' && <button onClick={()=>moveTask(task._id,phases[phases.indexOf(phase)+1])}>→</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssignedTasks;
