import './App.css';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
      console.warn('❌ Not running inside Telegram WebApp.');
      return;
    }

    tg.ready();
    tg.expand();
    tg.enableClosingConfirmation?.();
    tg.MainButton?.hide?.();
    tg.BackButton?.hide?.();

    const user = tg.initDataUnsafe?.user;

    if (user) {
      console.log('✅ Telegram WebApp User Info:', user);

      // Optional: show individual fields
      console.log('User ID:', user.id);
      console.log('First Name:', user.first_name);
      console.log('Username:', user.username);
      console.log('Language Code:', user.language_code);

      dispatch(loginTelegramBotThunk(user));
    } else {
      console.error('❌ No user data found. Maybe opened outside Telegram?');
    }

    return () => {
      tg.offEvent?.('viewportChanged');
      tg.offEvent?.('themeChanged');
    };
  }, []);

  useEffect(() => {
    if (isSuccess && token) {
      dispatch(getHomePageDataThunk({ token }));
      navigate('/home', { replace: true });
    }
  }, [isSuccess, token, dispatch, navigate]);

  // if (!homeData) {
  //   return (
  //     <Suspense fallback={null}>
  //       <LogoAnimation />
  //     </Suspense>
  //   );
  // }

  return (
    <div className="app">
      <Suspense fallback={<LogoAnimation />}>
        <Header />
        <div className="main-scroll">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />}>
              <Route path="boost" element={<Boost />} />
            </Route>
            <Route path="/tasks" element={<Tasks />}>
              <Route path="boost" element={<Boost />} />
            </Route>
            <Route path="/airdrop" element={<AirDrop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
        <NavBar />
        <ToastContainer />
      </Suspense>
    </div>
  );
}

export default App;
