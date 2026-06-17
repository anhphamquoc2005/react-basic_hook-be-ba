import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import NavBar from './components/NavBar'
import ServerList from './pages/ServerList';
import ServerForm from './pages/ServerForm';

function App() {
  const [servers, setServers] = useState([
    { id: 1, serverName: "Production-DB-01", ipAddress: "192.168.1.50", os: "Ubuntu 22.04", ram: 16, cpuCores: 8, status: "Active" }
  ]);

  return (
    <BrowserRouter>
      <div className='container-fluid'>
        <nav>
          <NavBar />
        </nav>

        <Routes>
          <Route path='/' element={<ServerList servers={servers} setServers={setServers}/>}/>
          <Route path='/add' element={<ServerForm servers={servers} setServers={setServers}/>}/>
          <Route path='/edit/:id' element={<ServerForm servers={servers} setServers={setServers}/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
