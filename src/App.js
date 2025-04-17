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
  const dispatch = useDispatch();

  const homeData = useSelector((state) => state?.homePage?.homeData);
  const isSuccess = useSelector((state) => state?.telegramLogin?.isSuccess);
  const token = useSelector((state) => state?.telegramLogin?.token);

  const tg = window.Telegram.WebApp;

  useEffect(() => {
    // Check if running in Telegram
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.expand();

      // Try both initData and initDataUnsafe
      console.log('Full initData:', tg.initData);
      console.log('initDataUnsafe:', tg.initDataUnsafe);

      const user = tg.initDataUnsafe?.user;
      console.log(user, 'userik');

      if (user) {
        dispatch(loginTelegramBotThunk(user));
      } else {
        console.warn(
          'No user data available - make sure the bot is properly configured'
        );
      }
    } else {
      console.warn('Not running in Telegram WebApp environment');
      // You might want to add mock data for development here
    }
  }, [dispatch]);

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
    if (tg) {
      // 1. Telegram WebApp Configuration
      tg.expand();
      tg.disablePullToClose(); // Disables swipe-down-to-minimize

      // 2. Make the app appear non-dismissable
      tg.MainButton.show(); // Helps prevent closing
      tg.BackButton.hide(); // Remove exit points
      tg.setHeaderColor('#02040F'); // Match your theme
    }

    // 3. DOM Touch Event Blocking
    const mainScroll = document.querySelector('.main-scroll');
    if (!mainScroll) return;

    let startY = 0;
    let isBlocking = false;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
      isBlocking =
        mainScroll.scrollTop === 0 ||
        mainScroll.scrollHeight - mainScroll.scrollTop <=
          mainScroll.clientHeight + 1;
    };

    const handleTouchMove = (e) => {
      if (!isBlocking) return;

      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;

      // Block overscroll in both directions
      if (
        (deltaY > 0 && mainScroll.scrollTop === 0) ||
        (deltaY < 0 &&
          mainScroll.scrollHeight - mainScroll.scrollTop <=
            mainScroll.clientHeight + 1)
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    mainScroll.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    });
    mainScroll.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });

    return () => {
      mainScroll.removeEventListener('touchstart', handleTouchStart);
      mainScroll.removeEventListener('touchmove', handleTouchMove);
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
