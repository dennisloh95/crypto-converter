import Image from "next/image";
import React, { memo } from "react";
import { supportedCoins, useRateStore } from "../store";
import { Rate } from "../utils/types";
import shallow from "zustand/shallow";

const CurrentPrice = () => {
  const { rateData, lastUpdate } = useRateStore(
    (state) => ({
      rateData: state.data,
      lastUpdate: state.lastUpdate,
    }),
    shallow
  );

  if (!rateData) return <></>;
  return (
    <div className="p-5 rounded-lg bg-gray-800  gap-3 flex flex-col h-full">
      <h3 className="font-bold text-lg mb-3">Current Price</h3>
      {supportedCoins.map((data) => {
        return (
          <div key={data.id} className="uppercase flex ">
            <Image
              src={`/images/${data.id}.webp`}
              alt={`${data.id} icon`}
              width="25"
              height="25"
            />
            <div className="w-full flex items-center justify-between">
              <p className="ml-3">{data.symbol}</p>
              <p>${rateData[data.id as keyof Rate]["usd"]}</p>
            </div>
          </div>
        );
      })}
      <p className="text-xs text-gray-400">
        Last Updated {lastUpdate}. Currency in USD
      </p>
    </div>
  );
};

export default memo(CurrentPrice);
