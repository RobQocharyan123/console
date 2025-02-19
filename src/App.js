import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Commons/Components/Header/Header";
import Home from "./Commons/Components/Home/Home";
import NavBar from "./Commons/Components/NavBar/NavBar";
import Boost from "./Commons/Components/Boost/Boost";
import LogoAnimation from './Commons/Components/LogoAnimation/LogoAnimation';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/home" element={<Home />}>
          <Route path="boost" element={<Boost />} />
        </Route>
        <Route path="/" element={<LogoAnimation />}></Route>

        {/* Other routes go here */}
      </Routes>
      <NavBar />
    </div>
  );
}

export default App;
