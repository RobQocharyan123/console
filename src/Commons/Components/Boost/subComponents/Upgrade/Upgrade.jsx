import "./Upgrade.css";
import upgrade1 from "../../../../../Assets/Home/Upgrade/upgrade-1.svg";
import upgradeLogoIcon from "../../../../../Assets/Home/Upgrade/upgrade-logo.svg";
import upgradeTonIcon from "../../../../../Assets/Home/Upgrade/upgrade-ton.svg";
import upgradeSuccessIcon from "../../../../../Assets/Home/Upgrade/upgrade-success.svg";
import { useState } from "react";
import UpgradePopUp from "./UpgradePopUp/UpgradePopUp";

const Upgrade = ({ data }) => {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOPenPopUp = (item) => {
    setShow(true);
    setSelectedItem(item);
  };

  return (
    <div className="upgrade">
      <div className="upgradeText">
        <img src={upgradeSuccessIcon} alt="upgradeSuccessIcon" />
        <p>Upgrading these blocks will apply the selected option permanently</p>
      </div>
      {Array.isArray(data) &&
        data.map((i, index) => {
          return (
            <>
              <div
                key={i.id}
                className={`freeItem ${i.border ? "border" : ""}`}
              >
                <div className="upgradeBonus">
                  <img src={upgrade1} alt="bonus" />
                  {i?.speed > 1 && <h3>X {i?.speed}</h3>}
                </div>
                <div className="freeItemText">
                  <h2>Block Upgrade</h2>
                  <p>For each block, you will receive {i.point} points.</p>
                </div>

                <div className="buy">
                  <div className="upgradeIcons">
                    <img src={upgradeLogoIcon} alt="logo" />
                    <img src={upgradeTonIcon} alt="Ton" />
                  </div>
                  <button onClick={() => handleOPenPopUp(i)}>Buy</button>
                </div>
              </div>
              {index < data.length - 1 && <div className="greenLine"></div>}
            </>
          );
        })}
      {show && <UpgradePopUp setShow={setShow} data={selectedItem} />}
    </div>
  );
};
export default Upgrade;
