import React, { useState } from "react";
import { TonClient } from "@ton/ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import "./TonWallet.css";
import { toast } from "react-toastify";
import LogoAnimation from "./../LogoAnimation/LogoAnimation";

const TonWallet = ({ text, isProfile }) => {
  const [balance, setBalance] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      // Check if the TON wallet extension is available
      if (typeof window.ton !== "undefined") {
        const wallet = window.ton; // Use the Tonkeeper/Tonhub wallet extension
        await wallet.connect(); // Connect to the wallet

        // Get the wallet address (public key)
        const address = wallet.address.toString();
        setWalletAddress(address);

        // Fetch the balance from the TON network
        const endpoint = await getHttpEndpoint();
        const client = new TonClient({ endpoint });
        const walletContract = client.open(wallet); // Open the wallet contract
        const walletBalance = await walletContract.getBalance();
        setBalance(walletBalance / 1e9); // Convert to TON (nanoTON to TON)
      } else {
        toast.error(
          "TON wallet not found. Please install Tonkeeper or Tonhub."
        );
      }
    } catch (err) {
      console.error("Error connecting to TON wallet:", err);

      toast.error("Failed to connect to TON wallet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LogoAnimation />}

      {isProfile ? (
        <button
          className="tonButton"
          onClick={handleConnect}
          disabled={!!walletAddress || loading} // disabled if connected or loading
        >
          {walletAddress ? "Connected" : text}
        </button>
      ) : (
        <button className="tonButton" onClick={handleConnect}>
          {text}
        </button>
      )}
    </>
  );
};

export default TonWallet;
