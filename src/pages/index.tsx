import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { BsArrowRepeat } from "react-icons/bs";
import { useRateStore, supportedCoins } from "../store";
import { Rate } from "../utils/types";
import CurrentPrice from "../components/CurrentPrice";
import ExchangeRate from "../components/ExchangeRate";
import shallow from "zustand/shallow";

const Home: NextPage = () => {
  const { data, loading, error, getRate } = useRateStore(
    (state) => ({
      data: state.data,
      loading: state.loading,
      error: state.error,
      getRate: state.getRate,
    }),
    shallow
  );
  const [date, setDate] = useState("");

  // Fix for: "Error: Text content does not match server-rendered HTML."
  // https://nextjs.org/docs/messages/react-hydration-error
  useEffect(() => {
    setDate(dayjs().format("DD/MM/YYYY dddd hh:mm A"));
  }, []);

  useEffect(() => {
    const ids = supportedCoins.map((option) => option.id).join(",");
    getRate(ids);
  }, []);

  return (
    <div className="container overflow-hidden mx-auto my-5 text-white divide-y divide-gray-300 px-5 md:px-3">
      <div className="flex flex-col justify-between items-baseline py-5 md:flex-row">
        <h1 className="text-2xl font-bold">La Coco Crypto Exchange</h1>
        <p className="text-gray-400 text-sm mt-1">{date}</p>
      </div>
      {loading ? (
        <div className="font-bold text-2xl text-gray-500 text-center py-5 text-center w-full">
          loading...
        </div>
      ) : error ? (
        <p className="font-bold text-2xl text-rose-600 text-center py-5 capitalize text-center w-full">
          {error}
        </p>
      ) : data ? (
        <div className="py-5 flex gap-3 flex-col-reverse md:flex-row">
          <div className="w-full md:w-2/6">
            <CurrentPrice />
          </div>
          <div className="w-full md:w-4/6">
            <ExchangeRate />
          </div>
        </div>
      ) : (
        <div className="font-bold text-2xl text-gray-500 text-center py-5 text-center w-full">
          Something went wrong, please try again later.
        </div>
      )}
    </div>
  );
};

export default Home;
