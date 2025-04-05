import "./MiningProcess.css";
import miningLogo from "../../../../Assets/Home/home-logo.svg";
import miningBosstSpeedIcon from "../../../../Assets/Home/boost-roket-icon.svg";
import { useEffect, useState } from "react";
import Success from "./../../Success/Success";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUpdateHomeData } from "../../../../Store/Slices/homePageSlice";
import { getHomePageDataThunk } from "../../../../Store/Middlewares/homePageData";
import { toast } from "react-toastify";

const MiningProcess = ({ homeData }) => {
  console.log(homeData, "llllllllll");
  const token = useSelector((state) => state?.telegramLogin?.token);
  const showSuccess = useSelector((state) => state?.homePage?.showSuccess);

  const totalSquares = 8;

  const miningDuration =
    homeData?.user_mining_data?.mining_left_second /
    homeData?.user_mining_data?.boost_speed;
  const initialFilledSquares = Math.min(
    Math.floor(
      homeData?.user_mining_data?.mining_points /
        homeData?.user_mining_data?.block_point
    )
  );

  const emptySquares = totalSquares - initialFilledSquares;
  const fillInterval =
    emptySquares > 0
      ? homeData?.user_mining_data?.mining_left_second / emptySquares
      : 0;

  const dispatch = useDispatch();
  const [squares, setSquares] = useState(
    Array(totalSquares)
      .fill(false)
      .map((_, index) => index < initialFilledSquares)
  );

  const [miningTimeLeft, setMiningTimeLeft] = useState(
    miningDuration ? miningDuration : 1
  );

  const [miningInterval, setMiningInterval] = useState(null);

  const formatRemainingTime = (milisecond) => {
    if (!milisecond) {
      return "00:00:00";
    }
    const seconds = Math.floor(milisecond / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  useEffect(() => {
    if (initialFilledSquares < totalSquares && miningTimeLeft > 0) {
      const fillIntervalTime = miningDuration / emptySquares;

      const interval = setInterval(() => {
        setMiningTimeLeft((prevTime) => {
          if (prevTime === 1) {
            return;
          }
          const newTime = prevTime - 1000;
          if (newTime <= 0) {
            clearInterval(interval);
            setMiningInterval(null);
          }
          return newTime;
        });
      }, 1000);
      setMiningInterval(interval);
      return () => {
        if (miningInterval) {
          clearInterval(miningInterval);
          setMiningInterval(null);
        }
      };
    }
  }, []);
  useEffect(() => {
    if (miningTimeLeft > 0 && initialFilledSquares < totalSquares) {
      const fillIntervalTime = miningDuration / emptySquares;

      const nextFilledCount = Math.floor(
        (miningDuration - miningTimeLeft) / fillIntervalTime
      );

      setSquares((prev) => {
        return prev.map(
          (_, index) =>
            index <
            Math.min(initialFilledSquares + nextFilledCount, totalSquares)
        );
      });
    }
  }, [miningTimeLeft, homeData]);

  useEffect(() => {
    const fillIntervalTime = miningDuration / emptySquares;

    const nextFilledCount = Math.floor(
      (miningDuration - miningTimeLeft) / fillIntervalTime
    );

    setSquares((prev) => {
      return prev.map(
        (_, index) =>
          index < Math.min(initialFilledSquares + nextFilledCount, totalSquares)
      );
    });
  }, [miningTimeLeft, homeData]);

  const handleClaim = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3030/user/mining-claim",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSquares(Array(totalSquares).fill(false));

      dispatch(setUpdateHomeData(response.data));

      const newMiningDuration =
        response.data?.user_mining_data?.mining_left_second /
        response.data?.user_mining_data?.upgrade_speed;

      setMiningTimeLeft(newMiningDuration ? newMiningDuration : 1);
      startMining(newMiningDuration);
    } catch (error) {
      const message =
        error?.response?.data?.msg || "An unexpected error occurred";
      toast.error(message);
      console.log(error);
    }
  };

  const startMining = (duration) => {
    if (duration > 0) {
      setMiningTimeLeft(duration);
      const interval = setInterval(() => {
        setMiningTimeLeft((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
      setMiningInterval(interval);
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(getHomePageDataThunk({ token }));
    }
  }, []);

  return (
    <>
      {showSuccess && <Success />}

      <div className="mining">
        <div className="miningHeader">
          <p className="miningText">Mining Process</p>
          <div className="miningSpeed">
            {homeData?.user_mining_data?.boost_speed > 1 && (
              <>
                <img src={miningBosstSpeedIcon} alt="miningBosstSpeedIcon" />
                <span>X {homeData?.user_mining_data?.boost_speed}</span>
              </>
            )}
          </div>
        </div>

        <div className="squares">
          {squares.map((item, index) => {
            return (
              <div
                key={index}
                className="squareItem"
                style={{
                  background: item ? "#64FFFF" : "transparent",
                  border: "1px solid #64FFFF"
                }}
              ></div>
            );
          })}
        </div>

        <div className="miningTime">
          <span>Blocks complete in:</span>
          <span>{formatRemainingTime(miningTimeLeft)}</span>
        </div>

        <div className="miningCompleted">
          <div className="squareCompleted">
            <img src={miningLogo} alt="miningLogo" />
          </div>
          <div className="completedText">
            <p>{homeData?.user_mining_data?.mining_points}</p>
          </div>
          <button
            onClick={handleClaim}
            disabled={squares.every((square) => !square)}
          >
            Claim
          </button>
        </div>
        {showSuccess && <Success />}
      </div>
    </>
  );
};

export default MiningProcess;
