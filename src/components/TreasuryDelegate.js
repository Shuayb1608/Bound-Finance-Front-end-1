import React, { useState } from "react";
import { delegates } from "./Functions";
import Swal from "sweetalert2";

export default function TreasuryDelegate() {
  const [isLoading, setIsLoading] = useState(false);
  const [ID, setID] = useState(0);

  const handleDelegate = async () => {
    setIsLoading(true);
    try {
      await delegates();
      Swal.fire("Success", "Delegation successful!", "success");
    } catch (error) {
      Swal.fire("Error", "Delegation failed.", "error");
    }
    setIsLoading(false);
  };
  const handleOnChange = (e) => {
    setID(e.target.value);
  };

  const Cards_Data = [
    {
      id: 1,
      heading: "Delegate",
      title: "Delegate Governance Token To Vote",
      inputTitle: "0",
      button: "Delegate",
      onChangeInput: handleOnChange,
      onClick: handleDelegate,
    },
  ];
  return (
    <div>
      {Cards_Data.map((item, index) => {
        return (
          <div key={index} className="card-backgorund p-3">
            <p className="text-24 font-bold font-mont text-center">
              {item.heading}
            </p>
            <div className="flex flex-col gap-2 mt-3">
              <p>{item.title}:</p>
              <button
                onClick={item.onClick}
                className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm"
              >
                {item.button}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
