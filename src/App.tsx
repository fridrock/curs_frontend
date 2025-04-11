import { Routes, Route } from 'react-router';
import Home from './components/Home';
import useUserStore from './state/userStore';
import Auth from './components/users/Auth';
import Register from './components/users/Register';


function App() {
  const userStore = useUserStore()
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/auth" element={<Auth/>}/> 
        <Route path="/register" element={<Register/>}/> 
      </Routes>
    </div>
  );
}

export default App;
