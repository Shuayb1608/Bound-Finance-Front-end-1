import React from "react";

export default function BCKETHcreation() {
  return (
    <div className="mt-2 max-w-[600px] mx-auto w-full">
      <p className="text-32 font-mont font-bold text-center text-gradient">
       Step 1. | Minting BCKETH
      </p>
      <p className="mt-4 text-16 font-mont text-white-100 text-justify ">
        Bound Finance introduces a unique, wrapped version of ETH, akin to WETH, called BCKETH. BCKETH serves as the collateral for Bound Finance CDP loans and is a 1:1 redeemable version of ETH. 
        This mechanism allows the protocol to generate ETH rewards from the underlying ETH backing the BCKETH, utilizing validators and LST tokens.
      </p>
      <br />
      <p className="text-16 font-mont text-justify">
        When you deposit a certain amount of ETH, you receive an equivalent amount in BCKETH. The BCKETH smart contract retains 5% of the deposited ETH and transfers 95% to a reserve contract. 
        From there, users can direct the ETH either to our LidoVault, which yields returns via Lido Finance StETH by minting StETH, or to our own validators. This approval process takes place in the treasury DAO tab.
      </p>
      <br />
      <p className="text-16 font-mont text-justify">
      To convert your BCKETH back to ETH, initiate a withdrawal request. Upon this, your BCKETH will be burnt, and you'll receive an IOU. The BCKETH contract accumulates ETH over a span of 1 to 3 days, primarily influenced by our validators' withdrawal queue or Lido Finance's StETH rate.
      If the combined funds in the BCKETH and Reserve contracts aren't sufficient for withdrawal, use the 'sTETH to ETH' function. This function facilitates the conversion of any system-held sTETH into ETH to meet withdrawal requests. It's noteworthy that the conversion process can range from 1 to 3 days.
      To finalize your ETH withdrawal, click on the 'Execute Withdrawal' button.
      </p> 
      <br />
      <p className="text-16 font-mont text-justify">
        We employ the LidoWithdrawal contract to manage the ETH amount in the BCKETH contract to cater to any withdrawal requests, ensuring stability in the 1:1 redemption of BCKETH. 
        However, if you require ETH more rapidly, you can always exchange your BCKETH for ETH on a DEX, but bear in mind that you might pay a premium for this service due to swap fees.
      </p>
      <br />
    </div>
  );
}
