import "./UpgradePopUp.css";
import upgradePopUpLogoIcon from "../../../../../../Assets/Home/Upgrade/upgrade-popup-logo.svg";
import upgradeCancelIcon from "../../../../../../Assets/Home/Upgrade/upgrade-cancel.svg";
import upgradeLogoIcon from "../../../../../../Assets/Home/Upgrade/upgrade-logo.svg";
import upgradeTonIcon from "../../../../../../Assets/Home/Upgrade/upgrade-ton.svg";
import { useDispatch, useSelector } from "react-redux";
import { upgradeBuyThunk } from "../../../../../../Store/Middlewares/upgradeServiceBuy";
import { upgradeServicePost } from "./../../../../../Services/upgradeService";
import { setUpdateUbgradeData } from "../../../../../../Store/Slices/homePageSlice";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { toast } from "react-toastify";

const UpgradePopUp = ({ setShow, data }) => {
  const [tonConnectUI] = useTonConnectUI();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.telegramLogin?.token);
  const wallet = useTonWallet();

  // Check if wallet is connected and handle the transaction
  const handleBuy = async () => {
    try {
      // Check if wallet is connected
      if (!wallet?.account?.address) {
        toast.error("Please connect your wallet first.");
        return;
      }

      // Fetch wallet balance (replace with actual API call)
      const walletBalance = await getWalletBalance(wallet.account.address); // Assume this function exists

      // Calculate the amount needed for the transaction
      const amountNeeded = data?.ton_price * 1e9; // 1 TON in nanoTON

      // Check if the wallet balance is enough for the transaction
      if (walletBalance < amountNeeded) {
        const balanceShortage = (amountNeeded - walletBalance) / 1e9; // Convert nanoTON to TON
        toast.error(
          `You need ${balanceShortage.toFixed(
            2
          )} more TON to complete this transaction.`
        );
        return;
      }

      // Prepare the transaction
      const destinationAddress = "EQC2...YOUR_WALLET_ADDRESS..."; // Replace with actual recipient address
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 600, // Valid for 10 minutes
        messages: [
          {
            address: destinationAddress, //here need  backend adreess
            amount: amountNeeded.toString() // Amount in nanoTON  need add backend amount
            // payload:paymentId   here need add backend paymentID
          }
        ]
      };

      // Send the transaction
      await tonConnectUI.sendTransaction(transaction);
      toast.success("Transaction sent!");
    } catch (err) {
      console.error("Transaction failed:", err);
      toast.error("Transaction failed.");
    }
  };

  // Example function to get wallet balance (replace with actual logic)
  const getWalletBalance = async (address) => {
    // Fetch wallet balance from your blockchain provider (replace with real logic)
    return 100e9; // Mocked: 100 TON in nanoTON
  };

  // Handle purchase with native token
  const handleClickeBuyNative = async () => {
    const obj = {
      id: data?.id,
      type: "native"
    };
    const response = await upgradeServicePost({ obj, token });
    dispatch(setUpdateUbgradeData(response?.data));
    setShow(false);
  };

  // Function to handle TON purchase and check connection
  const handleTONPurchase = async () => {
    // If wallet is connected, proceed with the purchase
    if (wallet?.account?.address) {
      handleBuy();
    } else {
      // If wallet is not connected, prompt user to connect
      tonConnectUI.openModal();
    }
  };

  return (
    <>
      <div className="upgradeOverlay" onClick={() => setShow(false)}></div>
      <div className="upgradePopUp">
        <img
          src={upgradeCancelIcon}
          alt="upgradeCancelIcon"
          className="upgradeCancel"
          onClick={() => setShow(false)}
        />

        <div className="upgradePopUpText">
          <img src={upgradePopUpLogoIcon} alt="upgradePopUpLogoIcon" />
          <p>Select your preferred option to enhance your rewards</p>
        </div>
        <div className="greenLinePopUp"></div>

        <div className="upgradePopUpFooter">
          <div className="leftClaim">
            <img
              src={upgradeLogoIcon}
              alt="upgradeLogoIcon"
              className="upgradeLogoIcon"
            />
            <p>{data?.native_price}</p>
            <button disabled={data?.is_active} onClick={handleClickeBuyNative}>
              Buy
            </button>
          </div>
          <div className="rightClaim">
            <img
              src={upgradeTonIcon}
              alt="upgradeTonIcon"
              className="upgradeTonIcon"
            />
            <p>{data?.ton_price}</p>
            <button
              className="tonButton"
              onClick={handleTONPurchase} // Open connection modal if wallet not connected
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpgradePopUp;
