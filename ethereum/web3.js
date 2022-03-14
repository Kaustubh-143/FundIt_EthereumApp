import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.ethereum!== 'undefined') {
    //this means we are on browser and user has metamask installed
    window.ethereum.request({method: "eth_requestAccounts"});
    web3 = new Web3(window.ethereum);
} else {
    // means we are on the server or user has not installed metamask
    //in this case we will set up our own provider by passing the url of the remote node that we have access to (infura url)
    //this provider will connect us to the ethereum network

    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/505983ddd1a34eb48edcd7b4b9177f91'
    );

    web3 = new Web3(provider) ;
}

export default web3;