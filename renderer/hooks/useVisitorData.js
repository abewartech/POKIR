import { useEffect } from 'react';
import useVisitorStore from '@/stores/visitorStore';

/**
 * Custom hook for managing visitor data
 * Provides a simplified interface to the visitor store
 */
export const useVisitorData = () => {
  const { visitors, loading, error, fetchVisitors, clearError } = useVisitorStore();

  // Auto-fetch data on mount
  useEffect(() => {
    fetchVisitors();
  }, [fetchVisitors]);

  const refreshData = () => {
    clearError();
    fetchVisitors();
  };

  return {
    // Data
    visitorCount: visitors.total_visitors,
    visitorDate: visitors.date,
    visitors,
    
    // State
    loading,
    error,
    
    // Actions
    refreshData,
    fetchVisitors,
    clearError,
    
    // Computed
    hasData: visitors.total_visitors > 0,
    hasError: !!error,
  };
};

export default useVisitorData; 