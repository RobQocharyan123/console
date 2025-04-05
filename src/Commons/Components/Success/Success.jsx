import { useDispatch, useSelector } from "react-redux";
import "./Success.css";
import { setCloseSuccess } from "../../../Store/Slices/homePageSlice";
import { useEffect } from "react";
import { getHomePageDataThunk } from "../../../Store/Middlewares/homePageData";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const showSuccess = useSelector((state) => state?.homePage?.showSuccess);
  const dispatch = useDispatch();

  const isSuccess = useSelector((state) => state?.telegramLogin?.isSuccess);
  const token = useSelector((state) => state?.telegramLogin?.token);

  const navigate = useNavigate();

  const onCancelSuccess = () => {
    dispatch(setCloseSuccess());
    dispatch(getHomePageDataThunk({ token }));
    // navigate("/home");
  };

  return (
    <>
      <div className="successOverlay" onClick={onCancelSuccess}></div>
      <div className="success">
        <h2>Success</h2>
        <p>
          You have approved claim. {showSuccess?.dailyClaimPoint || showSuccess}
        </p>
        <button onClick={onCancelSuccess}>OK</button>
      </div>
    </>
  );
};
export default Success;
