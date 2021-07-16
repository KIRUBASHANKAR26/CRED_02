import Sidebar from './components/sideBar';
import Topbar from './components/topbar';
import Taskform from './components/task/task';
import './App.css';

function App() {
  return (
    <div >
      <Sidebar/>
      <Topbar/>
      <Taskform/>
    </div>
  );
}

export default App;
