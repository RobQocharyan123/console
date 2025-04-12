import "./Home.css";
import boosterIcon from "../../../Assets/Home/booster-icon.svg";
import pointsIcon from "../../../Assets/Home/point-icon.svg";
import fon from "../../../Assets/fon.png";
import MiningProcess from "./MiningProcess/MiningProcess";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import Success from "../Success/Success";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHomePageDataThunk,
  sendDailyCodeThunk,
  sendDailyPointThunk
} from "../../../Store/Middlewares/homePageData";
import LogoAnimation from "../LogoAnimation/LogoAnimation";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dailyCode, setDailyCode] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.telegramLogin?.token);
  const isBoostPage = location.pathname.includes("boost");
  const homeData = useSelector((state) => state?.homePage?.homeData);
  const loading = useSelector((state) => state?.homePage?.loading);
  const showSuccess = useSelector((state) => state?.homePage?.showSuccess);

  const handleSendDailyCode = () => {
    // id:homeData?.id, harcnel id petq a lini te che
    const data = {
      code: dailyCode
    };
    dispatch(sendDailyCodeThunk({ data, token }));

    setDailyCode("");
  };

  const handleDailyPoint = () => {
    dispatch(sendDailyPointThunk({ token }));
  };

  return (
    <>
      {showSuccess && <Success />}

      {/* <img src={fon} alt="fon" className="fon" /> */}

      {loading && <LogoAnimation />}
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
                <input
                  type="text"
                  placeholder="Input code here"
                  onChange={(e) => setDailyCode(e.target.value)}
                  value={dailyCode}
                  disabled={
                    !homeData?.is_used_daily_code ||
                    !homeData?.is_used_daily_code === undefined
                  }
                />
                <button
                  disabled={
                    homeData?.is_used_daily_code ||
                    homeData?.is_used_daily_code === undefined
                  }
                  onClick={handleSendDailyCode}
                >
                  Check
                </button>
              </div>
            </div>

            <MiningProcess />

            <h2>Daily Claim</h2>
            <div className="dailyClaim">
              <p>Daily Treasure Claim</p>
              <p>Claim your daily reward</p>
              <button
                disabled={
                  homeData?.is_used_daily_claim ||
                  homeData?.is_used_daily_claim === undefined
                }
                onClick={handleDailyPoint}
              >
                {homeData?.daily_claim_point
                  ? homeData?.daily_claim_point
                  : "0"}
              </button>
            </div>
          </>
        )}

        <Outlet />
      </div>
    </>
  );
};
export default Home;
