"use client";

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-16"></div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center space-x-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded flex-1"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="container mx-auto px-8 py-8">
      <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}