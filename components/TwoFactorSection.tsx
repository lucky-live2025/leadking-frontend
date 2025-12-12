"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api";
import Image from "next/image";

export default function TwoFactorSection({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isEnabled = user?.twoFactorEnabled || false;

  async function handleSetup() {
    setLoading(true);
    setError("");
    try {
      const res = await apiPost("/auth/2fa/setup", {});
      setQrCode(res.qrCode);
    } catch (err: any) {
      setError(err.message || "Failed to setup 2FA");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify() {
    if (!verificationCode || verificationCode.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await apiPost("/auth/2fa/verify", { code: verificationCode });
      setSuccess("2FA enabled successfully!");
      setQrCode(null);
      setVerificationCode("");
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  }

  async function handleDisable() {
    if (!confirm("Are you sure you want to disable 2FA? This will reduce your account security.")) {
      return;
    }

    setLoading(true);
    setError("");
    try {
      await apiPost("/auth/2fa/disable", {});
      setSuccess("2FA disabled successfully!");
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Failed to disable 2FA");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
          {success}
        </div>
      )}

      {!isEnabled ? (
        <div>
          {!qrCode ? (
            <div>
              <p className="text-gray-600 mb-4">
                Enable two-factor authentication to add an extra layer of security to your account.
              </p>
              <button
                onClick={handleSetup}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50"
              >
                {loading ? "Setting up..." : "Enable 2FA"}
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">
                Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.):
              </p>
              {qrCode && (
                <div className="mb-4 flex justify-center">
                  <Image src={qrCode} alt="2FA QR Code" width={200} height={200} />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Enter 6-digit verification code
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="000000"
                />
              </div>
              <button
                onClick={handleVerify}
                disabled={loading || verificationCode.length !== 6}
                className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-md disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify & Enable"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="text-gray-600 mb-4">
            Two-factor authentication is enabled. Your account is protected with an additional security layer.
          </p>
          <button
            onClick={handleDisable}
            disabled={loading}
            className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-md disabled:opacity-50"
          >
            {loading ? "Disabling..." : "Disable 2FA"}
          </button>
        </div>
      )}
    </div>
  );
}

