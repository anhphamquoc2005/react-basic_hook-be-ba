import { useState } from "react"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import AppManager from "./pages/AppManager";
import AppForm from "./pages/AppForm";


function App() {
  const [apps, setApps] = useState([]);

  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/">Danh sách hồ sơ</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/add">Thêm hồ sơ mới</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<AppManager apps={apps} setApps={setApps}/>}/>
          <Route path="/add" element={<AppForm apps={apps} setApps={setApps}/>}/>
          <Route path="/edit/:id" element={<AppForm apps={apps} setApps={setApps}/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
