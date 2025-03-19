import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { telegramLoginThunk } from "../../Store/Middlewares/telegramLoginMIdleware";

const TelegramLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess, error, userData } = useSelector(
    (state) => state?.telegramLogin
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.async = true;
    script.onload = () => {
      console.log("Telegram Login Button Script Loaded");
    };
    document.body.appendChild(script);
    debugger;
  }, []);

  const handleTelegramLogin = async (authData) => {
    try {
      const action = await dispatch(telegramLoginThunk(authData));

      if (action.type === "user/telegramLogin/fulfilled") {
        navigate("/home");
      } else {
        alert("Authentication failed");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <h2>Login with Telegram</h2>

      {isLoading && <p>Loading...</p>}

      {isSuccess && <p>Login successful! Welcome, {userData?.first_name}</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        className="telegram-button"
        data-telegram-login="YOUR_BOT_USERNAME"
        data-size="large"
        data-radius="10"
        data-request-access="write"
        data-on-login={handleTelegramLogin}
      ></div>
    </div>
  );
};

export default TelegramLogin;
