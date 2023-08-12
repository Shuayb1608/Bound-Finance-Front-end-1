import React from "react";
import { DrawFunction, LockFunction } from "./Functions";

export default function CreateBCK() {
  return (
    <div className="p-3 card-backgorund rounded-lg">
      <p className="text-24 font-bold text-center">Create BCK</p>
      <div className="flex flex-col gap-2 mt-3">
        <label htmlFor="lock" className="text-16 font-medium">
          Lock BCKETH Collateral In Vault:
        </label>
        <input type="number" className="rounded-md  text-14 bg-transparent focus:ring-2 outline-none border py-2 px-3" id="wadInputlock" placeholder="Amount" />
        <button onClick={LockFunction} className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm">
          Lock BCKETH In Vault
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <label htmlFor="draw" className="text-16 font-medium">
          Create BCK:
        </label>
        <input type="number" className="rounded-md  text-14 bg-transparent focus:ring-2 outline-none border py-2 px-3" id="wadInputdraw" placeholder="Amount" />
        <button onClick={DrawFunction} className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm">
          Mint
        </button>
      </div>
    </div>
  );
}
