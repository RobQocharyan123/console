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
  console.log(tg, 'this is tg');

  useEffect(() => {
    const userData = tg.initDataUnsafe.user;
    console.log(userData, 'this is a userDatassssssss ');

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
    const tg = window.Telegram?.WebApp;
    if (!tg) return; // Skip if not in Telegram

    // 1. Telegram API settings to discourage closing
    tg.expand();
    tg.disablePullToClose?.(); // Blocks swipe-down-to-close
    tg.BackButton.hide(); // Hides the back button (optional)
    tg.MainButton.show(); // Showing MainButton helps prevent closing

    // 2. Aggressive touch event blocking
    const mainScroll = document.querySelector('.main-scroll');
    let startY = 0;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const currentY = e.touches[0].clientY;
      const isPullingDown = currentY > startY;
      const isPullingUp = currentY < startY;

      // Block ALL edge-scroll behaviors that could minimize
      if (isPullingDown || isPullingUp) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    mainScroll?.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    });
    mainScroll?.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });

    return () => {
      mainScroll?.removeEventListener('touchstart', handleTouchStart);
      mainScroll?.removeEventListener('touchmove', handleTouchMove);
    };
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
