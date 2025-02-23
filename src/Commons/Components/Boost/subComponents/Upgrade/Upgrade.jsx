import "./Upgrade.css";
import upgrade1 from "../../../../../Assets/Home/Upgrade/upgrade-1.svg";
import upgradeLogoIcon from "../../../../../Assets/Home/Upgrade/upgrade-logo.svg";
import upgradeTonIcon from "../../../../../Assets/Home/Upgrade/upgrade-ton.svg";
import upgradeSuccessIcon from "../../../../../Assets/Home/Upgrade/upgrade-success.svg";
import { useState } from "react";
import UpgradePopUp from "./UpgradePopUp/UpgradePopUp";

const arr = [
  {
    id: "1",
    title: "Block Upgrade",
    text: "For each block, you will  receive 225 points.",
    logo: upgradeLogoIcon,
    ton: upgradeTonIcon,
    bonus: upgrade1,
    border: false
  },
  {
    id: "2",
    title: "Block Upgrade",
    text: "For each block, you will  receive 450 points.",
    logo: upgradeLogoIcon,
    ton: upgradeTonIcon,
    bonus: upgrade1,
    border: true
  }
];

const Upgrade = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="upgrade">
      <div className="upgradeText">
        <img src={upgradeSuccessIcon} alt="upgradeSuccessIcon" />
        <p>Upgrading these blocks will apply the selected option permanently</p>
      </div>
      {arr.map((i, index) => {
        return (
          <>
            <div key={index} className={`freeItem ${i.border ? "border" : ""}`}>
              <img src={i.bonus} alt="bonus" />
              <div className="freeItemText">
                <h2>{i.title}</h2>
                <p>{i.text}</p>
              </div>

              <div className="buy">
                <div className="upgradeIcons">
                  <img src={i.logo} alt="logo" />
                  <img src={i.ton} alt="Ton" />
                </div>
                <button onClick={() => setShow(true)}>Buy</button>
              </div>
            </div>
            {index < arr.length - 1 && <div className="greenLine"></div>}
            {show && <UpgradePopUp setShow={setShow} />}
          </>
        );
      })}
    </div>
  );
};
export default Upgrade;
