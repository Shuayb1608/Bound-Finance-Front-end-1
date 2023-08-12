import React, { useState, useEffect } from "react";
import Liquidation from "./LiquidationsInfo";
import LiquidationTabs from "./LiquidationTabs";

import { viewdebtamount, viewPendingCollateral } from "./Functionview";


export default function LiquidationCards() {
const [amount, setAmount] = useState(0);
const [isLoading, setIsLoading] = useState(false);
const [debtAmount, setDebtAmount] = useState(0);
const [collateral, setCollateral] = useState(0);

const fetchData = async () => {
  setIsLoading(true);
  try {
      let fetchedDebtAmount = await viewdebtamount();
      let fetchedCollateral = await viewPendingCollateral();
      fetchedDebtAmount = parseFloat(fetchedDebtAmount).toFixed(2);
      fetchedCollateral = parseFloat(fetchedCollateral).toFixed(2);
      setDebtAmount(fetchedDebtAmount);
      setCollateral(fetchedCollateral);
  } catch (error) {
      console.error("Error fetching data:", error);
  }
  setIsLoading(false);
};


useEffect(() => {
  fetchData();

  const interval = setInterval(fetchData, 500000); // Every 10 minutes

  return () => clearInterval(interval); // Clear the interval when the component unmounts
}, []);

  return (
    <div>
      <div className="grid grid-cols-1 w-full max-w-[1449px] mt-[50px] mx-auto gap-5 p-4 md:grid-cols-2">
        <div className="w-full max-w-[600px] mx-auto">
          <div className="grid md:grid-cols-2 w-full gap-4">
          <div className="cards_box text-white w-full shadow-cyan-200 shadow-lg rounded-[6px] text-16 flex items-center justify-center">
              <div className="text-center w-full p-3">
                <p>Bad debt Amount In The System</p>

                <p className="text-skyblue font-bold text-18 font-bold font-Helvetica text-2xl">${debtAmount} BCK</p>

              </div>
            </div>
            <div className="cards_box text-white shadow-cyan-200 shadow-lg rounded-[6px] text-16 flex items-center justify-center">
              <div className="text-center w-[100%] p-3">
                <p>Collateral pending liquidation</p>

                <p className="text-skyblue font-bold text-18 font-bold font-Helvetica text-2xl">{collateral} BETH</p>

              </div>
            </div>
          </div>

          <div className="mt-5">
            <Liquidation />
          </div>
        </div>
        <LiquidationTabs />
      </div>
    </div>
  );
}
