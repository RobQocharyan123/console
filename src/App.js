import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Commons/Components/Header/Header";
import Home from "./Commons/Components/Home/Home";
import NavBar from "./Commons/Components/NavBar/NavBar";
import Boost from "./Commons/Components/Boost/Boost";
import LogoAnimation from "./Commons/Components/LogoAnimation/LogoAnimation";
import Tasks from "./Commons/Components/Tasks/Tasks";
import AirDrop from "./Commons/Components/AirDrop/AirDrop";
import Profile from "./Commons/Components/Profile/Profile";
import Friends from "./Commons/Components/Friends/Friends";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

        <Route path="/tasks" element={<Tasks />}>
          <Route path="boost" element={<Boost />} />
        </Route>

        <Route path="/airDrop" element={<AirDrop />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/friends" element={<Friends />}></Route>
      </Routes>
      <NavBar />
      <ToastContainer />
    </div>
  );
}

export default App;
