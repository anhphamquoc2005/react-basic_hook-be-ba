import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import API_EndpointList from './pages/API_EndpointList';
import API_EndpointForm from './pages/API_EndpointForm';

function App() {
  const [apiendpoints, setApiendpoints] = useState([
    { id: 1, endpoint: "/api/v1/users", method: "POST", status: "Đang test", responseTime: 120, description: "API tạo tài khoản người dùng mới" }
  ]);

  return (
    <BrowserRouter>
      <div className='container-fluid'>
        <nav className='mt-2'>
          <NavBar />
        </nav>

        <Routes>
          <Route path='/' element={<API_EndpointList apiendpoints={apiendpoints} setApiendpoints={setApiendpoints}/>}/>
          <Route path='/add' element={<API_EndpointForm apiendpoints={apiendpoints} setApiendpoints={setApiendpoints}/>}/>
          <Route path='/edit/:id' element={<API_EndpointForm apiendpoints={apiendpoints} setApiendpoints={setApiendpoints}/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
