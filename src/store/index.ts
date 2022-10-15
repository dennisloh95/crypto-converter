import create from "zustand";
import dayjs from "dayjs";
import { Rate } from "../utils/types";

interface RateStoreState {
  data: Rate | null;
  loading: boolean;
  lastUpdate: string;
  error: string;
  getRate: (ids: string) => void;
  setLoading: () => void;
  setError: (err: string) => void;
}

const supportedCoins = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
  },
  { id: "ethereum", symbol: "eth", name: "Ethereum" },
  { id: "tether", symbol: "usdt", name: "Tether" },
  {
    id: "defichain",
    symbol: "dfi",
    name: "DeFiChain",
  },
  {
    id: "dogecoin",
    symbol: "doge",
    name: "Dogecoin",
  },
];

const useRateStore = create<RateStoreState>((set, get) => ({
  data: null,
  loading: false,
  error: "",
  lastUpdate: "",
  getRate: async (ids) => {
    try {
      set(() => ({
        loading: false,
      }));
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${"usd"}`
      );
      if (!res) {
        throw new Error("No data");
      }
      const resData: Rate = await res.json();
      set({
        data: resData,
        loading: false,
        error: "",
        lastUpdate: dayjs().format("hh:mm A"),
      });
    } catch (err) {
      get().setError((err as DOMException).message);
    }
  },
  setLoading: () =>
    set(() => ({
      loading: true,
    })),
  setError: (err: string) =>
    set(() => ({
      data: null,
      loading: false,
      error: err,
    })),
}));

export { useRateStore, supportedCoins };
