"use client";

import { useState, useEffect } from "react";
// import { getWalletState, subscribeToTier } from "@/lib/wallet";
import { apiGet, apiPost } from "@/lib/api";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  useEffect(() => {
    loadSubscription();
    loadWallet();
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

  async function handleSubscribe(tier: number) {
    if (!wallet) {
      setError("Please connect your wallet first");
      return;
    }

    setLoading(true);
    setError(null);
    setSelectedTier(tier);

    try {
      // Wallet integration will be enabled after contract deployment
      // const walletState = getWalletState();
      // if (!walletState.connected) {
      //   throw new Error("Wallet not connected");
      // }
      // const hash = await subscribeToTier(tier);
      const hash = "pending_contract_deployment";
      setTxHash(hash);

      // Wait a moment for blockchain confirmation
      setTimeout(() => {
        loadSubscription();
      }, 5000);
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
    <div className="min-h-screen bg-[#0A1628] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Subscription</h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {txHash && (
          <div className="bg-green-500/20 border border-green-500 text-green-200 p-4 rounded-lg mb-6">
            <p>Transaction submitted!</p>
            <a
              href={`https://etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              View on Etherscan
            </a>
          </div>
        )}

        {subscription && subscription.status === "active" && (
          <div className="bg-[#111827] rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Current Subscription</h2>
            <div className="space-y-2">
              <p className="text-gray-400">
                Tier: <span className="text-white font-semibold">{subscription.tier || subscription.planTier}</span>
              </p>
              {subscription.expiryDate && (
                <p className="text-gray-400">
                  Expires in: <span className="text-white font-semibold">{getDaysRemaining(subscription.expiryDate)} days</span>
                </p>
              )}
            </div>
          </div>
        )}

        {!wallet && (
          <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-200 p-4 rounded-lg mb-6">
            <p>Please connect your wallet to subscribe.</p>
            <Link href="/dashboard/wallet" className="underline">
              Connect Wallet
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className="bg-[#111827] rounded-lg p-6 border border-gray-700"
            >
              <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-3xl font-bold text-blue-500 mb-4">{tier.usdt} USDT</p>
              <button
                onClick={() => handleSubscribe(tier.id)}
                disabled={loading || !wallet}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
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

