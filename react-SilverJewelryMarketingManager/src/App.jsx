import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar';
import MarketingList from './pages/MarketingList';
import MarketingForm from './pages/MarketingForm';

function App() {
  const [jewelrys, setJewelrys] = useState([
    { 
      id: 1, 
      itemName: "Nhẫn Bạc Liên Hoa", 
      theme: "Tĩnh tâm", 
      colorPalette: "#F5F5F5, #8CA8A6", 
      caption: "Giữ tâm an yên giữa dòng đời vội vã...", 
      price: 650000 
    }
  ]);

  return (
    <BrowserRouter>
      <div className='container-fluid'>
        <nav className='mt-3'>
          <NavBar />
        </nav>
      </div>

      <Routes>
        <Route path='/' element={<MarketingList jewelrys={jewelrys} setJewelrys={setJewelrys}/>}/>
        <Route path='/add' element={<MarketingForm jewelrys={jewelrys} setJewelrys={setJewelrys}/>}/>
        <Route path='/edit/:id' element={<MarketingForm jewelrys={jewelrys} setJewelrys={setJewelrys}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
