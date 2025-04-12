import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginPostUserData } from "./Commons/Services/homePageService.js";
import { useDispatch, useSelector } from "react-redux";
import {
  getHomePageDataThunk,
  loginTelegramBotThunk
} from "./Store/Middlewares/homePageData.js";

// Lazy load components
const Header = lazy(() => import("./Commons/Components/Header/Header"));
const Home = lazy(() => import("./Commons/Components/Home/Home"));
const NavBar = lazy(() => import("./Commons/Components/NavBar/NavBar"));
const Boost = lazy(() => import("./Commons/Components/Boost/Boost"));
const LogoAnimation = lazy(() =>
  import("./Commons/Components/LogoAnimation/LogoAnimation")
);
const Tasks = lazy(() => import("./Commons/Components/Tasks/Tasks"));
const AirDrop = lazy(() => import("./Commons/Components/AirDrop/AirDrop"));
const Profile = lazy(() => import("./Commons/Components/Profile/Profile"));
const Friends = lazy(() => import("./Commons/Components/Friends/Friends"));

function App() {
  const navigate = useNavigate();

  const tg = window.Telegram.WebApp;
  tg.expand();

  const dispatch = useDispatch();
  const homeData = useSelector((state) => state?.homePage?.homeData);

  const isSuccess = useSelector((state) => state?.telegramLogin?.isSuccess);
  const token = useSelector((state) => state?.telegramLogin?.token);
  console.log(homeData);

  useEffect(() => {
    const userData = tg.initDataUnsafe.user;
    if (userData) {
      dispatch(loginTelegramBotThunk(userData));
    }
  }, [dispatch, tg.initDataUnsafe.user]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(getHomePageDataThunk({ token }));
      navigate("/home");
    }
  }, [isSuccess, dispatch]);

  // if (!homeData) {
  //   return <LogoAnimation />;
  // }

  return (
    <div className="app">
      <Suspense fallback={<LogoAnimation />}>
        <Header />
        <Routes>
          {/* <Route path="/" element={<TelegramLogin />} /> */}
          <Route path="/home" element={<Home />}>
            <Route path="boost" element={<Boost />} />
          </Route>
          <Route path="/" element={<LogoAnimation />}></Route>

          {/* Other routes go here */}

          <Route path="/tasks" element={<Tasks />}>
            <Route path="boost" element={<Boost />} />
          </Route>

          <Route path="/airdrop" element={<AirDrop />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/friends" element={<Friends />}></Route>
        </Routes>
        <NavBar />
        <ToastContainer />
      </Suspense>
    </div>
  );
}

export default App;
