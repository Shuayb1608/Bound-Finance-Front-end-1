import React, { useState } from "react";
import { Bust } from "../components/Function2";
import Swal from "sweetalert2";

export default function LiquidationTabContent() {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleonChangeInput = (e) => {
    setAmount(e.target.value);
  };

  const handleBust = async () => {
    setIsLoading(true);

      await Bust(amount);
   
    setIsLoading(false);
  };
  const LiquidCards_Data = [
    {
      id: 1,
      heading: "Buy Liquidated BETH",
      title: "Input how much BCK you want to use to buy BETH",
      buttonText: "Buy",
      onChangeInput: handleonChangeInput,
      onClick: handleBust,
    },
  ];
  return (
    <div>
      {LiquidCards_Data.map((item, index) => {
        return (
          <div key={index} className="card-backgorund p-3">
            <p className="text-24 font-bold font-mont text-center">
              {item.heading}
            </p>
            <div className=" flex flex-col gap-2 mt-3">
              <p className="text-skyblue">{item.title} :</p>
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
