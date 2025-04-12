import React, { useEffect, useState } from "react";
import { useTonWallet, useTonConnectUI } from "@tonconnect/ui-react";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";
import { toast } from "react-toastify";
import LogoAnimation from "./../LogoAnimation/LogoAnimation";
import "./TonWallet.css";

const TonWallet = ({ text, isProfile }) => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const fetchBalance = async () => {
    if (!wallet?.account?.address) return;
    setLoading(true);
    try {
      const endpoint = await getHttpEndpoint();
      const client = new TonClient({ endpoint });
      const walletBalance = await client.getBalance(wallet.account.address);
      setBalance(walletBalance / 1e9);
    } catch (err) {
      toast.error("Failed to fetch TON balance.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (wallet?.account?.address) {
      fetchBalance();
    }
  }, [wallet?.account?.address]);

  const handleConnect = () => {
    if (wallet?.account?.address) {
      // If wallet is connected, open purchase modal
      setShowPurchaseModal(true);
    } else {
      // If wallet is not connected, open TON Connect modal
      tonConnectUI.openModal();
    }
  };

  return (
    <>
      {loading && <LogoAnimation />}
      <button className="tonButton" onClick={handleConnect}>
        {text}
      </button>

      {/* Show purchase modal if wallet is connected */}
    </>
  );
};

export default TonWallet;
