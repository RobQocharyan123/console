import "./Friends.css";
import "./Toast.css";
import { toast } from "react-toastify";
import fon from "../../../Assets/fon.png";
import { useEffect, useState } from "react";
import friendSuccessIcon from "../../../Assets/Friends/friend-success.svg";
import friendSuccessIconCopy from "../../../Assets/Friends/friend-success-copy.svg";
import friendsCancelIcon from "../../../Assets/Friends/friend-cancel.svg";
import "share-api-polyfill";
import { getHomePageDataThunk } from "../../../Store/Middlewares/homePageData";
import { useDispatch, useSelector } from "react-redux";

const Friends = () => {
  const [arr, setArr] = useState(Array(8).fill(false));
  const [linkCopied, setLinkCopied] = useState("");
  const [referralLink, setReferralLink] = useState(window.location.href);
  const token = useSelector((state) => state?.telegramLogin?.token);

  const dispatch = useDispatch();

  const copyReferalLink = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setLinkCopied(referralLink);
        toast.success(
          <div className="friendsSuccessDiv">
            <p className="friendSuccess">Success</p>
            <p className="friendSuccessText">Your link copied!</p>
          </div>,
          {
            icon: <img src={friendSuccessIconCopy} alt="friendSuccessIcon" />,
            closeButton: false
          }
        );
      })
      .catch((err) => {
        toast.error(
          <div className="friendsSuccessDiv">
            <p className="friendCancel">Cancel</p>
            <p className="friendSuccessText">Something went wrong!</p>
          </div>,
          {
            icon: <img src={friendsCancelIcon} alt="friendsCancelIcon" />,
            closeButton: false
          }
        );
      });
  };

  useEffect(() => {
    if (token) {
      dispatch(getHomePageDataThunk({ token }));
    }
  }, []);

  return (
    <>
      <img src={fon} alt="fon" className="fon" />
      <div className="friends">
        <h2>Invite Friends</h2>

        <div className="myFriends">
          <div className="myFriendsText">
            <p>My Friends</p>
          </div>

          <div className="myFriendsClaim">
            <p>Total amount: 800 CP</p>
          </div>
        </div>

        <div className="friendsItems">
          {Array.isArray(arr) &&
            arr.map((item, index) => {
              return (
                <div className="friend">
                  <div className="friendIntro">
                    <div className="friendImg">
                      {/* add friend img  */}
                      {/* <img src="" alt="" /> */}
                    </div>
                    <div className="friendText">
                      <p>John_321</p>
                    </div>
                  </div>
                  <div className="friendCp">
                    <p>200 CP</p>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="friendPointSuccess">
          <img src={friendSuccessIconCopy} alt="friendSuccessIconCopy" />
          <p>+200 Points for every successful referral</p>
        </div>

        <div className="friendsButton">
          <button className="copy" onClick={copyReferalLink}>
            Copy referral link
          </button>
          <a
            className="invite"
            href={`https://t.me/share/url?url=${encodeURIComponent(
              referralLink
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Invite Friends
          </a>
        </div>
      </div>
    </>
  );
};

export default Friends;
