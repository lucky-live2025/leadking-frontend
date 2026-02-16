"use client";

import { useState, useEffect } from "react";
import { apiGet, apiPost, apiPut } from "@/lib/api";
import { Shield, User, Mail, Save, CheckCircle, AlertCircle, Loader2, Lock, Eye, EyeOff } from "lucide-react";

export default function DashboardProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      setError(null);
      
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setError("Please log in to view your profile");
        setLoading(false);
        return;
      }
      
      const data = await apiGet("/auth/me", { auth: true });
      setUser(data);
      setFormData({
        name: data.name || "",
        email: data.email || "",
      });
    } catch (err: any) {
      console.error("Failed to load profile:", err);
      
      if (err.response?.status === 401 || err.message?.includes("401")) {
        setError("Please log in to view your profile");
      } else if (err.response?.status === 403 || err.message?.includes("403")) {
        const errorMsg = err.response?.data?.message || err.message || "Access denied";
        if (errorMsg.includes("approved") || errorMsg.includes("approval")) {
          setError("Your account is pending approval. Please wait for admin approval.");
        } else {
          setError(errorMsg);
        }
      } else {
        setError(err.message || "Failed to load profile");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await apiPost("/auth/me", formData, { auth: true });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      await loadProfile();
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <div className="text-lg text-gray-600 font-medium">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your account information and security settings</p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <p className="text-green-700 font-medium">Profile updated successfully!</p>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'profile'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <User className="h-5 w-5 mr-2" />
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'security'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Shield className="h-5 w-5 mr-2" />
                Security & Authentication
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    This email will be used for account notifications and password resets.
                  </p>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'security' && user && (
              <div className="space-y-8">
                <ChangePasswordSection />
                <TwoFactorAuthSection user={user} onUpdate={loadProfile} />
              </div>
            )}
          </div>
        </div>

        {/* Account Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Account Status</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user?.status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-800' 
                    : user?.status === 'PENDING'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user?.status || 'Unknown'}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Member Since</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'N/A'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

// Change Password Component
function ChangePasswordSection() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      setError("New password must include uppercase, lowercase, and a number.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }
    setLoading(true);
    try {
      await apiPost(
        "/auth/change-password",
        { currentPassword, newPassword },
        { auth: true }
      );
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Failed to change password.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Change Password</h3>
      <p className="text-sm text-gray-600 mb-4">
        Update your password. Use at least 8 characters with uppercase, lowercase, and a number.
      </p>
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-sm text-green-700">Password changed successfully.</p>
        </div>
      )}
      <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter current password"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showCurrent ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter new password"
              required
              minLength={8}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNew ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm new password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm new password"
              required
              autoComplete="new-password"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Updating...
            </>
          ) : (
            "Update password"
          )}
        </button>
      </form>
    </div>
  );
}

// Two-Factor Authentication Component
function TwoFactorAuthSection({ user, onUpdate }: { user: any; onUpdate: () => void }) {
  const [loading, setLoading] = useState(false);
  const [setupLoading, setSetupLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [showSetup, setShowSetup] = useState(false);

  const is2FAEnabled = user?.twoFactorEnabled || false;

  async function handleSetup() {
    setSetupLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await apiPost("/auth/2fa/setup", {}, { auth: true });
      setQrCode(result.qrCode);
      setSecret(result.manualEntryKey);
      setShowSetup(true);
    } catch (err: any) {
      setError(err.message || "Failed to set up 2FA");
    } finally {
      setSetupLoading(false);
    }
  }

  async function handleVerify() {
    if (!verificationCode || verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setVerifying(true);
    setError(null);
    setSuccess(null);

    try {
      await apiPost("/auth/2fa/verify", { code: verificationCode }, { auth: true });
      setSuccess("2FA enabled successfully!");
      setShowSetup(false);
      setVerificationCode("");
      setQrCode(null);
      setSecret(null);
      setTimeout(() => {
        setSuccess(null);
        onUpdate();
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Invalid verification code");
    } finally {
      setVerifying(false);
    }
  }

  async function handleDisable() {
    if (!confirm("Are you sure you want to disable 2FA? This will make your account less secure.")) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await apiPost("/auth/2fa/disable", {}, { auth: true });
      setSuccess("2FA disabled successfully");
      setTimeout(() => {
        setSuccess(null);
        onUpdate();
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to disable 2FA");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Two-Factor Authentication</h3>
        <p className="text-sm text-gray-600 mb-4">
          Add an extra layer of security to your account by requiring a verification code in addition to your password.
        </p>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        {!is2FAEnabled && !showSetup && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-blue-900 mb-1">2FA Not Enabled</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Enable two-factor authentication to protect your account from unauthorized access.
                </p>
                <button
                  onClick={handleSetup}
                  disabled={setupLoading}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {setupLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Setting up...
                    </>
                  ) : (
                    "Enable 2FA"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {showSetup && qrCode && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Scan QR Code</h4>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                </p>
                {secret && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-500 mb-1">Or enter this code manually:</p>
                    <code className="text-sm font-mono text-gray-900">{secret}</code>
                  </div>
                )}
                <div className="space-y-3">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit code"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center text-lg font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={6}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleVerify}
                      disabled={verifying || verificationCode.length !== 6}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {verifying ? "Verifying..." : "Verify & Enable"}
                    </button>
                    <button
                      onClick={() => {
                        setShowSetup(false);
                        setQrCode(null);
                        setSecret(null);
                        setVerificationCode("");
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {is2FAEnabled && !showSetup && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-green-900 mb-1">2FA Enabled</h4>
                  <p className="text-sm text-green-700">
                    Two-factor authentication is active on your account.
                  </p>
                </div>
              </div>
              <button
                onClick={handleDisable}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Disabling..." : "Disable 2FA"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
