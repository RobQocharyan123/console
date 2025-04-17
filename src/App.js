import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      if (user) {
        console.log("Telegram User:", user);
      } else {
        console.log("No user data available.");
      }
    } else {
      console.warn(
        "Telegram WebApp API not available. Are you outside Telegram?"
      );
    }
  }, []);

  return <div className="app">Telegram Bot</div>;
}

export default App;
