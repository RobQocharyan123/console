import "./Boost.css";
import { useEffect, useState } from "react";
import Upgrade from "./subComponents/Upgrade/Upgrade";
import Bot from "./subComponents/Bot/Bot";
import BoostPage from "./subComponents/BoostPage/BoostPage";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageDataThunk } from "../../../Store/Middlewares/homePageData";

const Boost = () => {
  const [page, setPage] = useState("upgrade");
  const homeData = useSelector((state) => state?.homePage?.homeData);
  const boostData = useSelector((state) => state?.boosts?.boostData);
  const token = useSelector((state) => state?.telegramLogin?.token);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (token) {
  //     dispatch(getHomePageDataThunk({ token }));
  //   }
  // }, []);

  return (
    <div className="boost">
      <h2>Boost Your CP</h2>

      <nav>
        <ul>
          <li
            className={page === "upgrade" ? "activePage" : ""}
            onClick={() => setPage("upgrade")}
          >
            Upgrade
          </li>
          <li
            className={page === "bot" ? "activePage" : ""}
            onClick={() => setPage("bot")}
          >
            Bot
          </li>
          <li
            className={page === "bosts" ? "activePage" : ""}
            onClick={() => setPage("bosts")}
          >
            Boosts
          </li>
        </ul>
      </nav>

      {page === "upgrade" && <Upgrade data={homeData?.booster?.upgrades} />}
      {page === "bot" && <Bot data={homeData?.booster?.bot} />}
      {page === "bosts" && <BoostPage data={homeData?.booster?.boosts} />}
    </div>
  );
};
export default Boost;
