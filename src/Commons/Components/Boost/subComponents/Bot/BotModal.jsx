import "./Bot.css";
import modalCancelIcon from "../../../../../Assets/Home/cancel-assistant-icon.svg";
import cristalIcon from "../../../../../Assets/Home/cristal-icon.svg";

const BotModal = ({ setShowModal, data }) => {
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return hours > 0
      ? `${hours} hour${hours > 1 ? "s" : ""} ${remainingMinutes} minute${
          remainingMinutes > 1 ? "s" : ""
        }`.trim()
      : `${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`;
  };
  return (
    <>
      <div className="botOverlay" onClick={() => setShowModal(false)}></div>
      <div className="botModal">
        <div className="modalText">
          <div className="modalTextIntro">
            <h2>Block Boost</h2>
            <p>
              Farming Booster: X{data?.speed} for {formatTime(data?.duration)}{" "}
            </p>
          </div>
          <img
            src={modalCancelIcon}
            alt="modalCancelIcon"
            onClick={() => setShowModal(false)}
          />
        </div>

        <div className="modalToken">
          <h2>Token</h2>
          <div className="selectToken">
            <div className="textAndImg">
              <img src={cristalIcon} alt="cristalIcon" />
              <p>{data?.ton_price}</p>
            </div>
          </div>
        </div>

        <button>Buy</button>
      </div>
    </>
  );
};
export default BotModal;
