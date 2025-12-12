"use client";

import { ReactNode } from "react";

interface IntegrationCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  status: "connected" | "not-connected" | "warning" | "blocked";
  statusText: string;
  isExpiringSoon?: boolean;
  accountId?: string;
  lastChecked?: string;
  errorMessage?: string;
  onConnect: () => void;
  onDisconnect?: () => void;
  onReconnect?: () => void;
}

export default function IntegrationCard({
  icon,
  title,
  description,
  status,
  statusText,
  isExpiringSoon,
  accountId,
  lastChecked,
  errorMessage,
  onConnect,
  onDisconnect,
  onReconnect,
}: IntegrationCardProps) {
  const isConnected = status === "connected" || status === "warning" || status === "blocked";

  return (
    <div className="integration-card">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Icon */}
        <div className="flex-shrink-0">{icon}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
              <p className="text-gray-300 text-sm mb-4">{description}</p>

              {/* Status Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`status-badge ${
                    status === "connected"
                      ? "status-connected"
                      : status === "not-connected"
                      ? "status-not-connected"
                      : status === "warning"
                      ? "status-warning"
                      : "status-blocked"
                  }`}
                >
                  {statusText}
                </span>
                {isExpiringSoon && (
                  <span className="text-yellow-400 text-xs">⚠️ Expiring Soon</span>
                )}
              </div>

              {/* Additional Info */}
              {(accountId || lastChecked || errorMessage) && (
                <div className="mt-4 p-3 bg-black/20 rounded-lg text-sm">
                  {accountId && (
                    <div className="text-gray-300 mb-1">
                      <span className="text-gray-400">Account ID: </span>
                      <span className="font-medium">{accountId}</span>
                    </div>
                  )}
                  {lastChecked && (
                    <div className="text-gray-300 mb-1">
                      <span className="text-gray-400">Last Checked: </span>
                      <span className="font-medium">
                        {new Date(lastChecked).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {errorMessage && (
                    <div className="text-red-400 text-xs mt-2">{errorMessage}</div>
                  )}
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="flex-shrink-0">
              {!isConnected ? (
                <button onClick={onConnect} className="connect-button">
                  Connect
                </button>
              ) : (
                <div className="flex gap-3">
                  {onReconnect && (
                    <button
                      onClick={onReconnect}
                      className="px-4 py-2 bg-gray-600/50 text-white rounded-xl hover:bg-gray-600/70 transition-all text-sm font-medium"
                    >
                      Reconnect
                    </button>
                  )}
                  {onDisconnect && (
                    <button
                      onClick={onDisconnect}
                      className="px-4 py-2 bg-red-600/50 text-white rounded-xl hover:bg-red-600/70 transition-all text-sm font-medium"
                    >
                      Disconnect
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

