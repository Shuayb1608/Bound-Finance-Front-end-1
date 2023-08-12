import { SAI_TUB_ADDRESS, BCK_ADDRESS, SKR_ADDRESS, SAI_ADDRESS, STAKING_ADDRESS, Reserve_address } from "../contract";
const bigInt = require("big-integer");
const Web3 = require("web3");
const { default: Swal } = require("sweetalert2");

const web3 = new Web3(Web3.givenProvider);
const BckETH = require('../contract/bckEth.json')
const SaiTUB = require("../contract/saiTub.json");
const staking = require('../contract/staking.json');
const reserve = require('../contract/Reserve.json');

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
const reserveaddress = Reserve_address;




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
    const response = await reserve.abi;
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
    const abi6 = await getABI6()
    const tokenContract = new web3.eth.Contract(abi6, reserveaddress);
    return tokenContract;
}



async function watchForNewCup() {
    // const provider = await new ethers.providers.Web3Provider(window.ethereum);
    // const signer = await provider.getSigner();
    // const contract = await new ethers.Contract(contractAddress, abi, signer);
    // console.log('web3.eth', web3.eth);
    const abi = await getABI();
    const contract = new web3.eth.Contract(abi, contractAddress);

    console.log('contract', contract);

    const currentUser = await getAccount();

    contract.events.LogNewCup({ filter: { lad: await getAccount() } })
        .on('data', (event) => {
            console.log("New cup created: " + event.returnValues.cup);
            // display the cup address on the page
           
        })
        .on('error', (error) => {
            console.error("Error watching for new cup: " + error);
        });
}

export async function getCupsCreatedByAccount(account) {
    const contract = await getContract();
    const events = await contract.getPastEvents('LogNewCup', {
        filter: { lad: account },
        fromBlock: 0,
        toBlock: 'latest'
    });

    const cupList = events.map(event => {
        let hexCupId = web3.utils.numberToHex(event.returnValues.cup);
        hexCupId = hexCupId.replace(/^0x0*/, '');  // This will remove leading zeroes after 0x
        return hexCupId;
    })

    console.log(cupList);  // Add this line
    return cupList;
}


export function displayCupList(cupList) {
    const cupListContainer = document.getElementById("cupList") ;
    cupListContainer.innerHTML = '';

    // Create a table
    const table = document.createElement("table");
    table.className = "styled-table";

    // Create a table header
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    const th = document.createElement("th");
    th.scope = "col";
    th.className = "px-6 py-3 text-left text-xs font-medium text-gradient uppercase tracking-wider";
    th.textContent = "Cup ID";
    trHead.appendChild(th);
    thead.appendChild(trHead);

    // Create table body
    const tbody = document.createElement("tbody");
    tbody.className = "bg-grey divide-y divide-gray-700";
    cupList.forEach(cupId => {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.className = "px-6 py-4 blackspace-nowrap";
        const div = document.createElement("div");
        div.className = "text-sm text-gradient bold"; // Add "bold" class for bold font
        div.style.backgroundColor = 'text-gradient'; // Add the same background color as "Cup ID"
        div.textContent = cupId;
        td.appendChild(div);
        tr.appendChild(td);
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    cupListContainer.appendChild(table);
}


async function isCupMine(cupID){
    const contract = await getContract();
    const accounts = await web3.eth.getAccounts();
   let owner = await contract.methods.lad(cupID).call()
   return owner;

}

async function approveGemTransfer(amount) {
    const tokenContract = await getTokenContract();
    const accounts = await web3.eth.getAccounts();
    await tokenContract.methods
        .approve(contractAddress, amount)
        .send({ from: accounts[0], gas: 300000 }); // Set a custom gas limit
}

async function approveSkrTransfer(amount) {
    const tokenContract = await getTokenContract2();
    const accounts = await web3.eth.getAccounts();
    await tokenContract.methods
        .approve(contractAddress, amount)
        .send({ from: accounts[0], gas: 300000 }); // Set a custom gas limit
}

async function approveSaiTransfer(amount) {
    const tokenContract = await getTokenContract3();
    const accounts = await web3.eth.getAccounts();
    await tokenContract.methods
        .approve(contractAddress, amount)
        .send({ from: accounts[0], gas: 300000 }); // Set a custom gas limit
}


async function joinSkr(amount) {
    const Tubcontract = await getContract();
    // console.log('contractcontract',Tubcontract);
    const token = await getTokenContract();
    console.log('token', token);
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];
    console.log('ownerowner', owner);
    const spender = Tubcontract.options.address;
    console.log('spendervspender', spender);
    const tokenAmount = amount.toString();
    console.log('tokenAmount', tokenAmount);
    console.log(owner)
    console.log('Approval started....')
    // Approve the Tubcontract to spend tokens on behalf of the user
    await token.methods
        .approve(spender, tokenAmount)
        .send({ from: owner, gas: 50000 });

    const allowance = await token.methods.allowance(owner, spender).call();
    console.log('Allowance after approval:', allowance);

    const balance = await token.methods.balanceOf(owner).call();
    console.log('User balance:', balance);

    console.log('Join started')
    // Call join function on contract
    await Tubcontract.methods
        .join(tokenAmount)
        .send({ from: owner });

    console.log('Join successful')

}


async function exitSkr(amount) {
    const contract = await getContract();
    const accounts = await web3.eth.getAccounts();
    await contract.methods
        .exit(amount)
        .send({ from: accounts[0] });
}

async function joinBCK(amount) {
    const token = await getTokenContract();
    const accounts = await web3.eth.getAccounts();
   let amountinWei =  web3.utils.toWei(amount.toString(), 'ether')
   await token.methods.mint().send({ from: accounts[0], value: amountinWei});
}

async function submitExit(amount) {
    const token = await getTokenContract();
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];
    let amountinWei =  etherToWei(amount)
    await token.methods.approve(token.options.address, amountinWei).send({ from: owner, gas: 50000 });
    await token.methods.requestWithdrawal(amountinWei).send({ from: accounts[0] });
}

async function executeExit() {
    const token = await getTokenContract();
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];
    await token.methods.executeWithdrawal().send({ from: accounts[0] });

}

async function approveChange(ID) {
    const token = await getTokenContract5();
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];
    await token.methods.approveChange(ID).send({ from: accounts[0] });
}

async function delegate() {
    const token = await getTokenContract5();
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];
    await token.methods.delegate().send({ from: owner});
}

async function checkProposal(ID) {
    const token = await getTokenContract5();
    const proposal = await token.methods.proposals(ID).call();
   

    console.log(proposal, 'This is the proposal Formatted');
    return proposal;
}

async function withdrawInterest(cupId) {
    try {
        const contract = await getContract();
        const accounts = await web3.eth.getAccounts();
        await contract.methods.withdrawInterest(cupId).send({ from: accounts[0] });
        Swal.fire({
            title: 'Success',
            text: 'Your interest has been withdrawn successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
        });
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'An error occurred while withdrawing your interest. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
        });
        console.error("Error withdrawing interest:", error);
    }
}

async function getUserInterest(cupId) {
    try {
        const contract = await getContract();
        const interest = await contract.methods.interestOf(cupId).call();
        return interest;
    } catch (error) {
        console.error("Error getting user interest:", error);
    }
}





function decimalToHexWithPadding(decimalValue) {
    const hexValue = decimalValue.toString(16); 
    const paddedHexValue = web3.utils.padLeft(hexValue, 64); 
    return '0x' + paddedHexValue; 
}

function etherToWei(etherValue) {
    return web3.utils.toWei(etherValue.toString(), 'ether');
}



// Event listeners
export const ConnectWallet = async () => {

    try {
        Swal.fire({
            title: 'Connecting...',
            text: 'Please wait while connecting to the network.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });

        // await connect();
        await watchForNewCup();

        Swal.fire({
            icon: 'success',
            title: 'Connected',
            text: 'Successfully connected to the network.',
        });
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Connection failed',
            text: 'An error occurred while connecting to the network.',
        });
    }
}

export const OpenFunction = async () => {

    try {
        Swal.fire({
            title: 'Processing...',
            text: 'Please wait while the transaction is being processed.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });

        const contract = await getContract();
        const accounts = await web3.eth.getAccounts();
        const tx = await contract.methods.open().send({ from: accounts[0] });
        const cupId = tx.events.LogNewCup.returnValues.cup.toString();

        Swal.fire({
            icon: 'success',
            title: 'Transaction successful',
            text: 'Opened cup ' + cupId,
        });

       
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Transaction failed',
            text: 'An error occurred while processing the open operation.',
        });
    }
}


export const LockFunction = async () => {
    try {
    const wad = document.getElementById("wadInputlock").value;

    if (wad == '' || wad <= 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Invalid input',
            text: 'Please enter a valid Amount.',
        });
        return;
    }
    

    const accounts = await web3.eth.getAccounts();
    const userAccount = accounts[0];

    // Check if the user already has any cups
    const cupList = await getCupsCreatedByAccount(userAccount);
    
    let cupIdInBytes32;

    if (cupList.length === 0) {
        // If the user doesn't have a cup, open one for them
        const contract = await getContract();

          Swal.fire({
            title: 'Processing...',
            text: 'Please wait while we create your loan.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });

        await contract.methods.open().send({ from: userAccount });
         Swal.fire({
            icon: 'success',
            title: 'Collateral vault opened',
            text: 'We have opened the vault to place your collateral.',
        });
        // Re-check for user's cups after opening a new one
        const updatedCupList = await getCupsCreatedByAccount(userAccount);
        cupIdInBytes32 = decimalToHexWithPadding(updatedCupList[0]);
    } else {
        // If the user already has a cup, use the first one from the list
        cupIdInBytes32 = decimalToHexWithPadding(cupList[0]);
    }

    const owner = await isCupMine(cupIdInBytes32);
    if (!(owner === userAccount)) {
        Swal.fire({
            icon: 'warning',
            title: 'This is not your cup',
            text: 'An unexpected error occurred. Unable to find or create your cup.',
        });
        return;
    }

    const bck = await getTokenContract();
    let bckAmountHeld = await bck.methods.balanceOf(userAccount).call();
    const wadInWei = etherToWei(wad);

    if (Number(wadInWei) > Number(bckAmountHeld)) {
        Swal.fire({
            icon: 'warning',
            title: 'You do not have enough BCKETH',
            text: 'Please enter a valid Amount.',
        });
        return;
    }

        Swal.fire({
            title: 'Processing...',
            text: 'Please wait while the transaction is being processed.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });

        await joinSkr(wadInWei);
        await approveSkrTransfer(wadInWei);
        const contract = await getContract();
        await contract.methods.lock(cupIdInBytes32, wadInWei).send({ from: userAccount });

        Swal.fire({
            icon: 'success',
            title: 'Transaction successful',
            text: 'The lock operation has been completed successfully.',
        });
    } catch (error) {
        console.error(JSON.stringify(error, null, 2));

        if (error.code === 4001) {
            // User rejected the transaction
            Swal.fire({
                icon: 'error',
                title: 'Transaction rejected',
                text: 'You rejected the transaction.',
            });
        } else if (error.message && error.message.includes('insufficient funds')) {
            // Insufficient ETH for gas
            Swal.fire({
                icon: 'error',
                title: 'Insufficient ETH',
                text: 'You do not have enough ETH to cover the gas fee.',
            });
        } else {
            // General error
            Swal.fire({
                icon: 'error',
                title: 'Transaction failed',
                text: 'An error occurred while processing the lock operation.',
            });
        }
    }
}

export const DrawFunction = async () => {
    const wad = document.getElementById("wadInputdraw").value;

    const accounts = await web3.eth.getAccounts();
    const userAccount = accounts[0];

    // Check if the user already has any cups
    const cupList = await getCupsCreatedByAccount(userAccount);

    if (cupList.length === 0) {
        // If the user doesn't have a cup, show the alert
        Swal.fire({
            icon: 'warning',
            title: 'No Vault Found!',
            text: 'You need to lock some BCKETH first using the lock function.',
        });
        return;
    }
    const cupId = cupList[0]

    if (cupId == '' || cupId <= 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Invalid input',
            text: 'Please enter a valid Cup ID.',
        });
        return;
    }

    const cupIdInBytes32 = decimalToHexWithPadding(cupId);
    const owner = await isCupMine(cupIdInBytes32);

    if (!(owner === userAccount)) {
        Swal.fire({
            icon: 'warning',
            title: 'This is not your cup',
            text: 'Please enter a valid cup which is yours.',
        });
        return;
    }

    if (wad == '' || wad <= 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Invalid input',
            text: 'Please enter a valid Amount.',
        });
        return;
    }

    const contract = await getContract();
    const result = await contract.methods.ink(cupIdInBytes32).call();
    const resultinEtherAmount = result * 10 ** -18;
    const mat = await contract.methods.mat().call();
    const price = await contract.methods.tag().call();

    const matAdjusted = mat * 10 ** -27;
    const priceadjusted = price * 10 ** -27;

    const MaxDebt = resultinEtherAmount * priceadjusted / matAdjusted;
    const MaxDebtRounded = MaxDebt.toFixed(2);

    if (Number(wad) > Number(MaxDebtRounded)) {
        Swal.fire({
            icon: 'warning',
            title: 'You cannot draw this much BCK, you will exceed the collateralisation ratio',
            text: 'Please enter a valid Amount.',
        });
        return;
    }

    try {
        Swal.fire({
            title: 'Processing...',
            text: 'Please wait while the transaction is being processed.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });

        const wadInWei = etherToWei(wad);
        await contract.methods.draw(cupIdInBytes32, wadInWei).send({ from: userAccount });

        Swal.fire({
            icon: 'success',
            title: 'Transaction successful',
            text: 'The draw operation has been completed successfully.',
        });
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Transaction failed',
            text: 'An error occurred while processing the draw operation.',
        });
    }
}


export const WipeFunction = async () => {
    const wad = document.getElementById("wadInputwipe").value;

    const accounts = await web3.eth.getAccounts();
    const userAccount = accounts[0];

    // Check if the user already has any cups
    const cupList = await getCupsCreatedByAccount(userAccount);

    if (cupList.length === 0) {
        // If the user doesn't have a cup, show the alert
        Swal.fire({
            icon: 'warning',
            title: 'No Cup Found!',
            text: 'You need to lock some BCKETH first using the lock function.',
        });
        return;
    }

    // Use the first cup if the user has any (assuming one cup per user)
    const cupIdInBytes32 = decimalToHexWithPadding(cupList[0]);
    const owner = await isCupMine(cupIdInBytes32);

    if (!(owner === userAccount)) {
        Swal.fire({
            icon: 'warning',
            title: 'This is not your cup',
            text: 'An unexpected error occurred.',
        });
        return;
    }

    if (wad == '' || wad <= 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Invalid input',
            text: 'Please enter a valid Amount.',
        });
        return;
    }

    const sai = await getTokenContract3();
    let amountsaiheld = await sai.methods.balanceOf(userAccount).call();
    const wadInWei = etherToWei(wad);

    if (Number(wadInWei) > Number(amountsaiheld)) {
        Swal.fire({
            icon: 'warning',
            title: 'You do not have enough BCK to wipe this amount of debt',
            text: 'Please enter a valid Amount.',
        });
        return;
    }

    try {
        Swal.fire({
            title: 'Processing...',
            text: 'Please wait while the transaction is being processed.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });

        const contract = await getContract();
        await approveSaiTransfer(wadInWei);
        await contract.methods.wipe(cupIdInBytes32, wadInWei).send({ from: userAccount });

        Swal.fire({
            icon: 'success',
            title: 'Transaction successful',
            text: 'The wipe operation has been completed successfully.',
        });
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Transaction failed',
            text: 'An error occurred while processing the wipe operation.',
        });
    }
}


export const ShutFunction = async () => {
    const cupId = document.getElementById("shutCupIdInputshut").value;
    if(cupId == '' || cupId <=0){
        Swal.fire({
            icon: 'warning',
            title: 'Invalid input',
            text: 'Please enter a valid Cup Id.',
        });
        return 
    }
    const cupIdInBytes32 = decimalToHexWithPadding(cupId);
    const owner = await isCupMine(cupIdInBytes32)
    const accounts = await web3.eth.getAccounts();
    if(!(owner === accounts[0])){
     Swal.fire({
         icon: 'warning',
         title: 'This is not your cup',
         text: 'Please enter a valid cup which is yours.',
     });
     return
    }
    try {
        Swal.fire({
            title: 'Processing...',
            text: 'Please wait while the transaction is being processed.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });

        const contract = await getContract();
        const accounts = await web3.eth.getAccounts();
        const cupIdInBytes32 = decimalToHexWithPadding(cupId);
        await contract.methods.shut(cupIdInBytes32).send({ from: accounts[0] });

        Swal.fire({
            icon: 'success',
            title: 'Transaction successful',
            text: 'The shut operation has been completed successfully.',
        });
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Transaction failed',
            text: 'An error occurred while processing the shut operation.',
        });
    }
}
export const CloseListFunction = async () => {
    document.getElementById("cupList").innerHTML = "";
    document.getElementById('cupList').style.display = 'block';
}
export const ListCupsFunction = async () => {
    const account = await getAccount();
    const cupList = await getCupsCreatedByAccount(account);
    document.getElementById('cupList').style.display = 'block';
    // console.log('cupList',cupList);
    displayCupList(cupList);
    return cupList;
    
}

export const FreeFunction = async () => {
    const wad = document.getElementById("wadInputfree").value;

    const accounts = await web3.eth.getAccounts();
    const userAccount = accounts[0];

    // Check if the user already has any cups
    const cupList = await getCupsCreatedByAccount(userAccount);

    if (cupList.length === 0) {
        // If the user doesn't have a cup, show the alert
        Swal.fire({
            icon: 'warning',
            title: 'No Cup Found!',
            text: 'You need to lock some BCKETH first using the lock function.',
        });
        return;
    }

    // Use the first cup if the user has any (assuming one cup per user)
    const cupIdInBytes32 = decimalToHexWithPadding(cupList[0]);
    const owner = await isCupMine(cupIdInBytes32);

    if (!(owner === userAccount)) {
        Swal.fire({
            icon: 'warning',
            title: 'This is not your cup',
            text: 'An unexpected error occurred.',
        });
        return;
    }

    if (wad == '' || wad <= 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Invalid input',
            text: 'Please enter a valid Amount.',
        });
        return;
    }

    try {
        Swal.fire({
            title: 'Processing...',
            text: 'Please wait while the transaction is being processed.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });

        const contract = await getContract();
        const wadInWei = etherToWei(wad);
        await contract.methods.free(cupIdInBytes32, wadInWei).send({ from: userAccount });
        await approveSkrTransfer(wadInWei);
        await exitSkr(wadInWei);

        Swal.fire({
            icon: 'success',
            title: 'Transaction successful',
            text: 'The free operation has been completed successfully.',
        });
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Transaction failed',
            text: 'An error occurred while processing the free operation.',
        });
    }
}


export const GiveFunction = async () => {
    const cupId = document.getElementById("cupIdInputgive").value;
    const cupIdInBytes32 = decimalToHexWithPadding(cupId);
    const owner = await isCupMine(cupIdInBytes32)
    const accounts = await web3.eth.getAccounts();
    if(!(owner === accounts[0])){
     Swal.fire({
         icon: 'warning',
         title: 'This is not your cup',
         text: 'Please enter a valid cup which is yours.',
     });
     return
    }
    try {
        Swal.fire({
            title: 'Processing...',
            text: 'Please wait while the transaction is being processed.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });

        const contract = await getContract();
        const accounts = await web3.eth.getAccounts();
        const newOwner = document.getElementById("owner"); // Set the new owner address here
        await contract.methods.give(cupIdInBytes32, newOwner).send({ from: accounts[0] });

        Swal.fire({
            icon: 'success',
            title: 'Transaction successful',
            text: 'The give operation has been completed successfully.',
        });
        
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Transaction failed',
            text: 'An error occurred while processing the give operation.',
        });
    }
}

export const IsInkFunction = async () => {
    try {
        const cupId = document.getElementById("cupIdInk").value;
        if (cupId == '' || cupId <=0 ) {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid input',
                text: 'Please enter a valid Cup ID.',
            });
            return;
        }
        const cupIdInBytes32 = decimalToHexWithPadding(cupId);
        const owner = await isCupMine(cupIdInBytes32)
        const accounts = await web3.eth.getAccounts();
        if(!(owner === accounts[0])){
         Swal.fire({
             icon: 'warning',
             title: 'This is not your cup',
             text: 'Please enter a valid cup which is yours.',
         });
         return
        }
        const contract = await getContract();
        const result = await contract.methods.ink(cupIdInBytes32).call();
        const resultinEtherAmount = web3.utils.fromWei(result.toString(), 'ether');

        Swal.fire({
            icon: 'info',
            title: 'Collateral Amount In the Cup',
            text: resultinEtherAmount + ' Ether',
        });
    } catch (error) {
        console.error("Error in IsInkFunction:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'An error occurred. Please try again.',
        });
    }
}


export const IsMaxDebtFunction = async () => {
    try {
        const contract = await getContract();
        const cupId = document.getElementById("cupIdMaxDebt").value;
        const cupIdInBytes32 = decimalToHexWithPadding(cupId);
        const result = await contract.methods.ink(cupIdInBytes32).call();
        const owner = await isCupMine(cupIdInBytes32)
        console.log(owner, 'this is owner address');
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0], "this is my address");
    if(!(owner === accounts[0])){
     Swal.fire({
         icon: 'warning',
         title: 'This is not your cup',
         text: 'Please enter a valid cup which is yours.',
     });
     return
    }
        if(Number(result) == 0) {
            Swal.fire({
                icon: 'info',
                title: 'No Debt',
                text: 'No debt has been taken into account because there is no ink.',
            });
            return;
        }
        
        const resultinEtherAmount = result * 10 ** -18;
        const mat = await contract.methods.mat().call();
        const price = await contract.methods.tag().call();
        console.log("This is the collateral ratio", mat);
        console.log("this is price", price);
        const matAdjusted = mat * 10 ** -27;
        const priceadjusted = price * 10 ** -27;
        console.log("this is price adjusted", priceadjusted);
        const MaxDebt = resultinEtherAmount * priceadjusted / matAdjusted;
        const MaxDebtRounded = MaxDebt.toFixed(2);

        Swal.fire({
            icon: 'info',
            title: 'Maximum BCK You Can Draw',
            text: MaxDebtRounded + ' BCK',
        });
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while checking the cup safety.',
        });
    }
}


export const IsSafeFunction = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        const userAccount = accounts[0];
        const cupList = await getCupsCreatedByAccount(userAccount);

        if (cupList.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'No Cup Found!',
                text: "You need to open a loan by locking BCKETH as collateral using the 'lock' function.",
            });
            return;
        }

        const cupIdInBytes32 = decimalToHexWithPadding(cupList[0]);
        const contract = await getContract();
        const resultink = await contract.methods.ink(cupIdInBytes32).call();
        const resultinEtherAmountink = web3.utils.fromWei(resultink.toString(), 'ether');
        const resultdebt = await contract.methods.tab(cupIdInBytes32).call();
        const resultinEtherAmountdebt = web3.utils.fromWei(resultdebt.toString(), 'ether');
        console.log(cupIdInBytes32, "this is the cup");

        if (Number(resultinEtherAmountink) === 0) {
            Swal.fire({
                icon: 'info',
                title: 'No need to check safety',
                text: 'There is no collateral in this cup.',
            });
            return;
        }
        if (Number(resultinEtherAmountdebt) === 0) {
            Swal.fire({
                icon: 'info',
                title: 'No need to check safety',
                text: `You haven't taken out any BCK stablecoin's from this vault`,
            });
            return;
        }

        const result = await contract.methods.safe(cupIdInBytes32).call();

        console.log(result, 'This is the result')
        Swal.fire({
            icon: 'info',
            title: 'Is My CDP Safe From Liquidation ?',
            text: String(result),
        });

    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while checking the cup safety.',
        });
    }
}

export const WithdrawInterestFunction = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        const userAccount = accounts[0];
        const cupList = await getCupsCreatedByAccount(userAccount);

        if (cupList.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'No Cup Found!',
                text: "You need to open a loan by locking BCKETH as collateral using the 'lock' function.",
            });
            return;
        }

        const cupIdInBytes32 = decimalToHexWithPadding(cupList[0]);
        const interest = await getUserInterest(cupIdInBytes32);
        const interestInEther = web3.utils.fromWei(interest, 'ether');

        if (interestInEther === '0') {
            Swal.fire({
                title: 'info',
                text: 'You have not earnt any ETH interest to withdraw',
                icon: 'info',
                confirmButtonText: 'OK',
            });
            return;
        }

        Swal.fire({
            title: 'Withdrawing Interest',
            text: 'Please wait while your interest is being withdrawn.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });

        await withdrawInterest(cupIdInBytes32);

        Swal.close();
        Swal.fire({
            icon: 'success',
            title: 'Withdrawal successful',
            text: 'The Withdrawal operation has been completed successfully.',
        });

    } catch (error) {
        Swal.close();
        Swal.fire({
            title: 'Error',
            text: 'An error occurred while withdrawing your interest. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
        });
    }
}

export const WithdrawInterestView = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        const userAccount = accounts[0];
        const cupList = await getCupsCreatedByAccount(userAccount);

        if (cupList.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'No Cup Found!',
                text: "You need to open a loan by locking BCKETH as collateral using the 'lock' function.",
            });
            return;
        }

        const cupIdInBytes32 = decimalToHexWithPadding(cupList[0]);
        const interest = await getUserInterest(cupIdInBytes32);
        const interestInEther = web3.utils.fromWei(interest, 'ether');

        return interestInEther;
        
    } catch (error) {
        Swal.close();
        Swal.fire({
            title: 'Error',
            text: 'An error occurred. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
        });
    }
}



export const WithdrawInterestViewList = async () => {
    document.getElementById("interestDisplay").innerHTML = "";
}


async function getUserDebt(cupId) {
    try {
        const contract = await getContract();
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
export const WithdrawDebtView = async (amount) => {


    // const contract = await getContract();
    const cupId = parseInt(amount);
    const cupIdInBytes32 = decimalToHexWithPadding(cupId);
    const interest = await getUserDebt(cupIdInBytes32);
    const interestInEther = web3.utils.fromWei(interest.toString(), 'ether');
    return interestInEther;
    // document.getElementById("interestDisplayDebt").innerText = `Debt: ${interestInEther} BCK`;
}


export const joinbck = async (amount) => {
    
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];
    const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

    // Get Ether balance of the user
    const balance = await web3.eth.getBalance(userAddress);

    // Check if balance is enough
    if (parseInt(balance) < parseInt(amountInWei)) {
        Swal.close();
        Swal.fire({
            title: 'warning',
            text: `You don't have enough ETH to make this amount of BCKETH`,
            icon: 'warning',
            confirmButtonText: 'OK',
        });
        return
    }

    try{
    Swal.fire({
        title: 'Connecting...',
        text: 'Please wait for minting.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
   
    await joinBCK(amount);
    Swal.fire({
        icon: 'success',
        title: 'Successful BCKETH mint',
        text: 'Operation has been completed successfully.',
    });
}catch (error) {
    Swal.close();
    Swal.fire({
        title: 'Error',
        text: 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
    });
}
}

export const requestWithdrawal = async (amount) => {
    const token = await getTokenContract();
        const accounts = await web3.eth.getAccounts();
        const owner = accounts[0];

        // Get balance
        const balance = await token.methods.balanceOf(owner).call();
        let amountInWei = web3.utils.toWei(amount.toString(), 'ether');

        // Check if balance is enough
        if (parseInt(balance) < parseInt(amountInWei)) {
            Swal.close();
            Swal.fire({
                title: 'warning',
                text: `You don't have enough BCKETH to make this withdrawal request`,
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return
        }
        try {
    Swal.fire({
        title: 'Connecting...',
        text: 'Please wait for request.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    
    await submitExit(amount);
    Swal.fire({
        icon: 'success',
        title: 'request withdrawal was successful',
        text: 'Operation has been completed successfully.',
    });
}catch (error) {
    Swal.close();
    Swal.fire({
        title: 'Error',
        text: 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
    });
}
}

export const executeWithdrawal = async () => {
    const token = await getTokenContract();
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];
    const tokenAddress = token.options.address;

    // Get Ether balance of the contract
    const balance = await web3.eth.getBalance(tokenAddress);

    // Get withdrawal request amount of the user
    const withdrawalRequest = await token.methods.withdrawalRequests(userAddress).call();
    const withdrawalAmount = withdrawalRequest.amount;

    // Check if balance is enough
    if (parseInt(balance) < parseInt(withdrawalAmount)) {
        Swal.close();
        Swal.fire({
            title: 'warning',
            text: `The BCKETH contract doesn't have enough ETH to make this withdrawal, please wait till there is enough ETH. `,
            icon: 'warning',
            confirmButtonText: 'OK',
        });
        return
    }

    try {
    Swal.fire({
        title: 'Connecting...',
        text: 'Please wait for withdrawal.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });

    await executeExit();
    Swal.fire({
        icon: 'success',
        title: 'withdrawal was successful',
        text: 'Operation has been completed successfully.',
    });

}catch (error) {
    Swal.close();
    Swal.fire({
        title: 'Error',
        text: 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
    });
}
}


export const approveChanges = async (ID) => {
    if (ID == "" || Number(ID) < 0) {
        Swal.close();
        Swal.fire({
            title: 'info',
            text: 'An error occurred while retrieveing proposal ID. Please try again with a real proposal ID.',
            icon: 'info',
            confirmButtonText: 'OK',
        });
        return
    };

    const reserve = await getTokenContract5();
    const proposalCount = await reserve.methods.proposalCount().call();

   
    // Check if no proposals have been made yet
    if (proposalCount == 0) {
        Swal.close();
        Swal.fire({
            title: 'info',
            text: 'No proposal has been made yet. No need to vote at this time.',
            icon: 'info',
            confirmButtonText: 'OK',
        });
        return;
    }

    // Check if the given ID is within the valid range
    if (Number(ID) > (proposalCount - 1) || Number(ID) < 0) {
        Swal.close();
        Swal.fire({
            title: 'info',
            text: 'The provided proposal ID is not within the valid range. Please enter a valid proposal ID.',
            icon: 'info',
            confirmButtonText: 'OK',
        });
        return;
    }


    try{ 
    Swal.fire({
        title: 'Connecting...',
        text: 'Please wait for the approval.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });

    await approveChange(ID);

    Swal.fire({
        icon: 'success',
        title: 'Change approval successful',
        text: 'Operation has been completed successfully.',
    });
}catch (error) {
    Swal.close();
    Swal.fire({
        title: 'Error',
        text: 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
    });
}
};

export const delegates = async () => {
   try {
     Swal.fire({
        title: 'Connecting...',
        text: 'Please wait for delegation.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });

    await delegate();

    Swal.fire({
        icon: 'success',
        title: 'Delegation successful',
        text: 'Operation has been completed successfully.',
    });
}catch (error) {
    Swal.close();
    Swal.fire({
        title: 'Error',
        text: 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
    });
}
};

export const checkProposals = async (ID) => {
    if (ID == "" || Number(ID) < 0) {
        Swal.close();
        Swal.fire({
            title: 'info',
            text: 'An error occurred while retrieveing proposal ID. Please try again with a real proposal ID.',
            icon: 'info',
            confirmButtonText: 'OK',
        });
        return
    };

    const reserve = await getTokenContract5();
    const proposalCount = await reserve.methods.proposalCount().call();

   
    // Check if no proposals have been made yet
    if (proposalCount == 0) {
        Swal.close();
        Swal.fire({
            title: 'info',
            text: 'No proposal has been made yet. No need to vote at this time.',
            icon: 'info',
            confirmButtonText: 'OK',
        });
        return;
    }

    // Check if the given ID is within the valid range
    if (Number(ID) > (proposalCount - 1) || Number(ID) < 0) {
        Swal.close();
        Swal.fire({
            title: 'info',
            text: 'The provided proposal ID is not within the valid range. Please enter a valid proposal ID.',
            icon: 'info',
            confirmButtonText: 'OK',
        });
        return;
    }

    try {

    const proposal = await checkProposal(ID);
    return proposal;



    Swal.fire({
        icon: 'success',
        title: `Proposal ${ID} Details`,
        text: 'successfully loaded the ID details',
        confirmButtonText: 'OK',
    });
}catch (error) {
    Swal.close();
    Swal.fire({
        title: 'Error',
        text: 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
    });
}
};








export default {
    ConnectWallet,
    WithdrawInterestViewList,
    ListCupsFunction,
    CloseListFunction,
    OpenFunction,
    LockFunction,
    approveChanges,
    DrawFunction,
    WipeFunction,
    ShutFunction,
    FreeFunction,
    joinbck,
    submitExit,
    checkProposals,
    delegates,
    requestWithdrawal,
    executeWithdrawal,
    GiveFunction,
    WithdrawInterestFunction,
    WithdrawInterestView,
    IsSafeFunction,
    IsInkFunction,
    IsMaxDebtFunction,
    WithdrawDebtView
}