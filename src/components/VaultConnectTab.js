import React from "react";
import {
  CloseListFunction,
  IsMaxDebtFunction,
  ListCupsFunction,
  OpenFunction,
} from "./Functions";

export default function VaultConnectTab() {
  
  return (
    <div className="p-3 card-backgorund rounded-lg">
      <p className="text-24 font-bold font-mont text-center">Vault Information</p>
      <div className="mt-3">
        <p className="text-16 font-medium">Vault list :</p>
        <div className="mt-2 flex gap-2 w-full">
          <button
            id="listCups"
            onClick={ListCupsFunction}
            className="w-[50%] BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm"
          >
            List Vault
          </button>
          <button
            id="CupList"
            onClick={CloseListFunction}
            className="w-[50%] BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm"
          >
            Close List
          </button>
        </div>
        <div id="cupList" className="cup-list-container"></div>
      </div>
      <div className="mt-3">
        <label htmlFor="open" className="text-16 font-medium">
          Open Your Vault :
        </label>
        <button
          id=""
          onClick={OpenFunction}
          className="BoxGradient-buttons w-full drop-shadow-xl hover:drop-shadow-sm"
        >
          Open
        </button>
      </div>
      {/* <div className="flex flex-col gap-2 mt-3">
        <label htmlFor="isMaxDebt" className="text-16 font-medium">
          Maximum BCK You Can Take Out :
        </label>
        <input
          type="text"
          id="cupIdMaxDebt"
          className="
            rounded-md  text-14 bg-transparent focus:ring-2 outline-none border py-2 px-3"
          placeholder="Cup ID"
        />
        <button
          onClick={IsMaxDebtFunction}
          className="BoxGradient-buttons bg-[#262121] drop-shadow-xl hover:drop-shadow-sm"
        >
          Check
        </button>
      </div> */}
    </div>
  );
}
