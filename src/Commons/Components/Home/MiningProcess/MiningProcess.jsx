import "./MiningProcess.css";
import miningLogo from "../../../../Assets/Home/home-logo.svg";
import { useEffect, useState } from "react";

const MiningProcess = () => {
  const [time, setTime] = useState(new Date());

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

  return (
    <div className="mining">
      <p className="miningText">Mining Process</p>
      <div className="squares"></div>
      <div className="miningTime">
        <span>Next block complete in:</span>
        <span>{formatTime(time)}</span>
      </div>

      <div className="miningCompleted">
        <div className="completed">
          <img src={miningLogo} alt="miningLogo" />
          <div className="completedText">
            <p>Completed</p>
            <p>Blocks: 5/8</p>
          </div>
        </div>
        <button>Claim</button>
      </div>
    </div>
  );
};
export default MiningProcess;
