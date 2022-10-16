import React, { ChangeEvent, memo, useEffect, useState } from "react";
import { useRateStore, supportedCoins } from "../store";
import shallow from "zustand/shallow";
import { BsArrowRepeat } from "react-icons/bs";
import { Rate } from "../utils/types";

const ExchangeRate = () => {
  const { rateData } = useRateStore(
    (state) => ({
      rateData: state.data,
    }),
    shallow
  );

  const [coin, setCoin] = useState({
    base: "bitcoin",
    currency: "ethereum",
  });

  const [amounts, setAmounts] = useState<{
    baseAmounts: number | string;
    currencyAmounts: number | string;
  }>({
    baseAmounts: 1,
    currencyAmounts: 0,
  });

  const [rate, setRate] = useState(0);

  useEffect(() => {
    calculateExchangeRate();
  }, [rateData, coin]);

  const currencyOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCoin({ ...coin, [name]: value });
  };

  const amountsOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!value) {
      setAmounts({
        baseAmounts: value,
        currencyAmounts: value,
      });
      return;
    }
    if (name === "baseAmounts") {
      setAmounts({
        [name]: parseFloat(value),
        currencyAmounts: parseFloat(value) * rate,
      });
    }
    if (name === "currencyAmounts") {
      setAmounts({
        [name]: parseFloat(value),
        baseAmounts: parseFloat(value) / rate,
      });
    }
  };

  const handleSwap = () => {
    setCoin((prev) => ({
      base: prev.currency,
      currency: prev.base,
    }));
  };

  const calculateExchangeRate = () => {
    if (!rateData) return;
    const rateAmount =
      rateData[coin.base as keyof Rate]["usd"] /
      rateData[coin.currency as keyof Rate]["usd"];
    setRate(rateAmount);
    const currencyAmounts =
      parseFloat(amounts.baseAmounts.toString()) * rateAmount;
    setAmounts({ ...amounts, currencyAmounts });
  };

  return (
    <div className="p-5 rounded-lg bg-gray-800 h-full">
      <h3 className="font-bold text-lg mb-3">Exchange Rate</h3>
      <div className="flex flex-col items-center lg:items-end lg:flex-row">
        <div className="flex flex-col w-full">
          <p className="font-bold text-gray-500 mb-2">Amount</p>
          <div className="flex bg-gray-600 p-2 rounded">
            <input
              name="baseAmounts"
              className="p-1 bg-transparent flex-1"
              type="number"
              step="1"
              min="0"
              value={amounts.baseAmounts}
              onChange={amountsOnChange}
            />
            <select
              name="base"
              className="w-20 bg-transparent"
              onChange={currencyOnChange}
              value={coin.base}
            >
              {supportedCoins.map((option) => (
                <option
                  key={option.id}
                  value={option.id}
                  disabled={option.id === coin.currency}
                >
                  {option.symbol.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="bg-violet-700 p-3 text-xl rounded-full mx-3 mt-2 lg:my-0"
          id="swap-btn"
          onClick={handleSwap}
        >
          <BsArrowRepeat />
        </button>
        <div className="flex flex-col w-full">
          <p className="font-bold text-gray-500 mb-2">Equivalent</p>
          <div className="flex bg-gray-600 p-2 rounded ">
            <input
              className="p-1 bg-transparent flex-1"
              type="number"
              step="1"
              min="0"
              name="currencyAmounts"
              value={amounts.currencyAmounts}
              onChange={amountsOnChange}
            />
            <select
              name="currency"
              className="w-20 bg-transparent"
              onChange={currencyOnChange}
              value={coin.currency}
            >
              {supportedCoins.map((option) => (
                <option
                  key={option.id}
                  value={option.id}
                  className="uppercase"
                  disabled={option.id === coin.base}
                >
                  {option.symbol.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="capitalize text-gray-400 text-sm mt-2">
        {rate && `1 ${coin.base} = ${rate} ${coin.currency}`}
      </div>
    </div>
  );
};

export default memo(ExchangeRate);
