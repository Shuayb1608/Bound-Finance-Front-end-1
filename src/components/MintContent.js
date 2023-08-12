import React from "react";

export default function MintContent() {
  return (
    <div className="mt-2 max-w-[600px] mx-auto w-full">
      <p className="text-32 font-mont font-bold text-center text-gradient">
        Step 2. | Mint BCK
      </p>

      <ol className="list-decimal pl-5 mt-4 text-16 font-mont text-white-100 text-justify space-y-4">
        <li>Firstly mint some BCKETH from the BCKETH tab, this is the collateral used to mint BCK stablecoins.</li>

        <li>Then you can lock BCKETH collateral using the Lock Function on the CDP page. The BCKETH is wrapped to BETH. We wrap BCKETH in order for the liquidation mechanics to work</li>

        <li>Now, you're ready to mint BCK. Ensure the amount you mint is below the max debt corresponding to the collateral you've pledged. This is vital due to the minimum collateralization ratio. Falling below this ratio exposes you to liquidation risks, with a penalty on the pledged collateral.</li>

        <li>You can reduce your BCK position by invoking the "Pay Back BCK" function. You can also retrieve some BCKETH from your position. However, this is capped by the minimum collateralization ratio, assuming you still hold cryptocurrency.</li>

        <li>Monitor your risk of liquidation through the Safe tab function.</li>

        <li>Post-loan, you won't incur interest. However, periodically, you'll earn ETH based on the pledged collateral amount. This interest can be withdrawn via the Collateral Interest tab.</li>

        <li>Upon securing a fully overcollateralized position of BCK stablecoins, maximize yield by staking them in the BCK savings account. With BCK, the world is your oyster—use it as you would any other stablecoin!</li>
      </ol>

    </div>
  );
}
