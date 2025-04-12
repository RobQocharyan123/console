import "./Profile.css";
import fon from "../../../Assets/fon.png";
import profileDefaultImg from "../../../Assets/Profile/profil-default.svg";
import profileWalletCancelIcon from "../../../Assets/Profile/profile-cancel.svg";
import { useEffect, useState } from "react";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageDataThunk } from "../../../Store/Middlewares/homePageData";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { useTonConnectUI } from "@tonconnect/ui-react";

const Profile = () => {
  const [profileImg, setProfileImg] = useState(profileDefaultImg);
  const [showModal, setShowModal] = useState(false);
  const [tonConnectUI] = useTonConnectUI();

  const token = useSelector((state) => state?.telegramLogin?.token);
  const dispatch = useDispatch();

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
  // 🟢 Get wallet info
  const wallet = useTonWallet();

  // 🟢 Shorten address for display
  const getShortAddress = (address) => {
    return address.slice(0, 4) + "..." + address.slice(-4);
  };

  const handleDelete = async () => {
    try {
      if (wallet?.account?.address) {
        await tonConnectUI.disconnect();
        console.log("Wallet disconnected");
      }
    } catch (err) {
      if (err.message === "Operation aborted") {
        console.warn("User aborted the disconnect operation.");
      } else {
        console.error("Unexpected disconnect error:", err);
      }
    } finally {
      setShowModal(false);
    }
  };
  console.log(wallet, "this is wallet");

  return (
    <>
      <img src={fon} alt="fon" className="fon" />

      <div className="profil">
        <div className="imgAndName">
          <div className="profilImg">
            <img src={profileImg} alt="profileDefaultImg" />
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

          {wallet?.account?.address ? (
            <div className="profilWalletItem">
              <p>{getShortAddress(wallet.account.address)}</p>
              <img
                src={profileWalletCancelIcon}
                alt="profileWalletCancelIcon"
                onClick={() => {
                  setShowModal(true);
                }}
              />
            </div>
          ) : (
            <p>You have no wallet connected.</p>
          )}
        </div>

        {/* 🟢 Always show TON Connect button here */}
        <button
          className="tonButton"
          disabled={wallet?.account?.address ? true : false}
          onClick={() => tonConnectUI.openModal()}
        >
          TON Connect
        </button>
      </div>

      {showModal && (
        <ProfileModal setShowModal={setShowModal} handleDelete={handleDelete} />
      )}
    </>
  );
};

export default Profile;
