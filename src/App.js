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

  const tg = window.Telegram?.WebApp;

  useEffect(() => {
    if (tg) {
      tg.ready();
      const user = tg.initDataUnsafe?.user;
      if (user) {
        console.log('User Info:', user);

        // Replace with your Telegram bot token
        const botToken = '8061156654:AAGeTofj4seD_wKt1tgYg8LSfSoIJH6sFwg';
        const userId = user.id;

        // Telegram API URL to send the message
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        // Message content
        const messageData = {
          chat_id: userId,
          text: 'Welcome to the app!',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Open App',
                  web_app: {
                    url: 'https://your-app-url.vercel.app', // Replace with your actual app URL
                  },
                },
              ],
            ],
          },
        };

        // Send the message to the user
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(messageData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Telegram API Response:', data);
          })
          .catch((error) => {
            console.error('Error sending message:', error);
          });
      }
    }
  }, []);

  useEffect(() => {
    if (isSuccess && token) {
      dispatch(getHomePageDataThunk({ token }));
      navigate('/home', { replace: true });
    }
  }, [isSuccess, token, dispatch, navigate]);

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
