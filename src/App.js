import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Commons/Components/Header/Header";
import Home from "./Commons/Components/Home/Home";
import NavBar from "./Commons/Components/NavBar/NavBar";
import Boost from "./Commons/Components/Boost/Boost";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        {/* Define Home route */}
        <Route path="/home" element={<Home />}>
          {/* Define Boost as a nested route inside Home */}
          <Route path="boost" element={<Boost />} />
        </Route>

        {/* Other routes go here */}
      </Routes>
      <NavBar />
    </div>
  );
}

export default App;
