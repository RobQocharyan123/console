import { useDispatch } from "react-redux";
import "./Success.css";
import { setCloseSuccess } from "../../../Store/Slices/homePageSlice";

const Success = () => {

  const dispatch = useDispatch()

  const onCancelSuccess = ()=>{
    dispatch(setCloseSuccess())
  }
  return (
    <>
      <div className="successOverlay" onClick={onCancelSuccess}></div>
      <div className="success">
        <h2>Success</h2>
        <p>You have approved claim.</p>
        <button onClick={onCancelSuccess}>OK</button>
      </div>
    </>
  );
};
export default Success;
