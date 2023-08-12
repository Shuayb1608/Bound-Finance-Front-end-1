import React from "react";
import { Tab, Tabs } from "./Tabs";
import LiquidationTabContent from "./LiquidationTabContent";
import LiquidationExit from "./LiquidationExit";

export default function LiquidationTabs() {
  return (
    <div className="w-full max-w-[567px] mx-auto">
      <Tabs>
        <Tab label="Liquidations">
          <LiquidationTabContent />
        </Tab>
        <Tab label="Exit BETH for BCKETH">
          <LiquidationExit />
        </Tab>
      </Tabs>
    </div>
  );
}
