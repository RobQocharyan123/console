import "./UpgradePopUp.css";
import upgradePopUpLogoIcon from "../../../../../../Assets/Home/Upgrade/upgrade-popup-logo.svg";
import upgradeCancelIcon from "../../../../../../Assets/Home/Upgrade/upgrade-cancel.svg";
import upgradeLogoIcon from "../../../../../../Assets/Home/Upgrade/upgrade-logo.svg";
import upgradeTonIcon from "../../../../../../Assets/Home/Upgrade/upgrade-ton.svg";

const UpgradePopUp = ({ setShow, data }) => {
  return (
    <>
      <div className="upgradeOverlay" onClick={() => setShow(false)}></div>
      <div className="upgradePopUp">
        <img
          src={upgradeCancelIcon}
          alt="upgradeCancelIcon"
          className="upgradeCancel"
          onClick={() => setShow(false)}
        />

        <div className="upgradePopUpText">
          <img src={upgradePopUpLogoIcon} alt="upgradePopUpLogoIcon" />
          <p>Select your preferred option to enhance your rewards</p>
        </div>
        <div className="greenLinePopUp"></div>

        <div className="upgradePopUpFooter">
          <div className="leftClaim">
            <img
              src={upgradeLogoIcon}
              alt="upgradeLogoIcon"
              className="upgradeLogoIcon"
            />
            <p>{data?.native_price}</p>
            <button>Buy</button>
          </div>
          <div className="rightClaim">
            <img
              src={upgradeTonIcon}
              alt="upgradeTonIcon"
              className="upgradeTonIcon"
            />
            <p>{data?.ton_price}</p>
            <button>Buy</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default UpgradePopUp;
