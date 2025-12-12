"use client";

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight: boolean;
}

export default function PricingCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`rounded-2xl border p-8 shadow-sm transition pricing-card hover:shadow-xl
      ${plan.highlight ? "border-blue-500 shadow-xl bg-gradient-to-b from-white to-blue-50" : "border-gray-200 bg-white hover:border-gray-300"}
      `}
    >
      <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
      <p className="mt-2 text-sm text-gray-500">{plan.description}</p>

      <div className="mt-6 text-4xl font-extrabold text-gray-900">
        {plan.price}
      </div>

      <ul className="mt-6 space-y-3 text-sm text-gray-700">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-blue-600">•</span> {f}
          </li>
        ))}
      </ul>

      <button
        className="mt-8 w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Subscribe (Crypto)
      </button>
    </div>
  );
}

