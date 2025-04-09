import "./UpgradePopUp.css";
import upgradePopUpLogoIcon from "../../../../../../Assets/Home/Upgrade/upgrade-popup-logo.svg";
import upgradeCancelIcon from "../../../../../../Assets/Home/Upgrade/upgrade-cancel.svg";
import upgradeLogoIcon from "../../../../../../Assets/Home/Upgrade/upgrade-logo.svg";
import upgradeTonIcon from "../../../../../../Assets/Home/Upgrade/upgrade-ton.svg";
import { useDispatch, useSelector } from "react-redux";
import { upgradeBuyThunk } from "../../../../../../Store/Middlewares/upgradeServiceBuy";
// import TonWeb from "tonweb";
import { upgradeServicePost } from "./../../../../../Services/upgradeService";
import { setUpdateUbgradeData } from "../../../../../../Store/Slices/homePageSlice";
import TonWallet from "./../../../../TonConnect/TonWallet";

// const tonweb = new TonWeb();
// new TonWeb.providers.HttpProvider("https://toncenter.com/api/v2/jsonRPC")

const UpgradePopUp = ({ setShow, data }) => {
  const disptach = useDispatch();
  const token = useSelector((state) => state?.telegramLogin?.token);

  const handleClickeBuyNative = async () => {
    const obj = {
      id: data?.id,
      type: "native"
    };
    const response = await upgradeServicePost({ obj, token });
    disptach(setUpdateUbgradeData(response?.data));
    setShow(false);
  };

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
            <button disabled={data?.is_active} onClick={handleClickeBuyNative}>
              Buy
            </button>
          </div>
          <div className="rightClaim">
            <img
              src={upgradeTonIcon}
              alt="upgradeTonIcon"
              className="upgradeTonIcon"
            />
            <p>{data?.ton_price}</p>
            {/* <button>Buy</button> */}
            <TonWallet text={"buy"} />
          </div>
        </div>
      </div>
    </>
  );
};
export default UpgradePopUp;
