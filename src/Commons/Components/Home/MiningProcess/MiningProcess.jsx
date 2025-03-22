import "./MiningProcess.css";
import miningLogo from "../../../../Assets/Home/home-logo.svg";
import miningBosstSpeedIcon from "../../../../Assets/Home/boost-roket-icon.svg";
import { useEffect, useState } from "react";
import Success from "./../../Success/Success";
import { useSelector, useDispatch } from "react-redux";
import { getHomePageDataThunk } from "../../../../Store/Middlewares/homePageData";

const MiningProcess = () => {
  const homeData = useSelector((state) => state?.homePage?.homeData);
  const userMiningData = homeData?.user_mining_data || {};
  const showSuccess = useSelector((state) => state?.homePage?.showSuccess);
  // const {
  //   miningPoints = 365,
  //   blockPoint = 80,
  //   miningLeftSecond = 60,
  //   upgradeSpeed = 1
  // } = userMiningData;

  // const miningPoints = 100;
  // const blockPoint = 100;
  // const miningLeftSecond = 60;
  // const upgradeSpeed = 1;
  const totalSquares = 8;

  const miningDuration =
    userMiningData?.miningLeftSecond / userMiningData?.upgradeSpeed;
  const initialFilledSquares = Math.min(
    Math.floor(userMiningData?.miningPoints / userMiningData?.blockPoint)
  );

  const emptySquares = totalSquares - initialFilledSquares;
  const fillInterval =
    emptySquares > 0 ? userMiningData?.miningLeftSecond / emptySquares : 0;

  const dispatch = useDispatch();
  const [squares, setSquares] = useState(
    Array(totalSquares)
      .fill(false)
      .map((_, index) => index < initialFilledSquares)
  );

  const [miningTimeLeft, setMiningTimeLeft] = useState(miningDuration);
  const [miningInterval, setMiningInterval] = useState(null);

  // const formatRemainingTime = (seconds) => {
  //   const hours = Math.floor(seconds / 3600);
  //   const minutes = Math.floor((seconds % 3600) / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${hours}h ${minutes}m ${remainingSeconds}s`;
  // };

  const formatRemainingTime = (milisecond) => {
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
  }, [miningTimeLeft]);

  useEffect(() => {
    const fillIntervalTime = miningDuration / emptySquares;

    const nextFilledCount = Math.floor(
      (miningDuration - miningTimeLeft) / fillIntervalTime
    );
    console.log(nextFilledCount);

    setSquares((prev) => {
      return prev.map(
        (_, index) =>
          index < Math.min(initialFilledSquares + nextFilledCount, totalSquares)
      );
    });
  }, [miningTimeLeft]);

  const handleClaim = () => {
    setSquares(Array(totalSquares).fill(false));

    dispatch(getHomePageDataThunk());
  };

  return (
    <div className="mining">
      <div className="miningHeader">
        <p className="miningText">Mining Process</p>
        <div className="miningSpeed">
          {userMiningData?.boostSpeed > 1 && (
            <>
              <img src={miningBosstSpeedIcon} alt="miningBosstSpeedIcon" />
              <span>X {userMiningData?.boostSpeed}</span>
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
          <p>{userMiningData?.miningPoints}</p>
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
  );
};

export default MiningProcess;
