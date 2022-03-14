import web3 from './web3';
import CampaignContract from '../ethereum/build/ Campaign.json' ;

const Campaign = async (address) => {
     const instanceCampaign= await new web3.eth.Contract(
         JSON.parse(CampaignContract.interface),
         address
     )

     return instanceCampaign;
}

export default Campaign;