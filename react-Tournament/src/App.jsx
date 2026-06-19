import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import TeamList from './pages/TeamList'
import TeamForm from './pages/TeamForm'

function App() {
  const [tournaments, setTournaments] = useState([
    { id: 1, teamName: "Arsenal HCMC", captain: "Quốc Anh", memberCount: 5, pcNumber: 12, status: "Đã thanh toán" }
  ])

  return (
    <BrowserRouter>
      <div className='container-fluid'>
        <nav>
          <NavBar />
        </nav>
      </div>

      <Routes>
        <Route path='/' element={<TeamList tournaments={tournaments} setTournaments={setTournaments}/>}/>
        <Route path='/add' element={<TeamForm tournaments={tournaments} setTournaments={setTournaments}/>}/>
        <Route path='/edit/:id' element={<TeamForm tournaments={tournaments} setTournaments={setTournaments}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
