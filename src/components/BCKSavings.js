import React from "react";

export default function MintContent() {
  return (
    <div className="mt-2 max-w-[600px] mx-auto w-full">
      <p className="text-32 font-mont font-bold text-center text-gradient">
       Step 3. | BCK Savings Account
      </p>
      <p className="mt-4 text-16 font-mont text-white-100 text-justify ">
       The BCK Savings Account feature enables you to earn USDC interest on your minted BCK.
      </p>
      <br />
      <p className="text-16 font-mont text-justify">
       To start earning, simply stake your BCK and let the system take care of the rest. 
       The protocol distributes USDC to all BCK Savings Account depositors on a daily basis.
       You have the freedom to unstake your BCK at any moment as there is no locking period imposed.
      </p>
      <br />
      <p className="text-16 font-mont text-justify">
       You can check how much USDC you've accrued by referring to the number listed under the "USDC Interest Earned" box.
       Furthermore, the amount of BCK you have deposited can be found under the "Balance Of BCK in BCK Savings Account" card.
      </p> 
      <br />
      <p className="text-16 font-mont text-justify">
        To claim your earned USDC rewards, simply click on the "Withdraw Rewards" button.
      </p>
      <br />
    </div>
  );
}
