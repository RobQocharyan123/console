import "./Home.css";
import boosterIcon from "../../../Assets/Home/booster-icon.svg";
import pointsIcon from "../../../Assets/Home/point-icon.svg";
import fon from "../../../Assets/fon.png";
import MiningProcess from "./MiningProcess/MiningProcess";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import Success from "../Success/Success";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch()

  const isBoostPage = location.pathname.includes("boost");
  const isSuccess = useSelector((state) => state?.telegramLogin?.isSuccess);
  const homeData = useSelector((state) => state?.homePage?.homeData);
  
console.log(homeData,"This is home  Data");

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
                <p>{homeData?.total_balance}</p>
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
                <button disabled={homeData?.is_used_daily_code}>Check</button>
              </div>
            </div>

            <MiningProcess />

            <h2>Daily Claim</h2>
            <div className="dailyClaim">
              <p>Daily Treasure Claim</p>
              <p>Claim your daily reward</p>
              <button disabled={homeData?.is_used_daily_claim}>{homeData?.daily_claim_point}</button>
            </div>
          </>
        )}

        <Outlet />
      </div>
    </>
  );
};
export default Home;
