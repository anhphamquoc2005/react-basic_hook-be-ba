import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import FinanceList from './pages/FinanceList'
import FinanceForm from './pages/FinanceForm'

function App() {
  const [ finances, setFinances ] = useState([
    { id: 1, transactionName: "Đóng tiền trọ tháng 6", type: "Chi phí", category: "Sinh hoạt", amount: 3500000, date: "2026-06-22" }
  ])

  return (
    <BrowserRouter>
      <div className='container-fluid'>
        <nav>
          <NavBar />
        </nav>

        <Routes>
          <Route path='/' element={<FinanceList finances={finances} setFinances={setFinances}/>}/>
          <Route path='/add' element={<FinanceForm finances={finances} setFinances={setFinances}/>}/>
          <Route path='/edit/:id' element={<FinanceForm finances={finances} setFinances={setFinances}/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
