import "./Success.css";

const Success = ({ setCancel }) => {
  return (
    <>
      <div className="successOverlay" onClick={() => setCancel(false)}></div>
      <div className="success">
        <h2>Success</h2>
        <p>You have approved claim.</p>
        <button onClick={() => setCancel(false)}>OK</button>
      </div>
    </>
  );
};
export default Success;
