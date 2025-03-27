import "./Bot.css";
import modalCancelIcon from "../../../../../Assets/Home/cancel-assistant-icon.svg";
import cristalIcon from "../../../../../Assets/Home/cristal-icon.svg";
import assistanIcon from "../../../../../Assets/Home/assistant-icon.svg";
import botLogoIcon from "../../../../../Assets/bot/bot-logo-icon.svg";

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
        <img
          src={modalCancelIcon}
          alt="modalCancelIcon"
          onClick={() => setShowModal(false)}
          className="cancelBotModal"
        />
        <div className="modalText">
          <div className="modalIconBlock">
            <img src={assistanIcon} alt={assistanIcon} />
          </div>
          <h2>Worked for you</h2>
        </div>

        <div className="botLogoPoint">
          <img src={botLogoIcon} alt={botLogoIcon} />
          <p>2525252525</p>
        </div>

        <button>Claim</button>
      </div>
    </>
  );
};
export default BotModal;
