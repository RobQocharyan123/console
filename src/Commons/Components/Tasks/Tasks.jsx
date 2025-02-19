import "./Tasks.css";
import fon from "../../../Assets/fon.png";
import { useState } from "react";
import New from "./New/New";
import Completed from "./Completed/Completed";

const Tasks = () => {
  const [page, setPage] = useState("new");

  return (
    <>
      <img src={fon} alt="fon" className="fon" />
      <div className="task">
        <h2>Tasks</h2>

        <nav>
          <ul>
            <li
              className={page === "new" ? "activePage" : ""}
              onClick={() => setPage("new")}
            >
              New
            </li>
            <li
              className={page === "completed" ? "activePage" : ""}
              onClick={() => setPage("completed")}
            >
              Completed
            </li>
          </ul>
        </nav>

        {page === "new" && <New />}
        {page === "completed" && <Completed />}
      </div>
    </>
  );
};
export default Tasks;
