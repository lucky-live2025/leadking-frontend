"use client";

import { useState, useEffect } from "react";
// import { connectWallet, disconnectWallet, getWalletState, signMessage } from "@/lib/wallet";
import { apiGet, apiPost } from "@/lib/api";

export default function WalletPage() {
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadWallet();
  }, []);

  async function loadWallet() {
    try {
      const walletData = await apiGet("/wallet/me", { auth: true });
      setWallet(walletData);
    } catch (err: any) {
      if (err.message?.includes("404") || err.message?.includes("not found")) {
        setWallet(null);
      } else {
        setError(err.message || "Failed to load wallet");
      }
    }
  }

  async function handleConnect() {
    setError("WalletConnect integration pending. Please configure NEXT_PUBLIC_CONTRACT_ADDRESS and install wallet libraries.");
    // Wallet integration will be enabled after contract deployment
    // const walletState = await connectWallet();
    // const message = `Connect your wallet to Lead King\n\nAddress: ${walletState.address}\nTimestamp: ${Date.now()}`;
    // const signature = await signMessage(message);
    // await apiPost("/wallet/connect", { walletAddress: walletState.address, signature }, { auth: true });
    // await loadWallet();
  }

  async function handleDisconnect() {
    setLoading(true);
    try {
      // await disconnectWallet();
      setWallet(null);
      setMessage("Wallet disconnected");
    } catch (err: any) {
      setError(err.message || "Failed to disconnect");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Wallet Settings</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 shadow-md">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-6 shadow-md">
            {message}
          </div>
        )}

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          {wallet ? (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Connected Wallet</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-600 text-sm font-semibold block mb-2">Address</label>
                  <p className="text-gray-900 font-mono break-all bg-gray-50 p-3 rounded-lg">{wallet.address}</p>
                </div>
                <div>
                  <label className="text-gray-600 text-sm font-semibold block mb-2">Network</label>
                  <p className="text-gray-900">{wallet.network}</p>
                </div>
                <div>
                  <label className="text-gray-600 text-sm font-semibold block mb-2">Verified</label>
                  <p className="text-gray-900">{wallet.verified ? "Yes" : "No"}</p>
                </div>
                <button
                  onClick={handleDisconnect}
                  disabled={loading}
                  className="px-6 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-md disabled:opacity-50"
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-6">
                Connect your Ethereum wallet to enable USDT payments for subscriptions.
              </p>
              <button
                onClick={handleConnect}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50"
              >
                {loading ? "Connecting..." : "Connect Wallet"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
