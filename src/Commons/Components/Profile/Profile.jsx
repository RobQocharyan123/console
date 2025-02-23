import "./Profile.css";
import fon from "../../../Assets/fon.png";
import profileDefaultImg from "../../../Assets/Profile/profil-default.svg";
import profileWalletCancelIcon from "../../../Assets/Profile/profile-cancel.svg";
import { useState } from "react";
import ProfileModal from "./ProfileModal";

const Profile = () => {
  const [arr, setArr] = useState([{ id: "1", title: "52U...1hd.." }]);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [profileImg, setProfileImg] = useState(profileDefaultImg);
  const [showModal, setShowModal] = useState(false);

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

        <button>TON Connect</button>
      </div>
      {showModal && (
        <ProfileModal setShowModal={setShowModal} handleDelete={handleDelete} />
      )}
    </>
  );
};
export default Profile;
