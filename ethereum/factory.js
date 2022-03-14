import web3 from './web3' 
import campaignFactory from './build/ CampaignFactory.json';

const address = '0xE20a73734DE4B3ad0aE077804F535fE4190A9D0C';


const factory = new web3.eth.Contract(JSON.parse(campaignFactory.interface),address) ;

export default factory ;