// LidoStETHConversion.js

import React, { useEffect, useState } from "react";
import { executeLidoWithdraw } from './Functionview';

export default function LidoStETHConversion() {
    const [isLoading, setIsLoading] = useState(false);
    
    const handleExecuteWithdraw = async () => {
        setIsLoading(true);
        try {
            await executeLidoWithdraw();
        } catch (error) {
            console.error("Failed to execute Lido withdrawal:", error);
        }
        setIsLoading(false);
    };

    return (
        <div className="card-backgorund p-3">
            <p className="text-24 font-bold font-mont text-center">
                Convert Lido StETH to ETH
            </p>
            <div className="mt-3">
                <div className="text-center w-full mb-4">
                    <p className="text-skyblue font-bold text-xl font-Helvetica">
                    If there's insufficient ETH to execute a withdrawal request, use this function to convert sTETH to ETH and transfer it to the BCKETH contract.
                    </p>
                </div>
                <div className="p-3 text-center">
                    <button
                        onClick={handleExecuteWithdraw}
                        className="BoxGradient-buttons w-full drop-shadow-xl mt-2 hover:drop-shadow-sm font-bold"
                        disabled={isLoading}
                    >
                        Execute Withdrawal Requests
                    </button>
                </div>
            </div>
        </div>
    );
}
