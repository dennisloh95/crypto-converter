import type { NextPage } from "next";
import { useEffect } from "react";
import { useRateStore, supportedCoins } from "../store";
import CurrentPrice from "../components/CurrentPrice";
import ExchangeRate from "../components/ExchangeRate";
import shallow from "zustand/shallow";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";

const Home: NextPage<InferGetStaticPropsType<typeof getServerSideProps>> = ({
  rate,
}) => {
  const { data, currentDateTime, setData } = useRateStore(
    (state) => ({
      data: state.data,
      currentDateTime: state.currentDateTime,
      setData: state.setData,
    }),
    shallow
  );

  // Fix for: "Error: Text content does not match server-rendered HTML."
  // https://nextjs.org/docs/messages/react-hydration-error
  useEffect(() => {
    setData(rate);
  }, []);

  return (
    <div className="container overflow-hidden mx-auto my-5 text-white divide-y divide-gray-300 px-5 md:px-3">
      <Head>
        <title>La Coco Crypto Exchange</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col justify-between items-baseline py-5 md:flex-row">
        <h1 className="text-2xl font-bold title">La Coco Crypto Exchange</h1>
        <p className="text-gray-400 text-sm mt-1 date">{currentDateTime}</p>
      </div>
      {data ? (
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

export async function getServerSideProps() {
  const ids = supportedCoins.map((option) => option.id).join(",");
  const data = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${"usd"}`
  ).then((res) => res.json());

  return {
    props: { rate: Object.keys(data).length ? data : null },
  };
}
