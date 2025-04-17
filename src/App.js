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

  const dispatch = useDispatch();
  const homeData = useSelector((state) => state?.homePage?.homeData);

  const isSuccess = useSelector((state) => state?.telegramLogin?.isSuccess);
  const token = useSelector((state) => state?.telegramLogin?.token);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    const userData = tg?.initDataUnsafe?.user || {
      id: "1802368420",
      first_name: "",
      last_name: "Poghosyan",
      username: "Poghos_kkk",
      language_code: "en",
      photo_url:
        "https://t.me/i/userpic/320/R6kP81fplPdhuT-LUfFQPEUXqqKPrvaTLmqSgpUeMfc.jpg",
      hash: "a2ab797fbc1d209a618725edb826dc0736dee5d2a120bcdd7ae6b7d88415ab18"
    };

    const hash =
      tg?.initDataUnsafe?.hash ||
      "a2ab797fbc1d209a618725edb826dc0736dee5d2a120bcdd7ae6b7d88415ab18";

    if (userData) {
      const fullUserData = { ...userData, hash };
      dispatch(loginTelegramBotThunk(fullUserData));
      console.log("✅ Telegram User Info with hash:", fullUserData);
    } else {
      console.warn(
        "⚠️ User or hash not available. Make sure it's opened via Telegram."
      );
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(getHomePageDataThunk({ token }));
      navigate("/home");
    }
  }, [isSuccess, dispatch]);

  // Conditionally render content (for example, loading logo animation if data is not loaded)
  // if (!homeData) {
  //   return <LogoAnimation />;
  // }

  return (
    <div className="app">
      <Suspense fallback={<LogoAnimation />}>
        <Header />
        <div className="main-scroll">
          {/* 👈 Scrollable wrapper */}
          <Routes>
            <Route path="/home" element={<Home />}>
              <Route path="boost" element={<Boost />} />
            </Route>
            <Route path="/tasks" element={<Tasks />}>
              <Route path="boost" element={<Boost />} />
            </Route>
            <Route path="/airdrop" element={<AirDrop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/friends" element={<Friends />} />
          </Routes>
        </div>
        <NavBar />
        <ToastContainer />
      </Suspense>
    </div>
  );
}

export default App;
