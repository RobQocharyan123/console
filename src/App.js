import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
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
    const mainScroll = document.querySelector('.main-scroll');

    const preventPullDown = (e) => {
      // If scrolled to the top and user swipes down
      if (mainScroll.scrollTop === 0 && e.touches[0].clientY > 5) {
        e.preventDefault();
      }
    };

    mainScroll?.addEventListener('touchmove', preventPullDown, {
      passive: false,
    });

    return () => {
      mainScroll?.removeEventListener('touchmove', preventPullDown);
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
