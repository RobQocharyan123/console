import "./MiningProcess.css";
import miningLogo from "../../../../Assets/Home/home-logo.svg";
import { useEffect, useState } from "react";
import Success from "./../../Success/Success";

const MiningProcess = () => {
  // squars

  const [squares, setSquares] = useState(Array(8).fill(false));
  const [timer, setTimer] = useState(0);

  const [time, setTime] = useState(new Date());
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

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
      setCancel(true);
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
          <div className="completedText">
            <p>Completed</p>
            <p>Blocks: {completedCount} /8</p>
          </div>
        </div>
        <button onClick={handleClaim} disabled={!squares.every(Boolean)}>
          Claim
        </button>
      </div>
      {cancel && <Success setCancel={setCancel} />}
    </div>
  );
};
export default MiningProcess;
