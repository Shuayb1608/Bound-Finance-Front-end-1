
import { SAI_TUB_ADDRESS, Lido, BCK_ADDRESS, SKR_ADDRESS, SAI_ADDRESS, STAKING_ADDRESS, USDC_ADDRESS, TAP_ADDRESS, Reserve_address,  LidoStaking, orcale } from "../contract/index";
const bigInt = require("big-integer");
const Web3 = require("web3");
const { default: Swal } = require("sweetalert2");
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
// import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider);
const BckETH = require('../contract/bckEth.json')
const SaiTUB = require("../contract/saiTub.json");
const staking = require('../contract/staking.json')
const tap = require('../contract/Tap.json');
const reserve = require('../contract/Reserve.json');
const lido = require('../contract/LidoWithdrawal.json');
const lidostaking = require('../contract/LidoStaking.json');
const Oracle = require('../contract/Orcale.json');

const contractAddress = SAI_TUB_ADDRESS; //SAITUB
const bckaddress = BCK_ADDRESS;    // GEM
const SkrAdddress = SKR_ADDRESS   // PETH 
const saiAddress = SAI_ADDRESS;    // DAI 
const stakingaddress = STAKING_ADDRESS;
const USDCaddress = USDC_ADDRESS;
const tapaddress = TAP_ADDRESS;
const reserveaddress = Reserve_address;
const Lidow = Lido;
const Lidostaking = LidoStaking;


export async function abitap() {
    const response = await tap.abi
    return response;
}

export async function getAccount() {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0];
}

async function getTapContract() {
    // await connect();
    const abi7 = await abitap()
    const contract = new web3.eth.Contract(abi7, tapaddress);
    return contract;
}

function weiToEther(weiValue) {
    return web3.utils.fromWei(weiValue.toString(), 'ether');
}

export async function viewdebtamount() {
    const tap = await getTapContract();
    let debtamount = await tap.methods.woe().call();
    let debtamountinEthers = weiToEther(debtamount);
    return debtamountinEthers;
}

export async function viewPendingCollateral() {
    const tap = await getTapContract();
    let collateral = await tap.methods.fog().call();
    let collateralInEthers = weiToEther(collateral);
    return collateralInEthers;
}


//----------------------------------------------------------------------------------------------------

export async function reserveabi() {
    const response = await reserve.abi;
    return response;
}

export async function BCKETHabi() {
    const response = await BckETH.abi;
    return response;
}

export async function Lidoabi() {
    const response = await lido.abi;
    return response;
}

async function reserveContract() {
    const abi6 = await reserveabi()
    const tokenContract = new web3.eth.Contract(abi6, reserveaddress);
    return tokenContract;
}

async function BCKETHContract() {
    const abi = await BCKETHabi()
    const tokenContract = new web3.eth.Contract(abi, bckaddress);
    return tokenContract;
}

async function LidoWithdrawContract() {
    const abi = await Lidoabi()
    const tokenContract = new web3.eth.Contract(abi, Lido);
    return tokenContract;
}

export async function getLatestProposalId() {
    const reserve = await reserveContract();
    const proposalCount = await reserve.methods.proposalCount().call();
    
    // If no proposal has been made or there's some unexpected behavior, return 0
    if(proposalCount == 0) {
        throw new Error("No proposal has been made.");
    }

    // Otherwise, return the latest proposal ID
    return proposalCount - 1;
}

export async function getCombinedETHBalance() {


    // Get ETH balances for each contract
    const reserveBalanceWei = await web3.eth.getBalance(reserveaddress); // gets the ETH balance of the reserve contract
    const bckETHBalanceWei = await web3.eth.getBalance(bckaddress); // gets the ETH balance of the BckETH contract

    // Sum the balances in Wei
    const combinedBalanceWei = Number(reserveBalanceWei) + Number(bckETHBalanceWei);

    // Convert combined balance from Wei to Ether for a human-readable format
    const combinedBalanceEth = web3.utils.fromWei(combinedBalanceWei.toString(), 'ether');

    return combinedBalanceEth;  // This will be the combined balance in Ether
}


// Utility function to extract revert reason from error message
function extractRevertReason(error) {
    const revertReasonMatch = error.message.match(/execution reverted: (.+)/);
    return revertReasonMatch ? revertReasonMatch[1] : null;
}

export async function executeLidoWithdraw() {
    try {
        const accounts = await getAccount();
        const lidoWithdrawContract = await LidoWithdrawContract();

        Swal.fire({
            title: 'Executing Withdraw',
            text: 'Please wait while the sTETH to ETH process is being executed.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });

        console.log(accounts, "the address I am calling for lido withdrawal")

        // Simulate the transaction using call() first to catch any errors
        try {
            await lidoWithdrawContract.methods.executeWithdraw().call({ from: accounts });
        } catch (simulationError) {
            console.error('Simulation error:', simulationError);
            const revertReason = extractRevertReason(simulationError);
            if (revertReason) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: revertReason,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong with the withdrawal simulation!',
                });
            }
            return;
        }

        // If simulation succeeds, proceed with sending the transaction
        const transactionReceipt = await lidoWithdrawContract.methods.executeWithdraw().send({ from: accounts });

        Swal.fire({
            icon: 'success',
            title: 'Withdrawal request sTETH to ETH Executed',
            text: 'Withdrawal request Lido sTETH to ETH has been made and is being sent to BCKETH Contract.',
        });

        return transactionReceipt;

    } catch (error) {
        console.error('Error executing Lido withdrawal:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An unexpected error occurred. Please try again later.',
        });
    }
}

export async function getWithdrawalRequest() {
    const bck = await BCKETHContract();
    const account = await getAccount();

    try {
        const result = await bck.methods.withdrawalRequests(account).call();
        return {
            amount: result.amount,
            completed: result.completed
        };
    } catch (error) {
        console.error("Error fetching withdrawal request:", error);
        throw error;
    }
}

//------------------------------------------------------------------------------------------------------


export async function stakingabi() {
    const response = await staking.abi;
    return response;
}

async function stakingContract() {
    // await connect();
    const abi5 = await stakingabi()
    const tokenContract = new web3.eth.Contract(abi5, stakingaddress);
    return tokenContract;
}

// Get the amount of interest a user has earned that can be withdrawn
export async function getWithdrawableInterest() {
    const userAddress = await getAccount();
    const staking = await stakingContract();
    let withdrawableinterest = await staking.methods.interestOf(userAddress).call();
    return await weiToEther(withdrawableinterest);
}

// Get the amount of BCK tokens a user has deposited into the staking contract
export async function getDepositedBCKAmount() {
    const userAddress = await getAccount();
    const staking = await stakingContract();
    let balancesofBCKsavings = await staking.methods.balances(userAddress).call();
    return await weiToEther(balancesofBCKsavings);
}

//----------------------------------------------------------------------------------------------------------

export async function lidostakingabi() {
    const response = await lidostaking.abi;
    return response;
}

async function getLidoStakingContract() {
    // await connect();
    const abi = await  lidostakingabi()
    const contract = new web3.eth.Contract(abi, LidoStaking);
    return contract;
}


export async function getBalances() {
    const lidoStakingContract = await getLidoStakingContract();
    
    // 1. Get the stETH balance using the seeBalance function
    const stETHBalance = await lidoStakingContract.methods.seeBalance(LidoStaking).call();
    
    // 2. Get the ETH balance using Web3.js
    const ethBalanceInWei = await web3.eth.getBalance(LidoStaking);
    
    
    // Convert Wei to ETH using Web3.js utilities for a more readable balance
    const ethBalance = web3.utils.fromWei(ethBalanceInWei, 'ether');
    const stETHBalanceinETH = web3.utils.fromWei(stETHBalance, 'ether');

    return {
        stETH: stETHBalanceinETH,
        ETH: ethBalance
    };
}


//----------------------------------------------------------------------------------------------------------
export async function tubabi() {
    const response = await SaiTUB.abi;
    return response;
}

export async function tubContract() {
    // await connect();
    const abi = await tubabi();
    const contract = new web3.eth.Contract(abi, contractAddress);
    contract.options.address = contractAddress;
    return contract;
}

export function decimalToHexWithPadding(decimalValue) {
    const hexValue = decimalValue.toString(16); 
    const paddedHexValue = web3.utils.padLeft(hexValue, 64); 
    return '0x' + paddedHexValue; 
}

export async function isCupMine(cupID){
    const contract = await tubContract();
    const accounts = await web3.eth.getAccounts();
   let owner = await contract.methods.lad(cupID).call()
   return owner;

}


export const IsMaxDebtFunction = async (cupIdInBytes32) => {
    try {
        const contract = await tubContract();
        
        
        const result = await contract.methods.ink(cupIdInBytes32).call();

        // if(result == 0) {
        //     return { error: 'No debt can be taken into account because there is no collateral.' };
        // }

        const resultinEtherAmount = result * 10 ** -18;
        const mat = await contract.methods.mat().call();
        const price = await contract.methods.tag().call();
        const matAdjusted = mat * 10 ** -27;
        const priceadjusted = price * 10 ** -27;
        const MaxDebt = resultinEtherAmount * priceadjusted / matAdjusted;
        const MaxDebtRounded = MaxDebt.toFixed(2);

        return { maxDebt: MaxDebtRounded };
    } catch (error) {
        console.error(error);
        return { error: 'An error occurred while checking the cup safety.' };
    }
}


async function getUserDebt(cupId) { //Debt Amount In Vault:
    try {
        const contract = await tubContract();
        const functionSignature = web3.eth.abi.encodeFunctionSignature("getUserDebt(bytes32)");
        const encodedCupId = web3.eth.abi.encodeParameter("bytes32", cupId);
        const data = functionSignature + encodedCupId.slice(2);
        const interest = await web3.eth.call({ to: contract.options.address, data: data });

        // Decode the returned value
        const decodedInterest = web3.eth.abi.decodeParameter("uint256", interest);

        return decodedInterest;
    } catch (error) {
        console.error("Error getting user interest:", error);
    }
}

export const WithdrawDebtView = async (cupIdInBytes32) => {
  
    const interest = await getUserDebt(cupIdInBytes32);
    const interestInEther = web3.utils.fromWei(interest.toString(), 'ether');
    return { debt: interestInEther };
}


export const IsInkFunction = async (cupIdInBytes32) => {
    try {
    
        const contract = await tubContract();
        const result = await contract.methods.ink(cupIdInBytes32).call();
        const resultinEtherAmount = web3.utils.fromWei(result.toString(), 'ether');
        return { collateralAmount: resultinEtherAmount };
    } catch (error) {
        console.error("Error in IsInkFunction:", error);
        return { error: error.message || 'An error occurred. Please try again.' };
    }
}


async function getUserInterest(cupId) { //Interest Amount Earned:
    try {
        const contract = await tubContract();
        const interest = await contract.methods.interestOf(cupId).call();
        return interest;
    } catch (error) {
        console.error("Error getting user interest:", error);
    }
}

export const WithdrawInterestView = async (cupIdInBytes32) => {
    try {
   
        const interest = await getUserInterest(cupIdInBytes32);
        const interestInEther = await web3.utils.fromWei(interest, 'ether');
        console.log(interestInEther , "YHHHHHHHHH INTEREST EARNT IN ETH")
        return { interestEarned: interestInEther };
        
    } catch (error) {
        return { error: 'An error occurred. Please try again.' };
    }
}

//------------------------------------------------------------------------------
export async function orcaleabi() {
    const response = await Oracle.abi;
    return response;
}

export async function orcalecontract() {
    // await connect();
    const abi = await orcaleabi();
    const contract = new web3.eth.Contract(abi, orcale);
    contract.options.address = contractAddress;
    return contract;
}

export async function orcaleUpdate() {
    try {
    const contract = await orcalecontract();
    await contract.methods.updateDSValuePrice().call();
} catch (error) {
    return { error: 'An error occurred. Please try again.' };
}
}


export default {
    IsMaxDebtFunction,
    WithdrawDebtView,
    WithdrawInterestView,
    IsInkFunction,
    isCupMine,
    decimalToHexWithPadding,
    getWithdrawableInterest,
    getDepositedBCKAmount,
    getLatestProposalId,
    viewdebtamount,
    viewPendingCollateral,
    getBalances,
    tubContract,
    orcaleUpdate,
    getWithdrawalRequest
}