import EpicLibrary from './pages/EpicLibrary'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import EpicForm from './pages/EpicForm'

function App() {
  const [games, setGames] = useState([
    { id: 1, gameName: "EA Sports FC 26", platform: "Steam", genre: "Sports", hoursPlayed: 120, status: "Đang chơi" }
  ])

  return (
    <BrowserRouter>
      <div className='container-fluid'>
        <nav>
          <NavBar />
        </nav>

        <Routes>
          <Route path='/' element={<EpicLibrary games={games} setGames={setGames}/>} />
          <Route path='/add' element={<EpicForm games={games} setGames={setGames}/>}/>
          <Route path='/edit/:id' element={<EpicForm games={games} setGames={setGames}/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
