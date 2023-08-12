import React, { useState, useEffect } from "react";
import { getLatestProposalId, getBalances } from "./Functionview";  // import your function
import { Tab, Tabs } from "./Tabs";
import TreasuryApproveChange from "./TreasuryApproveChange";
import TreasuryDelegate from "./TreasuryDelegate";
import Reserve from "./TreasuryDAOInfo";
import TreasuryProposal from "./TreasuryProposal";

export default function TreasuryTabs() {
  const [latestProposalId, setLatestProposalId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [balances, setBalances] = useState({ stETH: "0", ETH: "0" });
  const [balanceErrorMessage, setBalanceErrorMessage] = useState(null);

  useEffect(() => {
    async function fetchLatestProposalId() {
      try {
        const id = await getLatestProposalId();
        setLatestProposalId(id);
      } catch (error) {
        console.error("Error fetching latest proposal ID:", error);
        setErrorMessage(error.message);
      }
    }

    fetchLatestProposalId();

    const interval = setInterval(fetchLatestProposalId, 1 * 30 * 1000);

    return () => clearInterval(interval);  // Cleanup for this useEffect
  }, []);

  useEffect(() => {
    async function fetchBalances() {
      try {
        const fetchedBalances = await getBalances();
        setBalances(fetchedBalances);
      } catch (error) {
        console.error("Error fetching balances:", error);
        setBalanceErrorMessage(error.message);
      }
    }

    fetchBalances();

    const intervalForBalances = setInterval(fetchBalances, 7200000);

    return () => clearInterval(intervalForBalances);  // Cleanup for this useEffect
  }, []);


  return (
    <div className="w-full max-w-[1449px] p-6 mt-[50px] mx-auto gap-5 grid grid-cols-1 lg:grid-cols-2">
      <div>
        <div className="cards_box text-white shadow-cyan-200 shadow-lg rounded-[6px] text-16 h-[150px] flex items-center justify-center">
          <div className="text-center">
            <p>Latest Proposal ID that has been created:</p>
            <p className="text-skyblue font-bold font-Helvetica text-2xl">
              {latestProposalId !== null ? `${latestProposalId} ID` 
              : errorMessage ? errorMessage
              : "Loading..."}
           </p>
          </div>
        </div>
        <div className="mt-8">
          <Reserve />
        </div>
      </div>
      <div className="w-full max-w-[567px] mx-auto">
        <Tabs>
          <Tab label="Approve Changes">
            <TreasuryApproveChange />
          </Tab>
          <Tab label="Delegate">
            <TreasuryDelegate />
          </Tab>
          <Tab label="Check Proposal ID Info">
            <TreasuryProposal />
          </Tab>
        </Tabs>
        <div className="w-full max-w-[600px] mt-[50px] mb-[25px]">
          <div className="cards_box text-white w-full shadow-cyan-200 shadow-lg rounded-[6px] text-16 py-8 px-2">
            <div className="text-center w-full">
              <p>Balance Of Staking LidoVault sTETH & ETH</p>
              
              <p className="text-skyblue font-bold text-2xl font-Helvetica">
                {balanceErrorMessage 
                ? balanceErrorMessage 
                : `${parseFloat(balances.stETH).toFixed(2)} sTETH & ${parseFloat(balances.ETH).toFixed(2)} ETH`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}