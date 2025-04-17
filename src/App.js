import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginPostUserData } from './Commons/Services/homePageService.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  getHomePageDataThunk,
  loginTelegramBotThunk,
} from './Store/Middlewares/homePageData.js';

// Lazy load components
const Header = lazy(() => import('./Commons/Components/Header/Header'));
const Home = lazy(() => import('./Commons/Components/Home/Home'));
const NavBar = lazy(() => import('./Commons/Components/NavBar/NavBar'));
const Boost = lazy(() => import('./Commons/Components/Boost/Boost'));
const LogoAnimation = lazy(() =>
  import('./Commons/Components/LogoAnimation/LogoAnimation')
);
const Tasks = lazy(() => import('./Commons/Components/Tasks/Tasks'));
const AirDrop = lazy(() => import('./Commons/Components/AirDrop/AirDrop'));
const Profile = lazy(() => import('./Commons/Components/Profile/Profile'));
const Friends = lazy(() => import('./Commons/Components/Friends/Friends'));

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
      navigate('/home');
    }
  }, [isSuccess, dispatch]);

  // if (!homeData) {
  //   return <LogoAnimation />;
  // }

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.expand();
    tg.enableClosingConfirmation(); // This will show a confirmation before closing
    // OR
    tg.MainButton.show(); // Showing the main button also prevents pull-to-close

    // Alternatively, you can completely disable the pull-to-close behavior:
    tg.setHeaderColor('#02040f'); // Set your app's background color
    tg.backgroundColor = '#02040f'; // Set your app's background color
    tg.isClosingConfirmationEnabled = true;

    // This is the most direct way to prevent pull-to-close:
    if (tg.platform !== 'unknown') {
      // Check if running in Telegram
      tg.disablePullToClose();
    }
  }, []);
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
