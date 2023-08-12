import React, { useState } from "react";
import { exitSKR } from "./Function2";
import Swal from "sweetalert2";

export default function LiquidationExit() {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleonChangeInput = (e) => {
    setAmount(e.target.value);
  };
  const handleExitSKR = async () => {
    setIsLoading(true);
  
      await exitSKR(amount);
 
    setIsLoading(false);
  };

  const LiquidCards_Data = [
    {
      id: 1,
      heading: "Exit SKR",
      title: "Amount of SKR you want to convert back to BCKETH",
      buttonText: "Exit SKR",
      onChangeInput: handleonChangeInput,
      onClick: handleExitSKR,
    },
  ];
  return (
    <div>
      {" "}
      {LiquidCards_Data.map((item, index) => {
        return (
          <div key={index} className="card-backgorund p-3">
            <p className="text-24 font-bold font-mont text-center">
              {item.heading}
            </p>
            <div className=" flex flex-col gap-2 mt-3">
              <p>{item.title} :</p>
              <input
                type="number"
                onChange={(e) => item.onChangeInput(e)}
                placeholder={item.inputTitle}
                className="rounded-md text-14 bg-transparent focus:ring-2 outline-none border py-2 px-3"
              />
              <button
                onClick={item.onClick}
                className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm"
              >
                {item.buttonText}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
