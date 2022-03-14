const Truffle = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const campaignContract = require('../ethereum/build/ Campaign.json');
const factoryContract = require('../ethereum/build/ CampaignFactory.json');

const provider = new Truffle(
    'write east betray item appear grant stand sadness drum sunset alcohol document' ,
    'https://rinkeby.infura.io/v3/505983ddd1a34eb48edcd7b4b9177f91' , 
);

const web3 = new Web3(provider) ;

let accounts;
let factory;

const deploy = async () => {

    accounts = await web3.eth.getAccounts();
    console.log(`Trying to deploy from ${accounts[0]}`);
   
    factory = await new web3.eth.Contract(JSON.parse(factoryContract.interface))
    .deploy({data:factoryContract.bytecode})
    .send({from:accounts[0],gas:'1000000'}) ;

    console.log(`Deployed successfully at ${factory.options.address}`);  
    provider.engine.stop() ;

}

deploy() ;

