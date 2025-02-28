import "./Friends.css";
import "./Toast.css";
import { toast } from "react-toastify";
import fon from "../../../Assets/fon.png";
import { useState } from "react";
import friendSuccessIcon from "../../../Assets/Friends/friend-success.svg";
import friendsCancelIcon from "../../../Assets/Friends/friend-cancel.svg";
import "share-api-polyfill";

const Friends = () => {
  const [arr, setArr] = useState(Array(8).fill(false));
  const [linkCopied, setLinkCopied] = useState("");

  const copyReferalLink = () => {
    const referralLink = window.location.href;

    if (navigator.share) {
      navigator
        .share({
          title: "Check out this referral link!",
          text: "Use my referral link to sign up:",
          url: referralLink,
        })
        .then(() => {
          setLinkCopied(referralLink);
          toast.success(
            <div className="friendsSuccessDiv">
              <p className="friendSuccess">Success</p>
              <p className="friendSuccessText">Link shared successfully!</p>
            </div>,
            {
              icon: <img src={friendSuccessIcon} alt="friendSuccessIcon" />,
              closeButton: false,
            },
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
              closeButton: false,
            },
          );
        });
    } else {
      // Fallback to clipboard copy if Web Share API isn't available
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
              icon: <img src={friendSuccessIcon} alt="friendSuccessIcon" />,
              closeButton: false,
            },
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
              closeButton: false,
            },
          );
        });
    }
  };
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
            <button>Claim all</button>
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
          <img src={friendSuccessIcon} alt="friendSuccessIcon" />
          <p>+200 Points for every successful referral</p>
        </div>

        <div className="friendsButton">
          <button className="copy" onClick={copyReferalLink}>
            Copy referral link
          </button>
          <a
            className={`invite ${!linkCopied ? "disabled" : ""}`}
            href={
              linkCopied
                ? `https://t.me/share/url?url=https://${linkCopied}`
                : "#"
            }
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!linkCopied) {
                e.preventDefault();
              }
            }}
            style={{
              pointerEvents: linkCopied ? "auto" : "none",
              opacity: linkCopied ? 1 : 0.5,
              cursor: linkCopied ? "pointer" : "not-allowed",
            }}
          >
            Invite Friends
          </a>
        </div>
      </div>
      ;
    </>
  );
};
export default Friends;
