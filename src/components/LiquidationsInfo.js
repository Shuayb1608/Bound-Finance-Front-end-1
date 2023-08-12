import React from "react";

export default function Liquidation() {
  return (
    <div className="mt-2 max-w-[600px] mx-auto w-full">
      <p className="text-32 font-mont font-bold text-center text-gradient">
        Understanding Liquidations
      </p>
      <p className="mt-4 text-16 font-mont text-white-100 text-justify ">
        Bound Finance operates on the principle of overcollateralized loans to maintain the value of our stablecoin. 
        We currently enforce a 2:1 collateral ratio between BCKETH and BCK. This means for every $2 of BCKETH, there is $1 worth of BCK stablecoin.
      </p>
      <br />
      <p className="text-16 font-mont text-justify">
        If a vault's collateral ratio falls below this threshold, it is subject to liquidation by the Liquidation bot.
        The BCKETH collateral underpinning the loan is then transferred to the Tap contract, where the collateral is sold off to restore the value of the BCK stablecoin debt.
      </p>
      <br />
      <p className="text-16 font-mont text-justify">
        When a user contributes BCKETH collateral, it is wrapped to create a new token called BETH. This approach safeguards the system in case there isn't sufficient collateral to cover bad debt—
        i.e., debt incurred from liquidated vaults. In such a situation, we increase the BETH supply and sell enough of it to cover the BCK debt.
      </p> 
      <br />
      <p className="text-16 font-mont text-justify">
        After acquiring BETH, a user can convert it back into BCKETH. While the initial BETH to BCKETH ratio is 1:1, this ratio may increase if the BETH supply needs to be augmented to cover any bad debt.
        Consequently, the amount of BCKETH a user can retrieve after converting BETH to BCKETH may decrease. This is the reason we wrap the collateral (BCKETH) into BETH: to create a mechanism for increasing supply to cover any debt in case the available collateral in the system is insufficient to cover bad debt.
      </p>
      <br />
    </div>
  );
}
