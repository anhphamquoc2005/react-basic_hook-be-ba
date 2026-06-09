import NavBar from "./components/NavBar";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SquadList from "./pages/SquadList";
import PlayerForm from "./pages/PlayerForm";

function App() {
  const [players, setPlayers] = useState([
    { id: 1, namePlayer: "B. Saka", position: "RW", ovr: 114, status: "Đá chính" },
    { id: 2, namePlayer: "M. Ødegaard", position: "CAM", ovr: 115, status: "Đội trưởng" },
    { id: 3, namePlayer: "W. Saliba", position: "CB", ovr: 113, status: "Đá chính" }
  ]);

  return (
    <BrowserRouter>
      <div className="container-fluid">
        <nav>
          <NavBar />
        </nav>

        <Routes>
          <Route path="/" element={<SquadList players={players} setPlayers={setPlayers}/>}/>
          <Route path="/add" element={<PlayerForm players={players} setPlayers={setPlayers}/>}/>
          <Route path="/edit/:id" element={<PlayerForm players={players} setPlayers={setPlayers}/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
