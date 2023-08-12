import React, { useState } from "react";
import {
  WithdrawInterestFunction,
  WithdrawInterestView,
} from "./Functions";

export default function WithDrawInterest() {
  const [interest, setInterest] = useState("");
  const InterestAmount = async () => {
    let value = await WithdrawInterestView();
    console.log(value);
    setInterest(value);
  };

  return (
    <div className="p-3 card-backgorund rounded-lg">
      <p className="text-24 font-bold text-center">
        Withdraw Interest Earnt On Collateral
      </p>
      <div className="flex flex-col gap-2 mt-3">      
        <button
          onClick={WithdrawInterestFunction}
          className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm"
        >
          Withdraw Reward
        </button>
      </div>
      {/* <div className="flex flex-col gap-1 mt-3">
        <label htmlFor="withdrawInterestView" className="text-16 font-medium">Interest Amount Earnt:</label>
        <input
          type="text"
          id="cupIdInputwithdrawInterestView"
          placeholder="Cup ID"
          className="rounded-md  text-14 bg-transparent focus:ring-2 outline-none border py-2 px-3"
        />
        <p>{`${interest ? "You Earned Eth:" + interest + " interest" : ""}`}</p>
        <button
          onClick={InterestAmount}
          className="BoxGradient-buttons"
        >
          Amount
        </button>
      </div> */}
    </div>
  );
}
