import "./Bot.css";
import modalCancelIcon from "../../../../../Assets/Home/cancel-assistant-icon.svg";
import cristalIcon from "../../../../../Assets/Home/cristal-icon.svg";
import arrowBottom from "../../../../../Assets/Header/arrow-icon.svg";

const BotModal = ({ setShowModal,title,description,price }) => {
  return (
    <>
      <div className="botOverlay" onClick={() => setShowModal(false)}></div>
      <div className="botModal">
        <div className="modalText">
          <div className="modalTextIntro">
            <h2>{title}</h2>
            <p>
             {description}
            </p>
          </div>
          <img src={modalCancelIcon} alt="modalCancelIcon" onClick={()=>setShowModal(false)} />
        </div>

        <div className="modalToken">
          <h2>Token</h2>
          <div className="selectToken">
            <div className="textAndImg">
              <img src={cristalIcon} alt="cristalIcon" />
              <p>{price}</p>
            </div>
          </div>
        </div>

        <button>Buy</button>
      </div>
    </>
  );
};
export default BotModal;
