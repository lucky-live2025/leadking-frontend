"use client";

import { useState, useEffect } from "react";
import { apiGet, apiPost } from "@/lib/api";
import Link from "next/link";

const TIERS = [
  { id: 1, name: "Starter", price: 250, tier: "BASIC" },
  { id: 2, name: "Pro", price: 750, tier: "PRO" },
  { id: 3, name: "Ultra", price: 7500, tier: "TITANIUM" },
  { id: 4, name: "Enterprise", price: 15000, tier: "INFINITY" },
];

interface PaymentData {
  id: number;
  amount: number;
  network: string;
  walletAddress: string;
  memo: string;
  expiresAt: string;
  qrCode: string;
}

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [txHash, setTxHash] = useState("");
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
    loadSubscription();
  }, []);

  useEffect(() => {
    if (paymentData && paymentData.expiresAt) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const expiry = new Date(paymentData.expiresAt).getTime();
        const remaining = Math.max(0, Math.floor((expiry - now) / 1000));
        setTimeRemaining(remaining);

        if (remaining === 0) {
          clearInterval(interval);
          setPaymentData(null);
          setError("Payment time expired. Please try again.");
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [paymentData]);

  async function loadSubscription() {
    try {
      const sub = await apiGet("/subscription/me", { auth: true });
      // Handle both null and object responses
      if (sub && (sub.status !== 'inactive' || sub.id)) {
        setSubscription(sub);
      } else {
        setSubscription(null);
      }
    } catch (err: any) {
      console.error("Failed to load subscription:", err);
      setSubscription(null);
      // Don't set error here - it's okay if subscription doesn't exist
    }
  }

  async function handleSubscribe(tier: typeof TIERS[0]) {
    setLoading(true);
    setError(null);
    setSelectedTier(tier.id);
    setPaymentData(null);
    setTxHash("");
    setPaymentStatus(null);

    try {
      // Create payment with QR code
      const payment = await apiPost(
        "/payments/create",
        {
          tier: tier.tier,
          network: "USDT_ERC20", // Default to ERC20, can be made configurable
        },
        { auth: true }
      );

      // Check if payment creation was disabled or failed
      if (payment.status === 'disabled' || payment.status === 'error') {
        setError(payment.message || "Crypto billing temporarily unavailable");
        setSelectedTier(null);
        return;
      }

      // Check if payment has required fields
      if (!payment.id || !payment.walletAddress) {
        setError("Crypto billing temporarily unavailable");
        setSelectedTier(null);
        return;
      }

      setPaymentData(payment);
      setTimeRemaining(Math.floor((new Date(payment.expiresAt).getTime() - new Date().getTime()) / 1000));
    } catch (err: any) {
      // Check if it's a 500 error or network error
      if (err.response?.status === 500 || err.message?.includes('500') || err.message?.includes('Internal')) {
        setError("Crypto billing temporarily unavailable");
      } else {
        setError(err.message || "Failed to create payment");
      }
      setSelectedTier(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitTxHash() {
    if (!paymentData || !txHash.trim()) {
      setError("Please enter a transaction hash");
      return;
    }

    setLoading(true);
    setError(null);
    setPaymentStatus("submitting");

    try {
      await apiPost(
        `/payments/submit-tx/${paymentData.id}`,
        { txHash: txHash.trim() },
        { auth: true }
      );

      setPaymentStatus("submitted");
      setError(null);
      
      // Poll for payment status
      const checkInterval = setInterval(async () => {
        try {
          const status = await apiGet(`/payments/status/${paymentData.id}`, { auth: true });
          if (status.status === "APPROVED") {
            clearInterval(checkInterval);
            setPaymentStatus("approved");
            setPaymentData(null);
            setTxHash("");
            await loadSubscription();
          } else if (status.status === "REJECTED") {
            clearInterval(checkInterval);
            setPaymentStatus("rejected");
            setError("Payment was rejected. Please contact support.");
          }
        } catch (err) {
          console.error("Failed to check payment status:", err);
        }
      }, 5000);

      // Stop polling after 5 minutes
      setTimeout(() => clearInterval(checkInterval), 5 * 60 * 1000);
    } catch (err: any) {
      setError(err.message || "Failed to submit transaction hash");
      setPaymentStatus(null);
    } finally {
      setLoading(false);
    }
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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

        {/* Payment QR Code Modal */}
        {paymentData && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Complete Payment</h2>
                <button
                  onClick={() => {
                    setPaymentData(null);
                    setTxHash("");
                    setSelectedTier(null);
                    setPaymentStatus(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {timeRemaining !== null && timeRemaining > 0 && (
                <div className="mb-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                    <p className="text-sm text-yellow-800 mb-1">Time Remaining</p>
                    <p className="text-2xl font-bold text-yellow-900">{formatTime(timeRemaining)}</p>
                  </div>
                </div>
              )}

              <div className="text-center mb-4">
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  Send {paymentData.amount} USDT to:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <img src={paymentData.qrCode} alt="Payment QR Code" className="mx-auto mb-4 w-48 h-48" />
                  <p className="text-xs font-mono text-gray-600 break-all">{paymentData.walletAddress}</p>
                </div>
                <p className="text-sm text-gray-600 mb-2">Memo:</p>
                <p className="text-xs font-mono text-gray-700 bg-gray-50 p-2 rounded">{paymentData.memo}</p>
              </div>

              {paymentStatus === "submitted" && (
                <div className="bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-lg mb-4 text-center">
                  <p>Transaction submitted! Waiting for admin approval...</p>
                </div>
              )}

              {paymentStatus === "approved" && (
                <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg mb-4 text-center">
                  <p>Payment approved! Your subscription is now active.</p>
                </div>
              )}

              {paymentStatus !== "approved" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transaction Hash (after payment)
                    </label>
                    <input
                      type="text"
                      value={txHash}
                      onChange={(e) => setTxHash(e.target.value)}
                      placeholder="0x..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={loading || paymentStatus === "submitted"}
                    />
                  </div>
                  <button
                    onClick={handleSubmitTxHash}
                    disabled={loading || !txHash.trim() || paymentStatus === "submitted"}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? "Submitting..."
                      : paymentStatus === "submitted"
                      ? "Submitted - Waiting for Approval"
                      : "Submit Transaction Hash"}
                  </button>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-4 text-center">
                After sending payment, paste the transaction hash above and click submit.
              </p>
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
              <p className="text-3xl font-bold text-blue-600 mb-4">{tier.price} USDT</p>
              <button
                onClick={() => handleSubscribe(tier)}
                disabled={loading || (paymentData !== null && selectedTier === tier.id)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading && selectedTier === tier.id
                  ? "Creating Payment..."
                  : paymentData && selectedTier === tier.id
                  ? "Payment in Progress"
                  : "Subscribe"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
