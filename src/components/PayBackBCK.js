import React from "react";
import { FreeFunction, WipeFunction } from "./Functions";

export default function PayBackBCK() {
  return (
    <div className="p-3 card-backgorund rounded-lg">
      <p className="text-24 font-bold text-center ">Pay Back BCK </p>
      <div className="flex flex-col gap-2 mt-3">
        <label htmlFor="wipe" className="text-16 font-medium">
          Pay Off BCK :
        </label>
        <input
          type="number"
          id="wadInputwipe"
          className="rounded-md  text-14 bg-transparent focus:ring-2 outline-none border py-2 px-3"
          placeholder="Amount"
        />
        <button onClick={WipeFunction} className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm">
          Burn
        </button>
      </div>
      <div className="flex flex-col mt-3 gap-2">
        <label htmlFor="free" className="text-16 font-medium">
          Remove Collateral:
        </label>
        <input
          type="number"
          id="wadInputfree"
          className="rounded-md  text-14 bg-transparent focus:ring-2 outline-none border py-2 px-3"
          placeholder="Amount"
        />
        <button onClick={FreeFunction} className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm">
          Remove
        </button>
      </div>
    </div>
  );
}
