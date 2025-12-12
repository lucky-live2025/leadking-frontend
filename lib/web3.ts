"use client";

import { ethers } from "ethers";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";
const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

const CONTRACT_ABI = [
  "function subscribe(uint256 tier) external returns (bool)",
  "event SubscriptionPaid(address indexed user, uint256 indexed tier, uint256 amount, uint256 timestamp, bytes32 indexed txHash)",
];

export interface WalletState {
  address: string | null;
  connected: boolean;
  provider: any; // ethers.BrowserProvider (v6) or ethers.providers.Web3Provider (v5)
  signer: any; // ethers.JsonRpcSigner (v6) or ethers.Signer (v5)
}

let walletState: WalletState = {
  address: null,
  connected: false,
  provider: null,
  signer: null,
};

export async function connectWallet(): Promise<WalletState> {
  if (typeof window === "undefined" || !(window as any).ethereum) {
    throw new Error("MetaMask or another Web3 wallet is required");
  }

  try {
    // Use ethers v5 Web3Provider (v6 uses BrowserProvider)
    const provider = new (ethers as any).providers.Web3Provider((window as any).ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    walletState = {
      address,
      connected: true,
      provider,
      signer,
    };

    return walletState;
  } catch (error: any) {
    throw new Error(`Failed to connect wallet: ${error.message}`);
  }
}

export async function disconnectWallet() {
  walletState = {
    address: null,
    connected: false,
    provider: null,
    signer: null,
  };
}

export function getWalletState(): WalletState {
  return walletState;
}

export async function startSubscription(tier: number): Promise<string> {
  if (!walletState.signer || !CONTRACT_ADDRESS) {
    throw new Error("Wallet not connected or contract not configured");
  }

  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, walletState.signer);
  const tx = await contract.subscribe(tier);
  const receipt = await tx.wait();

  return receipt.hash;
}

export async function waitForTransaction(txHash: string): Promise<any> {
  if (!walletState.provider) {
    throw new Error("Provider not available");
  }

  return await walletState.provider.waitForTransaction(txHash);
}

