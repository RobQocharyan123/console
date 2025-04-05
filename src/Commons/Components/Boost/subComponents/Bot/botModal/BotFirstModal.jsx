import "./BotFirstModal.css";
import modalCancelIcon from "../../../../../../Assets/Home/cancel-assistant-icon.svg";
import cristalIcon from "../../../../../../Assets/Home/cristal-icon.svg";

const BotFirstModal = ({ setShowModal, title, description, price }) => {
  return (
    <>
      <div
        className="botOverlayFirst"
        onClick={() => setShowModal(false)}
      ></div>
      <div className="botModalFirst">
        <img
          src={modalCancelIcon}
          alt="modalCancelIcon"
          onClick={() => setShowModal(false)}
          className="cancelBot"
        />
        <div className="modalTextFirst">
          <div className="modalTextIntro">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
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
export default BotFirstModal;
