
import React, { useState, useEffect } from "react";

import {
  getWithdrawableDividends,
  stakeTokens,
  withdrawRewards,
  unstakeTokens,
  depositUSDC,
  balanceofEarnBCK,
} from "../components/Function2";

import {
  getWithdrawableInterest,
  getDepositedBCKAmount
 
} from './Functionview';

import BCKEARN from "./BCKSavings";

export default function StackingCards() {
  const [dividends, setDividends] = useState("");
  const [balance, setbalance] = useState("");
  const [stakeResult, setStakeResult] = useState("");
  const [rewardResult, setRewardResult] = useState("");
  const [unstakeResult, setUnstakeResult] = useState("");
  const [depositResult, setDepositResult] = useState("");
  const [distributeResult, setDistributeResult] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [withdrawableInterest, setWithdrawableInterest] = useState(0);
const [depositedBCK, setDepositedBCK] = useState(0);


  const handleStakeTokens = async () => {
    let result = await stakeTokens(stakeAmount);
    setStakeResult(result);
  };

  const handleWithdrawRewards = async () => {
    let result = await withdrawRewards();
    setRewardResult(result);
  };

  const handleUnstakeTokens = async () => {
    let result = await unstakeTokens(unstakeAmount);
    setUnstakeResult(result);
  };

  const handleDividends = async () => {
    let result = await getWithdrawableDividends();
    setDividends(result);
  };

  const handleBalance = async () => {
    let result = await balanceofEarnBCK();
    setbalance(result);
  };

  const handleDepositUSDC = async () => {
    let amount = document.getElementById("depositUSDCInput").value;
    // call the deposit function from your Utils here
    let result = await depositUSDC(amount);
    setDepositResult(result);
  };

  const StackingToken_Data = [
    {
      id: 1,
      heading: "BCK Savings Account",
      title: "Stake BCK",
      button: "Stake",
      title2: "Unstake BCK",
      button2: "Unstake",
      onClick2: handleUnstakeTokens,
      title3: "Withdraw USDC Rewards",
      button3: "Withdraw Rewards",
      onClick1: handleWithdrawRewards,
      onClick3: handleStakeTokens,
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        let interest = await getWithdrawableInterest();
        interest = parseFloat(interest).toFixed(2);
        setWithdrawableInterest(interest);
        
        let bckAmount = await getDepositedBCKAmount();
        bckAmount = parseFloat(bckAmount);
        setDepositedBCK(bckAmount);
      } catch (error) {
        console.error("Error fetching staking data:", error);
      }
    }
    
    fetchData(); // Fetch data immediately when component mounts
    
    const interval = setInterval(fetchData, 50000); // Fetch data every 5 minutes
    
    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);
  

  return (
    <div className="grid grid-cols-1 w-full max-w-[1449px] mt-[50px] mx-auto gap-5 p-4 md:grid-cols-2">
      <div className="w-full max-w-[600px] mx-auto">
        <div className="grid md:grid-cols-2 w-full gap-4">
          <div className="cards_box text-white w-full shadow-cyan-200 shadow-lg rounded-[6px] text-16 py-8 px-2">
            <div className="text-center w-full">
              <p>BCK Savings Account Balance</p>

              <p className="text-skyblue font-bold text-2xl font-bold font-Helvetica">${depositedBCK} BCK</p>
            </div>
          </div>
          <div className="cards_box text-white w-full shadow-cyan-200 shadow-lg rounded-[6px] text-16 py-8 px-2">
            <div className="text-center w-full">
              <p>USDC Interest Earnt</p>

              <p className="text-skyblue font-bold text-2xl font-bold font-Helvetica">${withdrawableInterest}</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <BCKEARN />
        </div>
      </div>
      <div className="w-full max-w-[567px] mx-auto">
        {StackingToken_Data.map((item, index) => {
          return (
            <div
              key={index}
              className="card-backgorund p-3 w-full flex flex-col gap-3"
            >
              <p className="text-24 font-bold font-mont text-center">
                {item.heading}
              </p>
              <div className="w-full mt-3 flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <p className="text-16 font-medium ">{item.title} :</p>
                  <input
                    type="number"
                    onChange={e => setStakeAmount(e.target.value)}
                    className="rounded-md w-full  text-14 bg-transparent focus:ring-2 outline-none border py-2 px-3"
                  />
                  <button
                    onClick={item.onClick3}
                    className="BoxGradient-buttons w-full mt-2 drop-shadow-xl hover:drop-shadow-sm"
                  >
                    {item.button}
                  </button>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-16 font-medium ">{item.title2} :</p>
                  <input
                    type="number"
                    onChange={e => setUnstakeAmount(e.target.value)}
                    className="rounded-md w-full  text-14 bg-transparent focus:ring-2 outline-none border py-2 px-3"
                  />
                  <button
                    onClick={item.onClick2}
                    className="BoxGradient-buttons w-full mt-2 drop-shadow-xl hover:drop-shadow-sm"
                  >
                    {item.button2}
                  </button>
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  <p className="text-16 font-medium ">{item.title3} :</p>
                  <button
                    onClick={item.onClick1}
                    className="BoxGradient-buttons w-full mt-2 drop-shadow-xl hover:drop-shadow-sm"
                  >
                    {item.button3}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
