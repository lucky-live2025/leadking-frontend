"use client";

import { useState, useEffect } from "react";
import { apiGet, apiPost } from "@/lib/api";
import { connectWallet, getWalletState, startSubscription, waitForTransaction } from "@/lib/web3";
import Link from "next/link";

const TIERS = [
  { id: 1, name: "Starter", price: 250, usdt: 250 },
  { id: 2, name: "Pro", price: 750, usdt: 750 },
  { id: 3, name: "Ultra", price: 7500, usdt: 7500 },
  { id: 4, name: "Enterprise", price: 15000, usdt: 15000 },
];

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [showConnectModal, setShowConnectModal] = useState(false);

  useEffect(() => {
    loadSubscription();
    loadWallet();
    checkWalletConnection();
  }, []);

  async function loadSubscription() {
    try {
      const sub = await apiGet("/subscriptions/me", { auth: true });
      setSubscription(sub);
    } catch (err: any) {
      console.error("Failed to load subscription:", err);
    }
  }

  async function loadWallet() {
    try {
      const walletData = await apiGet("/wallet/me", { auth: true });
      setWallet(walletData);
    } catch (err: any) {
      console.error("Failed to load wallet:", err);
    }
  }

  function checkWalletConnection() {
    const state = getWalletState();
    setWalletConnected(state.connected);
  }

  async function handleConnectWallet() {
    setLoading(true);
    setError(null);
    try {
      const state = await connectWallet();
      setWalletConnected(true);
      
      // Save wallet to backend
      await apiPost("/wallet/connect", { walletAddress: state.address }, { auth: true });
      await loadWallet();
      setShowConnectModal(false);
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubscribe(tier: number) {
    if (!walletConnected && !wallet) {
      setShowConnectModal(true);
      return;
    }

    setLoading(true);
    setError(null);
    setSelectedTier(tier);

    try {
      // Step 1: Start subscription on backend
      const startResponse = await apiPost("/subscription/start", { tier }, { auth: true });
      
      // Step 2: Connect wallet if not connected
      if (!walletConnected) {
        await handleConnectWallet();
      }

      // Step 3: Call smart contract
      const state = getWalletState();
      if (!state.connected || !state.signer) {
        throw new Error("Wallet not connected");
      }

      const hash = await startSubscription(tier);
      setTxHash(hash);

      // Step 4: Wait for transaction confirmation
      await waitForTransaction(hash);

      // Step 5: Confirm subscription on backend
      await apiPost("/subscription/confirm", { tier, txHash: hash }, { auth: true });

      // Step 6: Refresh subscription status
      await loadSubscription();
      
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to process subscription");
    } finally {
      setLoading(false);
    }
  }

  function getDaysRemaining(expiryDate: string) {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Subscription</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 shadow-md">
            {error}
          </div>
        )}

        {txHash && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-6 shadow-md">
            <p>Transaction submitted!</p>
            <a
              href={`https://etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-green-800"
            >
              View on Etherscan
            </a>
          </div>
        )}

        {subscription && subscription.status === "active" && (
          <div className="bg-white rounded-xl p-6 mb-8 shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Subscription</h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                Tier: <span className="text-gray-900 font-semibold">{subscription.tier || subscription.planTier}</span>
              </p>
              {subscription.expiryDate && (
                <p className="text-gray-600">
                  Expires in: <span className="text-gray-900 font-semibold">{getDaysRemaining(subscription.expiryDate)} days</span>
                </p>
              )}
            </div>
          </div>
        )}

        {!wallet && !walletConnected && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-xl mb-6 shadow-md">
            <p>Please connect your wallet to subscribe.</p>
            <button
              onClick={() => setShowConnectModal(true)}
              className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded-xl font-semibold hover:bg-yellow-700 transition-colors shadow-md"
            >
              Connect Wallet
            </button>
          </div>
        )}

        {/* Connect Wallet Modal */}
        {showConnectModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Connect Wallet</h2>
              <p className="text-gray-600 mb-6">
                Connect your Ethereum wallet to purchase a subscription with USDT.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowConnectModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConnectWallet}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50"
                >
                  {loading ? "Connecting..." : "Connect"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">{tier.usdt} USDT</p>
              <button
                onClick={() => handleSubscribe(tier.id)}
                disabled={loading || (!wallet && !walletConnected)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading && selectedTier === tier.id ? "Processing..." : "Subscribe"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
