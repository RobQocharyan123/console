import "./Bot.css";
import assistanIcon from "../../../../../Assets/Home/assistant-icon.svg";
import { useState } from 'react';
import BotModal from './BotModal';
const Bot = () => {
  const[showModal,setShowModal] = useState(false);


  return (
    <>
      <div className="bot">
        <div className="assistant">
          <div className="assistantIcon">
            <img src={assistanIcon} alt="assistanIcon" />
          </div>
          <div className="assistantText">
            <h2>Assistant</h2>
            <p>
              Your personal assistant will automatically start farming and
              claiming rewards{" "}
            </p>
          </div>
        </div>
        <button onClick={()=>setShowModal(true)}>Buy</button>
      </div>

      {showModal && <BotModal setShowModal={setShowModal} title={"Assistant"} description={"Your personal assistant will automatically start farming and claiming rewards"} price={"1 TON"} />}
    </>
  );
};
export default Bot;
