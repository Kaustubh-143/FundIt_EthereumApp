import React, {useEffect,useState} from 'react';
import factory from '../ethereum/factory'
import { Card,Button } from 'semantic-ui-react'
import { render } from 'react-dom';
import Layout from '../components/Layout'
import { Link } from '../routes'

const Index = ({campaigns}) => {

  const [deployedCampaigns, setDeployedCampaigns] = useState([]);
   
  Index.getInitialProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call() ;

    return {campaigns} ;  //this will be passed to the component itself as props : {campaigns}
  }

  const renderCampaigns = () => {

           const items = campaigns.map( (address) => {   // items here would be an array of objects, it will be an array because it is returned by map, and what is being returned is an object
                return {
                  header: address,
                  description : <Link route={`/campaigns/${address}`}>
                  <a>View campaign</a>
                  </Link>
                  ,
                  fluid : true,
                }
           })

           return <Card.Group items={items} />
  }
  
  return <Layout>
      
   
       <h2>Open Campaigns </h2>

    <Link route='/campaigns/new'>
    <a>
      <Button
        floated='right'
        content='Create Campaign'
         icon='add circle'
         primary
       />
    </a>  
   </Link> 
    
    {renderCampaigns()} 

  </Layout>;
};

export default Index;
