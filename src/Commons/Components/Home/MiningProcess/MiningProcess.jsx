import "./MiningProcess.css";
import miningLogo from "../../../../Assets/Home/home-logo.svg";
import { useEffect, useState } from "react";
import Success from "./../../Success/Success";
import { useSelector } from "react-redux";


const MiningProcess = () => {
  // squars
  const homeData = useSelector((state) => state?.homePage?.homeData);
  const userMiningData = homeData?.user_mining_data || {};
  const showSuccess = useSelector((state) => state?.homePage?.showSuccess);

  const [squares, setSquares] = useState(Array(8).fill(false));
  const [timer, setTimer] = useState(0);

  const [time, setTime] = useState(new Date());


  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000 / userMiningData?.boostSpeed); 
  
    return () => clearInterval(interval);
  }, [userMiningData?.boostSpeed]);
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // squars logic

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 360000 / userMiningData?.boostSpeed);

    return () => clearInterval(interval);
  }, [userMiningData?.boostSpeed]);

  useEffect(() => {
    if (timer > 0 && timer <= 8) {
      setSquares((prev) => {
        const nextSquares = [...prev];
        nextSquares[timer - 1] = true;
        return nextSquares;
      });
    }
  }, [timer]);

  const handleClaim = () => {
    if (squares.every(Boolean)) {

      setSquares(Array(8).fill(false));
      setTimer(0);
    }
  };
  const completedCount = squares.filter(Boolean).length;

  return (
    <div className="mining">
      <p className="miningText">Mining Process</p>

      <div className="squares">
        {Array.isArray(squares) &&
          squares.map((item, index) => {
            return (
              <div
                key={index}
                className="squareItem"
                style={{
                  background: item ? "#64FFFF " : "transparent",
                  border: "1px solid #64FFFF ",
                }}
              ></div>
            );
          })}
      </div>

      <div className="miningTime">
        <span>Next block complete in:</span>
        <span>{formatTime(time)}</span>
      </div>

      <div className="miningCompleted">
        <div className="squareCompleted">
          <img src={miningLogo} alt="miningLogo" />
         
        </div>
        <div className="completedText">
            <p> {userMiningData?.miningPoints} </p>
          </div>
        <button onClick={handleClaim} disabled={!squares.every(Boolean)}>
          Claim
        </button>
      </div>
      {showSuccess && <Success  />}
    </div>
  );
};
export default MiningProcess;
