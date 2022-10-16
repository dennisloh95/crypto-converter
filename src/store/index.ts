import create from "zustand";
import dayjs from "dayjs";
import { Rate } from "../utils/types";

interface RateStoreState {
  data: Rate | null;
  lastUpdate: string;
  currentDateTime: string;
  setData: (data: Rate) => void;
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
  lastUpdate: "",
  currentDateTime: "",
  setData: (data: Rate) => {
    set(() => ({
      data: data,
      currentDateTime: dayjs().format("DD/MM/YYYY dddd hh:mm A"),
      lastUpdate: dayjs().format("hh:mm A"),
    }));
  },
}));

export { useRateStore, supportedCoins };
