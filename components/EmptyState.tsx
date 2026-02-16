"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    href?: string;
  };
  children?: ReactNode;
}

export default function EmptyState({ icon: Icon, title, description, action, children }: EmptyStateProps) {
  const content = (
    <div className="bg-white rounded-xl p-12 text-center shadow-md border border-gray-200">
      <div className="flex justify-center mb-4">
        <div className="p-4 bg-gray-100 rounded-full">
          <Icon className="h-12 w-12 text-gray-400" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
        >
          {action.label}
        </button>
      )}
      {children}
    </div>
  );

  if (action?.href) {
    return (
      <a href={action.href} className="block">
        {content}
      </a>
    );
  }

  return content;
}
