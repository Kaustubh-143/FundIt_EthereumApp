import React from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign'
import { Card, Grid, Button } from 'semantic-ui-react'
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes'

const Show = ({address,balance,minimumContribution,requestsCount,approversCount,manager}) => {

let url;

  Show.getInitialProps = async (props) => {
    console.log(props.query.token);  //here we are trying to display a very particular campaign that's why we will recieve props
                           //props.query.address is the actual address of the campaign that we are trying to show to our users
    const campaign = await Campaign(props.query.token) ; 
    console.log(campaign);
    url = props.query.token;
    
     const summary = await campaign.methods.getSummary().call();

     console.log(summary);

    return {
      address : props.query.token,
      balance : summary[0],
      minimumContribution : summary[1],
      requestsCount : summary[2],
      approversCount : summary[3],
      manager : summary[4],
    } ;
  }

  const renderCard = () => {
    const items = [

      {
        header: manager,
        description: 'Address of the manager',
        style: {overflowWrap: 'break-word'}
      },

     {
       header: minimumContribution,
       description: 'Minimum contribution'
     },

     {
      header: balance,
      // header: web3.utils.fromWei(balance,'ether'),
      description: 'Total available balance'
    },

    {
      header: requestsCount,
      description: 'Total Requests'
    },

    {
      header: approversCount,
      description: 'Total Contributors'
    },

    ]

   return <Card.Group items={items} />
  }

  return <div>
      <Layout>
      <h3>Campaigns show page</h3>
      <Grid>
       <Grid.Row> 
        <Grid.Column width={10}>
        {renderCard()}
      
        </Grid.Column>

        <Grid.Column width={6}>
        <ContributeForm address={address} />
        </Grid.Column>
       </Grid.Row> 

       <Grid.Row> 
       <Grid.Column>
        <Link route={`/campaigns/${address}/requests`} >
          <a>
            <Button style={{marginTop: 10}} primary>View requests</Button>
          </a>
        </Link>
        </Grid.Column>
       </Grid.Row> 

      </Grid>
     
      </Layout>
  </div>;
};

export default Show;
