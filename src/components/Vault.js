import React, { useState } from "react";
import { IsInkFunction, WithdrawDebtView } from "./Functions";
import Swal from "sweetalert2";

export default function Vault() {
  const [debtView, setDebtView] = useState("");
  const [withdrawDebt, setWithdrawDebt] = useState("");
  const handleDebtClick = async (amount) => {
    const value = await WithdrawDebtView(amount);
    setWithdrawDebt(value);
  };

  return (
    <div className="p-3 card-backgorund rounded-lg ">
      <p className="text-24 font-bold text-center">Vault Information</p>
      <div className="flex flex-col mt-3 gap-1">
        <label className="text-16 font-medium">BCK Drawn From This Vault:</label>
        <input
          type="number"
          value={debtView}
          className="rounded-md text-14 bg-transparent focus:ring-2 outline-none border py-2 px-3"
          onChange={(e) => setDebtView(e.target.value)}
          placeholder="Enter the Cup Id"
        />
        <p>{`${withdrawDebt ? "Debt: " + withdrawDebt + " BCK" : ""}`}</p>
        <button
          onClick={() => {
            if (debtView === "" || debtView <= 0) {
              Swal.fire({
                icon: "warning",
                title: "Invalid input",
                text: "Please enter a valid Cup Id.",
              });
              return;
            }
            handleDebtClick(debtView);
          }}
          className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm "
        >
          Check
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <label htmlFor="isInk" className="text-16 font-medium">
          Collateral Amount (BCKETH):
        </label>
        <input
          type="text"
          id="cupIdInk"
          placeholder="Cup ID"
          className="rounded-md text-14 bg-transparent focus:ring-2 outline-none border py-2 px-3"
        />
        <button onClick={IsInkFunction} className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm">
          Check
        </button>
      </div>
    </div>
  );
}
