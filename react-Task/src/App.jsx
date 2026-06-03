import { BrowserRouter, Route, Routes } from "react-router-dom"
import TaskManager from "./pages/TaskManager"
import NavBar from "./components/NavBar"
import TaskDetail from "./pages/TaskDetail"
import NotFound from "./pages/NotFound"
import { useState } from "react"
import AddTask from "./pages/AddTask"
import Home from "./pages/Home"

function App() {

  const [tasks, setTasks] = useState([]);

  return (
    <BrowserRouter>
      <NavBar />
      
      <div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/tasks" element={<TaskManager tasks={tasks} setTasks={setTasks}/>}/>
          <Route path="/tasks/add" element={<AddTask tasks={tasks} setTasks={setTasks}/>}/>
          <Route path="/tasks/:id" element={<TaskDetail tasks={tasks}/>}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
