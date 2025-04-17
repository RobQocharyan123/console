import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    const user = tg?.initDataUnsafe?.user;

    if (user) {
      console.log("✅ Telegram User Info:", user); // Will log the user info here
    } else {
      console.warn("⚠️ User not available. Open inside Telegram WebApp.");
    }
  }, []);

  return <div className="app">Telegram Boto</div>;
}

export default App;
