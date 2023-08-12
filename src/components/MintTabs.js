import React from "react";
import { Tabs, Tab } from "./Tabs";
import VaultConnectTab from "./VaultConnectTab";
import CreateBCK from "./CreateBCK";
import PayBackBCK from "./PayBackBCK";
import WithDrawInterest from "./WithDrawInterest";
import Vault from "./Vault";
import Safe from "./Safe";

const App = () => {
  return (
    <div className="w-full lg:max-w-[100%]">
      <Tabs>
        <Tab label="Create BCK">
          <CreateBCK />
        </Tab>
        <Tab label="Payback BCK">
          <PayBackBCK />
        </Tab>
        <Tab label="Safe">
          <Safe />
        </Tab>
        <Tab label="Collateral Interest">
          <WithDrawInterest />
        </Tab>
      </Tabs>
    </div>
  );
};

export default App;
