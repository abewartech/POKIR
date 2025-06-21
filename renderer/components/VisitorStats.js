"use client";

import useVisitorData from "@/hooks/useVisitorData";

const VisitorStats = ({ showRefresh = true, compact = false }) => {
  const { visitorCount, visitorDate, loading, error, refreshData } = useVisitorData();

  if (compact) {
    return (
      <div className="inline-flex items-center space-x-2">
        {loading ? (
          <span className="text-sm text-gray-500">Loading...</span>
        ) : error ? (
          <span className="text-sm text-red-500">Error</span>
        ) : (
          <span className="text-sm font-medium">{visitorCount} visitors</span>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Visitor Statistics</h3>
        {showRefresh && (
          <button
            onClick={refreshData}
            disabled={loading}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading visitor data...</p>
        </div>
      ) : error ? (
        <div className="text-center py-4">
          <div className="text-red-600 text-sm mb-2">Error: {error}</div>
          <button
            onClick={refreshData}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Date:</span>
            <span className="text-sm font-medium">{visitorDate || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Visitors:</span>
            <span className="text-lg font-bold text-blue-600">{visitorCount}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorStats; 