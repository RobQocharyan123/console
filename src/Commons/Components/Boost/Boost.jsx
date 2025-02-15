import "./Boost.css";
import { useState } from "react";
import Free from "./subComponents/Free/Free";
import Bot from "./subComponents/Bot/Bot";
import BoostPage from "./subComponents/BoostPage/BoostPage";

const Boost = () => {
  const [page, setPage] = useState("free");



  return (
    <div className="boost">
      <h2>Boost Your CP</h2>

      <nav>
        <ul>
          <li
            className={page === "free" ? "activePage" : ""}
            onClick={() => setPage("free")}
          >
            Free
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

      {page === "free" && <Free />}
      {page === "bot" && <Bot />}
      {page === "bosts" && <BoostPage />}
    </div>
  );
};
export default Boost;
