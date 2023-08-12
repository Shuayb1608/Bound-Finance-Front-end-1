import React from "react";

export default function Reserve() {
  return (
    <div className="mt-2 max-w-[600px] mx-auto w-full">
      <p className="text-32 font-mont font-bold text-center text-gradient">
        Reserve Treasury DAO 
      </p>
      <p className="mt-4 text-16 font-mont text-white-100 text-justify ">
        When you generate BCKETH, 95% of the ETH backing BCKETH is transferred to the Reserve.sol contract.
        Bound Finance users have the authority to decide where the ETH should be deployed to generate yield. 
        This decision-making process is facilitated by delegating your BCKGov tokens and then voting on the proposal put forth by the core team concerning the allocation of ETH.
      </p>
      <br />
      <p className="text-16 font-mont text-justify">
        The ETH can either be staked on Lido or through our own validators. Opting for our validators can yield a higher return, thus enabling users to earn more interest. 
        However, the process of onboarding validators can sometimes create bottlenecks in the system. 
        To address this, we have adopted a dual-pronged approach where we initially onboard a portion of the ETH into Lido to instantly generate yield at a slightly lower rate.
      </p>
      <br />
      <p className="text-16 font-mont text-justify">
        Both options will be proposed for incoming ETH, and they can only be executed if a sufficient number of BCKGov holders approve the ETH delegation. 
        To mitigate any potential for malicious voting, a BCKGov holder must delegate their tokens to vote prior to proposal creation. This mechanism prevents one person from voting from multiple wallets using the same tokens.
      </p> 
      <br />
      <p className="text-16 font-mont text-justify">
        Users can verify the safety of their Collateralized Debt Position (CDP) from liquidation by calling the "Check Safety" function with their Cup ID.
        If they are safe from liquidation, the function will return 'true'. If they are at risk of liquidation, it will return 'false'.
        Once there are sufficient approvals, the core team will execute the proposal.
      </p>
      <br />
      <p className="text-16 font-mont text-justify">
        Users can examine the proposal's description and the proposed destination of the ETH by checking the proposal ID using the "Check Proposal" function.
      </p>
      <br />
    </div>
  );
}
