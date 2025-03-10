import "./Home.css";
import boosterIcon from "../../../Assets/Home/booster-icon.svg";
import pointsIcon from "../../../Assets/Home/point-icon.svg";
import fon from "../../../Assets/fon.png";
import MiningProcess from "./MiningProcess/MiningProcess";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import Success from "../Success/Success";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isBoostPage = location.pathname.includes("boost");

  return (
    <>
      {/* <img src={fon} alt="fon" className="fon" /> */}
      <div className="home">
        {!isBoostPage && (
          <>
            <div className="pointsBuster">
              <div className="points">
                <div>
                  <img src={pointsIcon} alt="pointsIcon" />
                  <span>Points</span>
                </div>
                <p>11,540</p>
              </div>
              <div className="boost">
                <div>
                  <img src={boosterIcon} alt="boosterIcon" />
                  <span>Booster</span>
                </div>
                <button onClick={() => navigate("boost")}>Boost</button>
              </div>
            </div>

            <div className="todayCode">
              <div className="todayText">
                <p>Today's code</p>
              </div>
              <div className="todayContent">
                <input type="text" placeholder="Input code here" />
                <button>Check</button>
              </div>
            </div>

            <MiningProcess />

            <h2>Daily Claim</h2>
            <div className="dailyClaim">
              <p>Daily Treasure Claim</p>
              <p>Claim your daily reward</p>
              <button>100</button>
            </div>
          </>
        )}

        <Outlet />
      </div>
    </>
  );
};
export default Home;
