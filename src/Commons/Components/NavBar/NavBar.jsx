import "./NavBar.css";
import airDropIcon from "../../../Assets/NavBar/airdrop-icon.svg";
import friendsIcon from "../../../Assets/NavBar/friends-icon.svg";
import homeIcon from "../../../Assets/NavBar/home-icon.svg";
import profileIcon from "../../../Assets/NavBar/profile-icon.svg";
import tasksIcon from "../../../Assets/NavBar/tasks-icon.svg";
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const changeRoute = (path) => {
    switch (path) {
      case "home": {
        navigate("/home");
        break;
      }
      case "tasks": {
        navigate("/tasks");
        break;
      }
      case "friends": {
        navigate("/friends");
        break;
      }
      case "airdrop": {
        navigate("/airdrop");
        break;
      }
      case "profile": {
        navigate("/profile");
        break;
      }
      default: {
        navigate("/");
      }
    }
  };

  const isActive = (path) => {
    if (path === "home") {
      // Home button should be active for "/home" and its sub-routes (like "/home/boost")
      return location.pathname.startsWith("/home");
    }
    // For other routes, continue using the original logic
    return location.pathname.includes(path);
  };
  return (
    <div className="navBar">
      <div
        onClick={() => changeRoute("home")}
        className={isActive("home") ? "active" : ""}
      >
        <img src={homeIcon} alt="homeIcon" />
        <p>Home</p>
      </div>

      <div
        onClick={() => changeRoute("tasks")}
        className={isActive("tasks") ? "active" : ""}
      >
        <img src={tasksIcon} alt="tasksIcon" />
        <p>Tasks</p>
      </div>
      <div
        onClick={() => changeRoute("friends")}
        className={isActive("friends") ? "active" : ""}
      >
        <img src={friendsIcon} alt="friendsIcon" />
        <p x>Friends</p>
      </div>
      <div
        onClick={() => changeRoute("airdrop")}
        className={isActive("airdrop") ? "active" : ""}
      >
        <img src={airDropIcon} alt="airDropIcon" />
        <p>Airdrop</p>
      </div>
      <div
        onClick={() => changeRoute("profile")}
        className={isActive("profile") ? "active" : ""}
      >
        <img src={profileIcon} alt="profileIcon" />
        <p>Profile</p>
      </div>
    </div>
  );
};
export default NavBar;
