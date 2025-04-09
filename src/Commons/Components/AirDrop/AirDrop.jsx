import "./AirDrop.css";
import fon from "../../../Assets/fon.png";
import airdropImg from "../../../Assets/airdrop/airdrop.png";
import { useEffect, useState } from "react";
import LogoAnimation from "./../LogoAnimation/LogoAnimation";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageDataThunk } from "../../../Store/Middlewares/homePageData";

const AirDrop = () => {
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state?.telegramLogin?.token);

  const dispatch = useDispatch();

  const handleImageLoad = () => {
    setLoading(true);
  };

  useEffect(() => {
    if (token) {
      dispatch(getHomePageDataThunk({ token }));
    }
  }, []);
  return (
    <>
      <img src={fon} alt="fon" className="fon" />
      <div className="airdrop">
        <div className="airdropInfo">
          <p>WELCOME TO</p>
          <h2>$CONS AIRDROP</h2>
          <div className="airdropPadding">
            <div className="airdropStayText">STAY TUNED</div>
          </div>
        </div>
        {!loading && <LogoAnimation />}
        <img
          src={airdropImg}
          alt="airdropImg"
          className={`airdropImg ${loading ? "loaded" : ""}`}
          onLoad={handleImageLoad}
        />
      </div>
      ;
    </>
  );
};
export default AirDrop;
