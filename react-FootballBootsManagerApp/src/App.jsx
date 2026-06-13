import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import BootsList from './pages/BootsList';
import BootsForm from './pages/BootsForm';

function App() {
  const [boots, setBoots] = useState([
    { id: 1, model: "Nike Mercurial Vapor 15", brand: "Nike", size: 41, price: 2300000, quantity: 15 }
  ]);

  return (
    <BrowserRouter>
      <div className='container-fluid'>
        <nav>
          <NavBar />
        </nav>

        <div className='container'>
          <Routes>
            <Route path='/' element={<BootsList boots={boots} setBoots={setBoots}/>}/>
            <Route path='/add' element={<BootsForm boots={boots} setBoots={setBoots}/>}/>
            <Route path='/edit/:id' element={<BootsForm boots={boots} setBoots={setBoots}/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
