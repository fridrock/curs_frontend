import { Routes, Route } from "react-router";
import Home from "./components/Home";
import useUserStore from "./state/userStore";
import Auth from "./components/users/Auth";
import Register from "./components/users/Register";
import Project from "./components/projects/Project";
import ProjectList from "./components/projects/ProjectsList";
import TasksList from "./components/projects/tasks/TasksList";
import "./App.css";

function App() {
  const userStore = useUserStore();
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:projectId" element={<TasksList />} />
      </Routes>
    </div>
  );
}

export default App;
