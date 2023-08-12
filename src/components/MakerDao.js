import React, { useEffect, useState } from "react";
import "../styles/MakerDao.css";
import { ListCupsFunction, getCupsCreatedByAccount } from "./Functions";
import MintTabs from "./MintTabs";
import MintContent from "./MintContent";
import { useAccount, useChainId } from "wagmi";
import {
  IsMaxDebtFunction,
  WithdrawDebtView,
  WithdrawInterestView,
  IsInkFunction,
  isCupMine,
  decimalToHexWithPadding,
  orcaleUpdate
} from './Functionview.js';

export const MakerDao = () => {
  const { address } = useAccount();
  const id = useChainId();
  const [activeChain, setActiveChain] = useState("");
  const [maxBCK, setMaxBCK] = useState("N/A");
  const [debtInVault, setDebtInVault] = useState("N/A");
  const [collateralAmount, setCollateralAmount] = useState("N/A");
  const [interestEarned, setInterestEarned] = useState("N/A");
  const [cupID, setCupID] = useState('N/A');
  const [showLiquidationInfo, setShowLiquidationInfo] = useState(false);
  const [showCollateralInfo, setShowCollateralInfo] = useState(false);


  const getChainDetails = (chain) => {
    switch (chain) {
      case 11155111: return "Sapolia";
      case 5: return "Goerli";
      case 80001: return "Polygon";
      case 1: return "Mainnet";
      default: return;
    }
  };

  const fetchData = async () => {
    const cupList = await getCupsCreatedByAccount(address);

    if (cupList.length === 0) {
      return;
    }

    const cupIdInBytes32 = decimalToHexWithPadding(cupList[0]);
    const owner = await isCupMine(cupIdInBytes32);

    if (owner !== address) {
      return;
    }

    setCupID(cupIdInBytes32);
    
    const maxDebtData = await IsMaxDebtFunction(cupIdInBytes32);
    const debtData = await WithdrawDebtView(cupIdInBytes32);
    const collateralData = await IsInkFunction(cupIdInBytes32);
    const interestData = await WithdrawInterestView(cupIdInBytes32);

    setMaxBCK(maxDebtData.maxDebt || "N/A");
    setDebtInVault(debtData.debt || "N/A");
    setCollateralAmount(collateralData.collateralAmount || "N/A");
    if (interestData.interestEarned) {
      setInterestEarned(parseFloat(interestData.interestEarned).toFixed(2));
    } else {
      setInterestEarned("N/A");
    }
  };

  useEffect(() => {
    const chainDetails = getChainDetails(id);
    setActiveChain(chainDetails);

    fetchData(); // Fetch data immediately upon mount

    const fetchDataInterval = setInterval(fetchData, 50000); // Refresh every 5 minutes
    const updateOracleInterval = setInterval(orcaleUpdate, 50000); // Update oracle every 10 minutes

    return () => {
      clearInterval(fetchDataInterval);  // Cleanup interval upon unmounting
      clearInterval(updateOracleInterval); // Cleanup oracle update interval upon unmounting
    };
  }, [id, address]);

  console.log("maxBCK:", maxBCK, "debtInVault:", debtInVault);

  function getColorClass(debtInVault, maxBCK) {
    if (Number(debtInVault) > Number(maxBCK)) return 'text-red-500';
    if (Number(maxBCK) <= (Number(debtInVault) * 1.15) && Number(maxBCK) >= Number(debtInVault)) return 'text-orange-500';
    return 'text-green-500';
  }


  return (
    <>
      <div className="w-full max-w-[1449px] mx-auto px-6">
          <div className="w-fit mx-auto flex flex-col items-center justify-center gap-6 mt-10">
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <p className="text-36 text-gradient font-bold font-mont">Vault BCKETH-BCK</p>
                  <p className="text-16 font-mont text-white-100">Network : {activeChain ? activeChain : 'Connect Wallet'}</p>
              </div>
              <p className="font-mont text-13 break-normal text-purple-300">Bound Finance | Crypto-Side</p>
  
              <div className="mt-7 flex flex-row items-center justify-center gap-10 flex-wrap">
  
                  <div className="text-center mt-4">
                      <p className="font-mont text-15 text-skyblue">Maximum BCK You Can Draw</p>
                      <p className="text-gray-300 font-bold font-Helvetica text-2xl">{maxBCK ? `$${maxBCK} BCK` : 'No collateral in vault'}</p>
                  </div>
                  <div className="text-center mt-4">
          <p className="font-mont text-15 text-skyblue">BCK Debt Amount</p>
          <p className={`text-gray-300 font-bold font-Helvetica text-2xl ${getColorClass(debtInVault, maxBCK)}`}>
            {debtInVault ? `$${debtInVault} BCK` : 'No debt'}
          </p>
        </div>
                  <div className="text-center mt-4">
                      <p className="font-mont text-15 text-skyblue">Liquidation Fee</p>
                      <p className="text-gray-300 font-bold font-Helvetica text-2xl">25%</p>
                      <InfoHover content="If your vault is liquidated, a liquidation penalty is added to your vault’s total outstanding debt in BCK, which results in more collateral being sold to cover the outstanding debt. This is done to incentivize vaults owners to avoid liquidation. The size of the liquidation penalty is determined by the Liquidation Fee which is calculated based on the debt in the vault." />
                  </div>
  
                  <div className="text-center mt-4">
                      <p className="font-mont text-15 text-skyblue">Min. Collateral Ratio</p>
                      <p className="text-gray-300 font-bold font-Helvetica text-2xl">200%</p>
                      <InfoHover content="This is also called the Liquidation Ratio. If the Vault reaches below the minimum collateralization level it is considered undercollateralized and is subject to liquidation. Your collateral will then be partially auctioned off to cover outstanding debt and liquidation fee." />
                  </div>
  
                  <div className="text-center mt-4">
                      <p className="font-mont text-15 text-skyblue">Collateral Amount BETH(Wrapped Collateral BCKETH)</p>
                      <p className="text-gray-300 font-bold font-Helvetica text-2xl">{collateralAmount ? `${collateralAmount}  BETH` : 'No collateral'}</p>
                  </div>
  
                  <div className="text-center mt-4">
                      <p className="font-mont text-15 text-skyblue">Interest Amount Earned</p>
                      <p className="text-gray-300 font-bold font-Helvetica text-2xl">{interestEarned ? `${interestEarned} ETH` : 'No interest earned'}</p>
                  </div>
              </div>
          </div>
  
          <div className="mt-10 gap-10 flex flex-col justify-between lg:flex-row sm:mt-40 ">
              <MintContent />
              <div className="mt-10 md:mt-4 w-full max-w-[630px]">
                  <MintTabs />
              </div>
          </div>
      </div>
    </>
  );
  
  // The InfoHover component handles the hover behavior and presentation. It will make the code above more concise and cleaner. This should be defined outside the main component.
  function InfoHover({ content }) {
      const [showInfo, setShowInfo] = React.useState(false);
      return (
          <span className="relative">
              <p 
                  className="material-icons hover:text-gray-400 cursor-pointer" 
                  onMouseEnter={() => setShowInfo(true)}
                  onMouseLeave={() => setShowInfo(false)}
              >ⓘ</p>
              {showInfo && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-72 p-2 mt-2 text-10 bg-black text-white rounded shadow-md">
                      {content}
                  </div>
              )}
          </span>
      );
  }
}