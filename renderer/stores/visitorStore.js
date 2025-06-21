import axios from "axios";
import { create } from "zustand";

const useVisitorStore = create((set, get) => ({
  // State
  visitors: {
    date: "",
    total_visitors: 0,
  },
  loading: false,
  error: null,
  layout: 1,

  // Actions
  fetchVisitors: async () => {
    set({ loading: true, error: null });

    try {
      const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/visitors/total-daily`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch visitor data");
      }

      const data = await response.json();
      set({
        visitors: data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
      console.error("Error fetching visitors:", error);
    }
  },

  postVisitors: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/visitors/register-with-visit`,
        data
      );

      set({
        visitors: response.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      console.error("Error fetching visitors:", error);
    }
  },

  setVisitors: (visitorData) => {
    set({ visitors: visitorData });
  },

  setLayout: (layoutSelected) => {
    set({ layout: layoutSelected });
  },

  clearError: () => {
    set({ error: null });
  },

  reset: () => {
    set({
      visitors: { date: "", total_visitors: 0 },
      loading: false,
      error: null,
    });
  },
}));

export default useVisitorStore;
