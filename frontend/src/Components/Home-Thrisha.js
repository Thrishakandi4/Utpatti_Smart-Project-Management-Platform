import {useNavigate} from 'react-router-dom';
import styles from './Home.module.css';

function Home(){
  const navigate=useNavigate();

  return(
    <div className={styles.container}>
      <h1 className={styles.title}>Utpatti - Smart Project Management Platform</h1>
      <p className={styles.subtitle}>Manage your SDLC workflow with Kanban boards</p>
      <div className={styles.buttons}>
        <button className={styles.btn} onClick={()=>navigate('/user')}>User Dashboard</button>
        <button className={styles.btn} onClick={()=>navigate('/admin')}>Admin Dashboard</button>
      </div>
    </div>
  );
}

export default Home;
