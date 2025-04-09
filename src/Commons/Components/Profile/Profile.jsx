import "./Profile.css";
import fon from "../../../Assets/fon.png";
import profileDefaultImg from "../../../Assets/Profile/profil-default.svg";
import profileWalletCancelIcon from "../../../Assets/Profile/profile-cancel.svg";
import { useEffect, useState } from "react";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageDataThunk } from "../../../Store/Middlewares/homePageData";
import TonWallet from "./../TonConnect/TonWallet";

const Profile = () => {
  const [arr, setArr] = useState([{ id: "1", title: "52U...1hd.." }]);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [profileImg, setProfileImg] = useState(profileDefaultImg);
  const [showModal, setShowModal] = useState(false);

  const token = useSelector((state) => state?.telegramLogin?.token);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getHomePageDataThunk({ token }));
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImg(imageUrl);
    }
  };

  const handleDelete = () => {
    setArr((prevArr) => prevArr.filter((_, index) => index !== deleteIndex));
    setShowModal(false);
  };

  return (
    <>
      <img src={fon} alt="fon" className="fon" />
      {/* <button onClick={() => document.getElementById("fileInput").click()}>
        Change Photo
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
        id="fileInput"
      /> */}
      <div className="profil">
        <div className="imgAndName">
          <div className="profilImg">
            <img src={profileImg} alt="profileDefaultImg" />
          </div>
          <h2>Jason State </h2>
        </div>

        <div className="profilBalance">
          <p>
            Balance: <span>$CP 800</span>
          </p>
        </div>

        <div className="profilLine"></div>
        <div className="profilWallet">
          <h2>Wallet</h2>

          {Array.isArray(arr) && arr.length > 0 ? (
            arr.map((item, index) => (
              <div className="profilWalletItem" key={index}>
                <p>{item.title}</p>
                <img
                  src={profileWalletCancelIcon}
                  alt="profileWalletCancelIcon"
                  onClick={() => {
                    setShowModal(true);
                    setDeleteIndex(index);
                  }}
                />
              </div>
            ))
          ) : (
            <p>You have no wallet connected.</p>
          )}
        </div>
        <TonWallet text={"TON Connect"} isProfile={true} />
      </div>
      {showModal && (
        <ProfileModal setShowModal={setShowModal} handleDelete={handleDelete} />
      )}
    </>
  );
};
export default Profile;
