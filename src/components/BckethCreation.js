import React, { useState } from 'react'
import { joinbck } from './Functions';
import Swal from 'sweetalert2';

export default function BckethCreation() {
  const [mintAmount, setMintAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const handleMint = async () => {
    setIsLoading(true);
   
      await joinbck(mintAmount);
    
    setIsLoading(false);
  };

  return (
    
    <div>
      <div className="card-backgorund p-3">
        <p className="text-24 font-bold font-mont text-center">
          BCKETH
        </p>
        <div className="mt-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="mintBCK" className="text-16 font-medium">
              Mint BCKETH Amount:
            </label>
            <input
              type="number"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              placeholder="Amount in ETH"
              className="rounded-md text-14 bg-transparent focus:ring-2 outline-none border py-2 px-3"
            />
            <button
              id="mintBCK"
              onClick={handleMint}
              className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm"
              disabled={isLoading}
            >
              Mint
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
