import "./Profile.css";
import fon from "../../../Assets/fon.png";
import profileDefaultImg from "../../../Assets/Profile/profil-default.svg";
import profileWalletCancelIcon from "../../../Assets/Profile/profile-cancel.svg";
import { useEffect, useState } from "react";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageDataThunk } from "../../../Store/Middlewares/homePageData";
import {
  useTonAddress,
  useTonConnectUI,
  useTonWallet
} from "@tonconnect/ui-react";

const Profile = () => {
  const [profileImg, setProfileImg] = useState(profileDefaultImg);
  const [showModal, setShowModal] = useState(false);
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const rawAddress = useTonAddress();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.telegramLogin?.token);

  useEffect(() => {
    if (token) {
      dispatch(getHomePageDataThunk({ token }));
    }
  }, [token, dispatch]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImg(imageUrl);
    }
  };

  const getShortAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const handleDisconnect = async () => {
    try {
      await tonConnectUI.disconnect();
      console.log("Wallet disconnected successfully");
    } catch (err) {
      console.error("Error disconnecting wallet:", err);
    } finally {
      setShowModal(false);
    }
  };

  // Debugging wallet connection
  useEffect(() => {
    console.log("Wallet connection status:", {
      connected: !!wallet,
      address: rawAddress,
      walletInfo: wallet
    });
  }, [wallet, rawAddress]);

  return (
    <>
      <img src={fon} alt="fon" className="fon" />

      <div className="profil">
        <div className="imgAndName">
          <div className="profilImg">
            <img src={profileImg} alt="profile" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="profileImageInput"
            />
            <label
              htmlFor="profileImageInput"
              className="profileImageEditLabel"
            >
              Edit
            </label>
          </div>
          <h2>Jason State</h2>
        </div>

        <div className="profilBalance">
          <p>
            Balance: <span>$CP 800</span>
          </p>
        </div>

        <div className="profilLine"></div>

        <div className="profilWallet">
          <h2>Wallet</h2>
          {rawAddress ? (
            <div className="profilWalletItem">
              <p>{getShortAddress(rawAddress)}</p>
              <img
                src={profileWalletCancelIcon}
                alt="Disconnect wallet"
                onClick={() => setShowModal(true)}
                style={{ cursor: "pointer" }}
              />
            </div>
          ) : (
            <p className="noWalletText">You have no wallet connected.</p>
          )}
        </div>

        <button
          className="tonButton"
          disabled={!!rawAddress}
          onClick={() => tonConnectUI.openModal()}
        >
          {rawAddress ? "Connected" : "Connect TON Wallet"}
        </button>
      </div>

      {showModal && (
        <ProfileModal
          setShowModal={setShowModal}
          handleDelete={handleDisconnect}
        />
      )}
    </>
  );
};

export default Profile;
