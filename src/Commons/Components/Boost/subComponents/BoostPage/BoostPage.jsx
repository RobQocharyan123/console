import "./BoostPage.css";
import boostRocketIcon from "../../../../../Assets/Home/boost-roket-icon.svg";
import boostSuccessIcon from "../../../../../Assets/Home/boost-success-icon.svg";
import boostCristalIcon from "../../../../../Assets/Home/cristal-icon.svg";
import BotModal from "./../Bot/BotModal";
import { useEffect, useState } from "react";
import Success from "./../../../Success/Success";
import { getHomePageDataThunk } from "../../../../../Store/Middlewares/homePageData";
import { useDispatch, useSelector } from "react-redux";

const BoostPage = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const token = useSelector((state) => state?.telegramLogin?.token);
  const dispatch = useDispatch();
  const showSuccess = useSelector((state) => state?.homePage?.showSuccess);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return hours > 0
      ? `${hours} hour${hours > 1 ? "s" : ""} ${remainingMinutes} minute${
          remainingMinutes > 1 ? "s" : ""
        }`.trim()
      : `${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`;
  };

  const handleOPenPopUp = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="boostPage">
      <div className="boostPageSuccess">
        <img src={boostSuccessIcon} alt="boostSuccessIcon" />
        <div className="boostTexts">
          <p>Boost your CP farming with a powerful booster!</p>
          <p>
            You can use only one booster at a time. While one is active, others
            will be disabled.
          </p>
        </div>
      </div>

      <div className="boostPageContent">
        {Array.isArray(data) &&
          data.map((item) => (
            <>
              <div className="boostItem" key={item.id}>
                <img
                  src={boostRocketIcon}
                  alt={boostRocketIcon}
                  className="rocket"
                />

                {item.speed > 1 && (
                  <div className="boostDoubling">X {item.speed}</div>
                )}
                <div className="boostItemText">
                  <h2> Block Boost</h2>
                  <p>Farming Booster: </p>
                  <p>
                    X{item.speed} for {formatTime(item?.duration)}{" "}
                  </p>
                </div>

                <div className="boostPrice">
                  <div>
                    <img src={boostCristalIcon} alt="boostCristalIcon" />
                    <p>{item?.ton_price}</p>
                  </div>
                  <button
                    onClick={() => handleOPenPopUp(item)}
                    disabled={item?.is_active}
                  >
                    {item?.is_free ? "Free" : "Buy"}
                  </button>
                </div>
              </div>
              {showSuccess && <Success data={selectedItem} />}
            </>
          ))}
      </div>
    </div>
  );
};

export default BoostPage;
