import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import KanbanBoard from './KanbanBoard';
import AddUser from './AddUser';
import AddTask from './AddTask';
import axios from 'axios';
import styles from './Admin.module.css';
function Admin(){
  const [view,setView]=useState('kanban');
  const [stats,setStats]=useState({totalTasks:0,totalUsers:0,backlog:0,inProgress:0,qa:0,done:0});
  const [showAddUser,setShowAddUser]=useState(false);
  const [showAddTask,setShowAddTask]=useState(false);
  const navigate=useNavigate();

  useEffect(()=>{
    if(view==='statistics'){
      fetchStats();
      const interval=setInterval(fetchStats,5000);
      return ()=>clearInterval(interval);
    }
  },[view]);

  const fetchStats=async()=>{
    try{
      const [tasks,users,backlog,inProgress,qa,done]=await Promise.all([
        axios.get('http://localhost:5000/api/tasks/count'),
        axios.get('http://localhost:5000/api/users/count'),
        axios.get('http://localhost:5000/api/tasks/count/Backlog'),
        axios.get('http://localhost:5000/api/tasks/inprogress/count'),
        axios.get('http://localhost:5000/api/tasks/count/QA'),
        axios.get('http://localhost:5000/api/tasks/done/count')
      ]);
      setStats({
        totalTasks:tasks.data.count,
        totalUsers:users.data.count,
        backlog:backlog.data.count,
        inProgress:inProgress.data.count,
        qa:qa.data.count,
        done:done.data.count
      });
    }catch(error){
      console.error('Error fetching stats');
    }
  };

  return(
    <div className={styles.container}>
      <nav className={styles.navbar}>
         <h1 >Admin Dashboard</h1>
        <button className={styles.addBtn} onClick={()=>navigate('/')}>← Back to Home</button>
        
        <div className={styles.navActions}>
          <button className={styles.addBtn} onClick={()=>setShowAddUser(true)}>Add User</button>
          <button className={styles.addBtn} onClick={()=>setShowAddTask(true)}>Add Task</button>
        </div>
      </nav>

      <div className={styles.mainContent}>
        {view==='kanban'?<KanbanBoard/>:(
          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <h3>Total Tasks</h3>
              <p>{stats.totalTasks}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Total Users</h3>
              <p>{stats.totalUsers}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Backlog</h3>
              <p>{stats.backlog}</p>
            </div>
            <div className={styles.statCard}>
              <h3>In Progress</h3>
              <p>{stats.inProgress}</p>
            </div>
            <div className={styles.statCard}>
              <h3>QA</h3>
              <p>{stats.qa}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Done</h3>
              <p>{stats.done}</p>
            </div>
          </div>
        )}
      </div>

      <div className={styles.viewSelector}>
        <button className={view==='kanban'?styles.active:''} onClick={()=>setView('kanban')}>📊 Kanban Board</button>
        <button className={view==='statistics'?styles.active:''} onClick={()=>setView('statistics')}>📈 Statistics</button>
      </div>

      {showAddUser&&<AddUser onClose={()=>setShowAddUser(false)}/>}
      {showAddTask&&<AddTask onClose={()=>setShowAddTask(false)}/>}
    </div>
  );
}

export default Admin;