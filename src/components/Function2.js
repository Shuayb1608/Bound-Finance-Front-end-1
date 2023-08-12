
import { SAI_TUB_ADDRESS, BCK_ADDRESS, SKR_ADDRESS, SAI_ADDRESS, STAKING_ADDRESS, USDC_ADDRESS, TAP_ADDRESS } from "../contract/index";
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
// import BckETH from "./bckEth.json";



// const web3 = new Web3(Web3.givenProvider || '');

// const {ethereum} = window;

async function deposit() {

}
var show = function (elem) {
    elem.style.display = 'block';
};

var hide = function (elem) {
    elem.style.display = 'none';
};

var toggle = function (elem) {

    // If the element is visible, hide it
    if (window.getComputedStyle(elem).display === 'block') {
        hide(elem);
        return;
    }

    // Otherwise, show it
    show(elem);

};

// Listen for click events
document.addEventListener('click', function (event) {

    // Make sure clicked element is our toggle
    if (!event.target.classList.contains('toggle')) return;

    // Prevent default link behavior
    event.preventDefault();

    // Get the content
    var content = document.querySelector(event.target.hash);
    if (!content) return;

    // Toggle the content
    toggle(content);

}, false);
async function showHide() {

    console.log('csijkw kjdpc');
    document.getElementById('collapseAddresses').style.display = 'block';
}


const contractAddress = SAI_TUB_ADDRESS; //SAITUB
const bckaddress = BCK_ADDRESS;    // GEM
const SkrAdddress = SKR_ADDRESS   // PETH 
const saiAddress = SAI_ADDRESS;    // DAI 
const stakingaddress = STAKING_ADDRESS;
const USDCaddress = USDC_ADDRESS;
const tapaddress = TAP_ADDRESS;




export async function getABI() {
    const response = await SaiTUB.abi;
    // console.log('response',response);
    // const data = await response.json();
    // console.log(data.abi);
    return response;
}

export async function getABI2() {
    const response = await BckETH.abi;
    // const data2 = await response.json();
    return response;
}

export async function getABI3() {
    const response = await BckETH.abi;
    // const data = await response.json();
    return response;
}

export async function getABI4() {
    const response = await BckETH.abi;
    // const data = await response.json();
    return response;
}

export async function getABI5() {
    const response = await staking.abi;
    return response;
}

export async function getABI6() {
const response = await BckETH.abi;
return response;
}

export async function getABI7() {
    const response = await tap.abi
    return response;
}



export async function getAccount() {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0];
}


// Connect to MetaMask
async function connect() {
    if (window.ethereum) {
        try {
            let address = await window.ethereum.request({ method: 'eth_requestAccounts' });
            // let chain = await window.ethereum.request({ method: 'eth_chainId' });

            const accounts = await getAccount();
            const chain = await getChain();
            // console.log(chain);
            if (chain == 11155111) {
                document.getElementById("generalNetwork").innerText = "Sapolia";
            }
            if (chain == 5) {
                document.getElementById("generalNetwork").innerText = "Goerli";
            }
            if (chain == 80001) {
                document.getElementById("generalNetwork").innerText = "Polygon";
            }
            //    if(chain != 80001 || chain != 5 || chain != 11155111){
            //     window.alert('Please connect to Sapolia network.')
            //    }
            // console.log(accounts);
            document.getElementById("generalAddress").innerText = accounts;
            document.getElementById('connect').innerHTML = "Connected";
        } catch (error) {
            console.error('User rejected request:', error);
        }
    } else {
        alert("MetaMask is not installed!");
    }

}

async function getChain() {
    let chain = await window.ethereum.request({ method: 'eth_chainId' });
    let chainId = parseInt(chain)
    return chainId;
}
// Instantiate contract
async function getContract() {
    // await connect();
    const abi = await getABI();
    const contract = new web3.eth.Contract(abi, contractAddress);
    contract.options.address = contractAddress;
    return contract;
}

async function getTokenContract() {
    // await connect();
    const abi2 = await getABI2()
    const tokenContract = new web3.eth.Contract(abi2, bckaddress);
    return tokenContract;
}

async function getTokenContract2() {
    // await connect();
    const abi3 = await getABI3()
    const tokenContract = new web3.eth.Contract(abi3, SkrAdddress);
    return tokenContract;
}

async function getTokenContract3() {
    // await connect();
    const abi4 = await getABI4()
    const tokenContract = new web3.eth.Contract(abi4, saiAddress);
    return tokenContract;
}

async function getTokenContract4() {
    // await connect();
    const abi5 = await getABI5()
    const tokenContract = new web3.eth.Contract(abi5, stakingaddress);
    return tokenContract;
}

async function getTokenContract5() {
    // await connect();
    const abi6 = await getABI6()
    const tokenContract = new web3.eth.Contract(abi6, USDCaddress);
    return tokenContract;
}

async function getTapContract() {
    // await connect();
    const abi7 = await getABI7()
    const contract = new web3.eth.Contract(abi7, tapaddress);
    return contract;
}

function etherToWei(ethAmount) {
    const roundedEthAmount = parseFloat(ethAmount).toFixed(18);  // Round to 18 decimal places
    return web3.utils.toWei(roundedEthAmount, 'ether');
}



// Function to get withdrawable dividends
export async function getWithdrawableDividends() {
    try {
        const account = await getAccount();
        const dividendContract = await getTokenContract4();

        const withdrawableDividends = await dividendContract.methods.withdrawableInterestOf(account).call();
    
        const withdrawableDividendsInUSDC = web3.utils.fromWei(withdrawableDividends, 'ether');

        console.log(`Withdrawable dividends: ${withdrawableDividendsInUSDC} USDC`);
        return withdrawableDividendsInUSDC;
    } catch (error) {
        console.error('Error getting withdrawable dividends:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong getting withdrawable dividends!'
        });
    }
}

// Function to approve tokens for staking
export async function approveTokens(amount) {
    try {
        const account = await getAccount();
        const tokenContract = await getTokenContract3();

        // Convert the amount to wei format
        const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
        
        // Show SweetAlert progress message
        Swal.fire({
            title: 'Processing...',
            text: 'Approving tokens...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            onOpen: () => {
                Swal.showLoading();
            }
        });

        const result = await tokenContract.methods.approve(stakingaddress, amountInWei).send({ from: account });
        
        // Close SweetAlert progress message
        Swal.close();

        return result;
    } catch (error) {
        console.error('Error approving tokens:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong with token approval!'
        });
        throw error;  // Throw error to prevent staking or unstaking when approval fails
    }
}

// Function to stake tokens
export async function stakeTokens(amount) {
    if (amount == "" || Number(amount) <= 0) {
        Swal.close();
        Swal.fire({
            title: 'warning',
            text: 'Input a valid amount.',
            icon: 'warning',
            confirmButtonText: 'OK',
        });
        return
    };

    const account = await getAccount();
    console.log("Returned account:", account[0]);    
    const sai = await getTokenContract3();
    const amountheldbyaccount = await sai.methods.balanceOf(account).call()
    const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
    console.log(amountInWei, 'AMOUNT IN WEI')
    console.log(amountheldbyaccount, 'AMOUNT HELD BY ACCOUNT')

    if(Number(amountInWei) > Number(amountheldbyaccount)) {
        Swal.close();
        Swal.fire({
            title: 'warning',
            text: 'You do not have enough BCK tokens to deposit',
            icon: 'warning',
            confirmButtonText: 'OK',
        });
        return
    }

    try {
        // Approve tokens before staking
        

        Swal.fire({
            title: 'Staking Tokens',
            text: 'Please wait while your tokens are being staked.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });

        await approveTokens(amount);

        const stakingContract = await getTokenContract4();
        // Convert the amount to wei format
        
        console.log("Amount in Wei:", amountInWei);        

        await stakingContract.methods.depositBCK(amountInWei).send({ from: account });
        Swal.fire({
            icon: 'success',
            title:  'Tokens Staked',
            text: 'The Staking operation has been completed successfully.',
        });
    } catch (error) {
        console.error('Error staking tokens:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong with token staking!'
        });
    }
}

// Function to withdraw staking rewards
export async function withdrawRewards() {
    const account = await getAccount();
    const dividendContract = await getTokenContract4();
    const withdrawableDividends = await dividendContract.methods.withdrawableInterestOf(account).call();
    
        const withdrawableDividendsInUSDC = web3.utils.fromWei(withdrawableDividends, 'ether');
        if(Number(withdrawableDividendsInUSDC) === 0) {
            Swal.close();
            Swal.fire({
                title: 'info',
                text: 'You have no USDC rewards to withdraw.',
                icon: 'info',
                confirmButtonText: 'OK',
            });
            return
        }
    try {
        Swal.fire({
            title: 'Withdrawing Rewards',
            text: 'Please wait while your rewards are being withdrawn.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });
        const account = await getAccount();
        const stakingContract = await getTokenContract4();

        await  stakingContract.methods.withdrawInterest().send({ from: account });
        Swal.fire({
            icon: 'success',
            title:  'Reward Withdrawn',
            text: 'The withdrawal operation has been completed successfully.',
        });
    } catch (error) {
        console.error('Error withdrawing rewards:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong with reward withdrawal!'
        });
    }
}

// Function to unstake tokens
export async function unstakeTokens(amount) {
    if (amount == "" || Number(amount) <= 0) {
        Swal.close();
        Swal.fire({
            title: 'warning',
            text: 'Input a valid amount.',
            icon: 'warning',
            confirmButtonText: 'OK',
        });
        return
    };

    let amountStaked = await balanceofEarnBCK();
    if(Number(amount) > Number(amountStaked)) {
        Swal.close();
        Swal.fire({
            title: 'warning',
            text: 'You have not staked this many BCK, unstake a smaller amount.',
            icon: 'warning',
            confirmButtonText: 'OK',
        });
        return
    } 
    try {
        // Approve tokens before unstaking


        const account = await getAccount();
        const stakingContract = await getTokenContract4();

        Swal.fire({
            title: 'Unstaking Tokens',
            text: 'Please wait while your tokens are being unstaked.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });

        // Convert the amount to wei format
        const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

        await stakingContract.methods.withdrawBCK(amountInWei).send({ from: account });

        Swal.fire({
            icon: 'success',
            title:  'Tokens Staked',
            text: 'The unstaking operation has been completed successfully.',
        });
    } catch (error) {
        console.error('Error unstaking tokens:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong with token unstaking!'
        });
    }

    
}



export async function usdcapproveTokens(amount) {
    try {
        const account = await getAccount();
        const tokenContract = await getTokenContract5();

        // Convert the amount to wei format
        const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
        
        // Show SweetAlert progress message
        Swal.fire({
            title: 'Processing...',
            text: 'Approving tokens...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            onOpen: () => {
                Swal.showLoading();
            }
        });

        const result = await tokenContract.methods.approve(stakingaddress, amountInWei).send({ from: account });
        
        // Close SweetAlert progress message
        Swal.close();

        return result;
    } catch (error) {
        console.error('Error approving tokens:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong with token approval!'
        });
        throw error;  // Throw error to prevent staking or unstaking when approval fails
    }
}

export async function distributeDividends(amount) {
    try {
    const dividendContract = await getTokenContract4();
 
        Swal.fire({
            title: 'Distributing Rewards',
            text: 'Please wait while your USDC is being Deposited.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });
        const accounts = await getAccount();
         await dividendContract.methods.distributeUSDC(amount).send({from: accounts});
        Swal.fire({
            icon: 'success',
            title:  'Rewards Distributed',
            text: 'The Distribution operation has been completed successfully.',
        });
    } catch (error) {
        console.error('Error ', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong'
        });
        throw error;  // Throw error to prevent staking or unstaking when approval fails
    }
  
}


export async function depositUSDC(amount) {

    try {

    const stakingContract = await getTokenContract4()

  
        await usdcapproveTokens(amount);

        Swal.fire({
            title: 'Depositing USDC',
            text: 'Please wait while your USDC is being Deposited.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });

        const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
        const accounts = await getAccount();
        await stakingContract.methods.distributeUSDC(amountInWei).send({from: accounts});
        
        Swal.fire({
            icon: 'success',
            title:  'USDC Distributed ',
            text: 'The Deposit & Distribution operation has been completed successfully.',
        });

    } catch (error) {
        console.error('Error approving tokens:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong'
        });
        throw error;  // Throw error to prevent staking or unstaking when approval fails
    }
}


export async function balanceofEarnBCK() {
    try {
        const account = await getAccount();
        const dividendContract = await getTokenContract4();

        const Balance = await dividendContract.methods.balances(account).call();
    
        const BalanceFormated = web3.utils.fromWei(Balance, 'ether');

        console.log(`Withdrawable dividends: ${BalanceFormated} BCKEARN`);
        return BalanceFormated;
    } catch (error) {
        console.error('Error getting withdrawable dividends:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong getting Balance of BCKEARN!'
        });
    }

}



export async function Bust(amount) {
    if (amount === "" || Number(amount) <= 0) {
        Swal.fire({
            title: 'Invalid Amount',
            text: 'Please enter a valid BCK amount to proceed.',
            icon: 'warning',
            confirmButtonText: 'OK',
        });
        return;
    };

    const account = await getAccount();
    const tap = await getTapContract();
    const woeamount = await tap.methods.woe().call();
    const fogamount = await tap.methods.fog().call();
    console.log(woeamount, "THIS IS WOE AMOUNT")

    if (woeamount == 0 && fogamount == 0) {
        Swal.fire({
            title: 'Amount Too Large',
            text: 'No BCK debt and no collateral is available for liquidation.',
            icon: 'warning',
            confirmButtonText: 'OK',
        });
        return;
    }

    try {
        Swal.fire({
            title: 'Buying Liquidated Collateral',
            text: 'Please wait while your transaction is processing.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });

        const tokenContract = await getTokenContract3();
        let amounttoWEI = await etherToWei(amount);

        let bnAmounttoWEI = bigInt(amounttoWEI);
        const bnWoeamount = bigInt(woeamount);
        const bnFogamount = bigInt(fogamount);

        if (bnFogamount.greater(0) && bnWoeamount.equals(0)) {
            const minBCKRequired = await tap.methods.ask(fogamount).call();
            if (bnAmounttoWEI.greater(bigInt(minBCKRequired))) {
                amounttoWEI = minBCKRequired;
            }
        }
        // If no fog amount but there's woe amount
        else if (bnAmounttoWEI.greater(bnWoeamount)) {
            amounttoWEI = woeamount;
            console.log("Adjusted amounttoWEI:", amounttoWEI);
        }

        console.log(amounttoWEI, "AMOUNT BEING SENT TO APPROVE AND USED TO CALCULATE BUST");

        await tokenContract.methods.approve(TAP_ADDRESS, amounttoWEI).send({from: account});
        const saitoSKR = await tap.methods.s2s().call();
        const amounttoETHER = amounttoWEI / 1e18;
        const saitoSKRETH = (saitoSKR / 1e27);
        const amounttoBust = amounttoETHER / saitoSKRETH;
        console.log(amounttoBust, "THE IS AMOUTN TO BUST")
        const toBust = etherToWei(amounttoBust);
        console.log(toBust, 'AMOUNT TO BUST BUST BUST ');
        await tap.methods.bust(toBust).send({from: account});

        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'You have successfully purchased SKR using BCK. The liquidation process is complete.',
        });

    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Liquidation Failed',
            text: 'An error occurred during the liquidation process. Please try again.',
        });
    }
}



export async function exitSKR(amount) {
    if (amount == "" || Number(amount) <= 0) {
        Swal.close();
        Swal.fire({
            title: 'warning',
            text: 'Input a valid amount.',
            icon: 'warning',
            confirmButtonText: 'OK',
        });
        return
    };
    const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
    const accounts = await getAccount();
    const skr = await getTokenContract2();
    const balance = await skr.methods.balanceOf(accounts).call()
    if(Number(balance) < Number(amountInWei)) {
        Swal.close();
        Swal.fire({
            title: 'warning',
            text: 'You do not have enough BETH to make this conversion',
            icon: 'warning',
            confirmButtonText: 'OK',
        });
        return
    };
    
   try {

    
    const tub = await getContract();
    
    
    Swal.fire({
        title: 'exiting SKR for BCKETH',
        text: 'Please wait while your SKR is being exited.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    await skr.methods.approve(SAI_TUB_ADDRESS, amountInWei).send({ from: accounts, gas: 300000 });
    await tub.methods.exit(amountInWei).send({from: accounts});
    Swal.fire({
        icon: 'success',
        title:  'You have exited some SKR for BCKETH',
        text: 'The exit process is complete.',
    });

} catch (error) {
    console.error('Error getting SKR to BCKETH :', error);
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong with exit!'
    });
}
}

export async function getWoe() {
    try {
         const tap = await getTapContract();
 
         Swal.fire({
             title: 'Fetching Woe',
             text: 'Please wait while we fetch the woe.',
             allowOutsideClick: false,
             allowEscapeKey: false,
             showConfirmButton: false,
             onBeforeOpen: () => {
                 Swal.showLoading();
             },
         });
 
         const woeAmount = await tap.methods.woe().call();
 
         Swal.fire({
             icon: 'success',
             title:  'Woe fetched successfully',
             text: `Woe: ${web3.utils.fromWei(woeAmount.toString(), 'ether')} SAI`,
         });
 
         Swal.fire({
            icon: 'info',
            title: 'Collateral Amount In the Cup',
            text: woeAmount + ' Ether',
        });
 
     } catch (error) {
         console.error('Error fetching woe:', error);
         Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: 'Something went wrong while fetching woe!'
         });
     }
 }
 
 export async function getFog() {
    try {
         const tap = await getTapContract();
 
         Swal.fire({
             title: 'Fetching Fog',
             text: 'Please wait while we fetch the fog.',
             allowOutsideClick: false,
             allowEscapeKey: false,
             showConfirmButton: false,
             onBeforeOpen: () => {
                 Swal.showLoading();
             },
         });
 
         const fogAmount = await tap.methods.fog().call();
 
         Swal.fire({
            icon: 'info',
            title: 'Collateral Amount In the Cup',
            text: fogAmount + ' Ether',
        });
 
     } catch (error) {
         console.error('Error fetching fog:', error);
         Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: 'Something went wrong while fetching fog!'
         });
     }
 }


export default {
 unstakeTokens,
 withdrawRewards,
 exitSKR,
 Bust,
 getWoe,
 getFog,
 getWithdrawableDividends,
 depositUSDC,
 distributeDividends,
 balanceofEarnBCK,
}