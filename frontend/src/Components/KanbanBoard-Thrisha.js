import {useState,useEffect} from 'react';
import axios from 'axios';
import AddTask from './AddTask';
import styles from './KanbanBoard.module.css';

function KanbanBoard(){
  const [tasks,setTasks]=useState([]);
  const [showAddTask,setShowAddTask]=useState(false);
  const [selectedTask,setSelectedTask]=useState(null);
  const phases=['Backlog','In Progress','QA','Done'];

  useEffect(()=>{
    fetchTasks();
  },[]);

  const fetchTasks=async()=>{
    try{
      const response=await axios.get('https://utpatti-smart-project-management-1kwp.onrender.com/api/tasks');
      setTasks(response.data);
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
      <button className={styles.addBtn} onClick={()=>setShowAddTask(true)}>+ Add Task</button>
      
      {showAddTask && <AddTask onClose={()=>{setShowAddTask(false);fetchTasks();}}/>}

      <div className={styles.board}>
        {phases.map(phase=>(
          <div key={phase} className={styles.column}>
            <h3 className={styles.columnHeader}>{phase}</h3>
            <div className={styles.taskList}>
              {tasks.filter(t=>t.phase===phase).map(task=>(
                <div key={task._id} className={styles.taskCard} onClick={()=>setSelectedTask(task)}>
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <small>Assigned: {task.assignedTo?.name || 'Unassigned'}</small>
                  <div className={styles.taskActions}>
                    {phase!=='Backlog' && <button onClick={(e)=>{e.stopPropagation();moveTask(task._id,phases[phases.indexOf(phase)-1]);}}>←</button>}
                    {phase!=='Done' && <button onClick={(e)=>{e.stopPropagation();moveTask(task._id,phases[phases.indexOf(phase)+1]);}}>→</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedTask && (
        <div className={styles.modal} onClick={()=>setSelectedTask(null)}>
          <div className={styles.modalContent} onClick={(e)=>e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={()=>setSelectedTask(null)}>×</button>
            <h2>{selectedTask.title}</h2>
            <p><strong>Description:</strong> {selectedTask.description}</p>
            <p><strong>Phase:</strong> {selectedTask.phase}</p>
            <p><strong>Assigned To:</strong> {selectedTask.assignedTo?.name || 'Unassigned'}</p>
            <p><strong>Created:</strong> {new Date(selectedTask.createdAt).toLocaleString()}</p>
            <div className={styles.history}>
              <h3>History</h3>
              {selectedTask.history?.map((h,i)=>(
                <div key={i} className={styles.historyItem}>
                  <span>{h.phase}</span>
                  <span>{new Date(h.timestamp).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default KanbanBoard;
