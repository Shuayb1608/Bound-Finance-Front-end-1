import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { executeWithdrawal, requestWithdrawal } from './Functions';

export default function BckethReqWithdrawal() {
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [isLoading,setIsLoading] = useState(false)

  const handleWithdrawalRequest = async () => {
    setIsLoading(true);
   
      await requestWithdrawal(withdrawAmount);
    
    setIsLoading(false);
  };
  const handleWithdrawalExecution = async () => {
    setIsLoading(true);
    
      await executeWithdrawal();
     
   
    setIsLoading(false);
  };

  return (
    <div>
      <div className="card-backgorund p-3">
        <p className="text-24 font-bold font-mont text-center">Request Withdrawal</p>
        <div className="mt-3">
          <div className="flex flex-col gap-2">
            <div className="text-center w-full mb-4">
                    <p className="text-skyblue font-bold text-xl font-Helvetica">
                    Withdrawals from validators and Lido's sTETH typically take around ~1 to 3 days.
                    </p>
                </div>
                <label htmlFor="withdrawBCK" className="text-16 font-medium">BCKETH Withdraw Request Input:</label>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Amount in BCKETH"
              className="rounded-md text-14 bg-transparent focus:ring-2 outline-none border py-2 px-3"
            />
            <button
              id="withdrawBCK"
              onClick={handleWithdrawalRequest}
              className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm"

              disabled={isLoading}
            >
              Request Withdrawal
            </button>
            <div className="flex flex-col gap-1 mt-3">
              <label htmlFor="withdrawBCK" className="text-16 font-medium">Withdraw BCKETH:</label>
              <button
                id="executeWithdrawal"
                onClick={handleWithdrawalExecution}
                className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm"
                disabled={isLoading}
              >
                Execute Withdrawal
              </button>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
