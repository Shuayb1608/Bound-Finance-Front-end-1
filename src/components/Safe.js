import React from "react";
import { IsSafeFunction } from "./Functions";

export default function CheckCupSafety() {
  return (
    <div className="p-3 card-backgorund rounded-lg">
      <p className="text-24 font-bold text-center ">Is My CDP Safe From Liquidation ?</p>
      <div className="flex flex-col gap-2 mt-3">
        <button onClick={IsSafeFunction} className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm">
          Check Safety
        </button>
      </div>
    </div>
  );
}
