import React, { useEffect, useState } from "react";
import { getCombinedETHBalance, getWithdrawalRequest } from "./Functionview";
import { Tabs, Tab } from "./Tabs";
import BckethCreation from "./BckethCreation";
import BckethReqWithdrawal from "./BckethReqWithdrawal";
import BCKETHcreation from "./BCKETHcreationinfo";
import LidoStETHConversion from './LidoStETHConversion';

const BCKETHTabs = () => {
    const [combinedBalance, setCombinedBalance] = useState("Loading...");
    const [withdrawalRequest, setWithdrawalRequest] = useState(null);

    useEffect(() => {
      const fetchBalance = async () => {
        try {
          let balance = await getCombinedETHBalance();
          balance = parseFloat(balance).toFixed(4);
          setCombinedBalance(balance);
        } catch (error) {
          console.error("Failed to fetch combined ETH balance:", error);
          setCombinedBalance("Error fetching balance");
        }
      };

      const fetchWithdrawalRequest = async () => {
        try {
          const request = await getWithdrawalRequest();
          setWithdrawalRequest(request);
        } catch (error) {
          console.error("Failed to fetch withdrawal request:", error);
          setWithdrawalRequest({ error: true });
        }
      };
  
      fetchBalance();
      fetchWithdrawalRequest();

      const intervalId = setInterval(fetchBalance, 10000); // 10 seconds
  
      return () => clearInterval(intervalId);
    }, []);

    const wadToPrimaryUnit = (wad) => {
        return parseFloat(wad) / (10 ** 18);
    }

    return (
      <div className="w-full max-w-[1449px] p-6 mt-[50px] mx-auto gap-5 grid grid-cols-1 lg:grid-cols-2">
          <div>
              <BCKETHcreation />
          </div>
          <div className="w-full max-w-[567px] mx-auto">

              {/* Display Withdrawal Request */}
              <div className="w-full max-w-[600px] mt-[30px] mb-[25px]">
                  <div className="cards_box text-white w-full shadow-cyan-200 shadow-lg rounded-[6px] text-16 py-8 px-2">
                      <div className="text-center w-full">
                          <p>Requested Withdrawable Funds</p>
                          <p className="text-skyblue font-bold text-2xl font-Helvetica">
                              {withdrawalRequest 
                                ? `${wadToPrimaryUnit(withdrawalRequest.amount).toFixed(2)} ETH`
                                : "Loading..."}
                          </p>
                      </div>
                  </div>
              </div>

              <Tabs>
                  <Tab label="Create BCKETH">
                      <BckethCreation />
                  </Tab>
                  <Tab label="Withdraw BCKETH">
                      <BckethReqWithdrawal />
                  </Tab>
                  <Tab label="sTETH to ETH">
                      <LidoStETHConversion />
                  </Tab>
              </Tabs>

              <div className="w-full max-w-[600px] mt-[50px] mb-[25px]">
                  <div className="cards_box text-white w-full shadow-cyan-200 shadow-lg rounded-[6px] text-16 py-8 px-2">
                      <div className="text-center w-full">
                          <p>Balance Of Reserve + BCKETH Contract</p>
                          <p className="text-skyblue font-bold text-2xl font-Helvetica">{combinedBalance} ETH</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default BCKETHTabs;
