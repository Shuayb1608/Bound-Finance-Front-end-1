import React, { useState } from "react";
import { checkProposals } from "./Functions";

export default function TreasuryProposal() {
    const [ID, setID] = useState(0);
    const [proposal, setProposal] = useState(null);  // Store the proposal details here
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckProposal = async () => {
        setIsLoading(true);
        const retrievedProposal = await checkProposals(ID);
        setProposal(retrievedProposal);
        setIsLoading(false);
    };

    const handleOnChange = (e) => {
        setID(e.target.value);
    };

    const weiToEth = (weiValue) => {
        return weiValue / 10**18;
    };

    const getProposalDescription = (proposalType, value) => {
        const ethValue = weiToEth(value);
        switch (proposalType) {
            case "0":
                return {
                    type: "Withdrawal",
                    description: `Amount of ${ethValue} ETH to be sent to the validator DAO wallet to be made into Validators for staking`
                };
            case "1":
                return {
                    type: "VaultDeposit",
                    description: `Amount of ${ethValue} ETH to be converted into LST tokens for staking`
                };
            case "2":
                return {
                    type: "MinimumApprovalChange",
                    description: `The new percentage (${ethValue}%) of supply of Governance token needed to approve a proposal`
                };
            default:
                return { type: "Unknown", description: "Unknown proposal type" };
        }
    };

    let proposalInfo = null;
    if (proposal) {
        proposalInfo = getProposalDescription(proposal.proposalType, proposal.value);
    }

    const Cards_Data = [
        {
            id: 1,
            heading: "Check Proposal Info",
            title: "Proposal ID",
            inputTitle: "0",
            button: "Check",
            onChangeInput: handleOnChange,
            onClick: handleCheckProposal
        }
    ];

    return (
        <div>
            {Cards_Data.map((item, index) => (
                <div key={index} className="card-backgorund p-3">
                    <p className="text-24 font-bold font-mont text-center">
                        {item.heading}
                    </p>
                    <div className="flex flex-col gap-2 mt-3">
                        <p>{item.title}:</p>
                        <input
                            type="number"
                            onChange={(e) => item.onChangeInput(e)}
                            placeholder={item.inputTitle}
                            className="rounded-md text-14 bg-transparent focus:ring-2 outline-none border py-2 px-3"
                        />
                        <button
                            onClick={item.onClick}
                            className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm"
                        >
                            {item.button}
                        </button>
                    </div>
                </div>
            ))}

            {proposal && (
                <div className="mt-5 card-backgorund p-3">
                    <p><strong>Proposal Type:</strong> {proposalInfo.type}</p>
                    <p><strong>Description:</strong> {proposalInfo.description}</p>

                    {proposal.proposalType === "0" && <p><strong>To:</strong> {proposal.to}</p>}

                    <p><strong>How many Tokens have Approved:</strong> {weiToEth(proposal.approvalWeight)} BCKGOV</p>
                    <p><strong>Executed:</strong> {proposal.executed.toString()}</p>
                    <p><strong>Snapshot Block:</strong> {proposal.snapshotBlock}</p>
                </div>
            )}
        </div>
    );
}
