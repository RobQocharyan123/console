import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const tg = window.Telegram.WebApp;

    if (tg?.initDataUnsafe?.user) {
      console.log("Telegram User:", tg.initDataUnsafe.user);
    } else {
      console.log(
        "No user info found. Make sure the app is opened via Telegram."
      );
    }
  }, []);

  return <div className="app">Telegram Bot</div>;
}

export default App;
