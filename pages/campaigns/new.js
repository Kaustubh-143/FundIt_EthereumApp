import React,{useState} from 'react';
import Layout from '../../components/Layout';
import {Button,Form,Input,Message} from 'semantic-ui-react'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { Router } from '../../routes'

const NewCampaign = () => {
  
    const [minimumContribution, setMinimumContribution] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loadings, setLoading] = useState(false);



    const onSubmit = async (event) => {
        event.preventDefault();  // do not submit the form to the backend server 

        setLoading(true) ;
        setErrorMessage('');

        try {
        let accounts = await web3.eth.getAccounts();
        await factory.methods.createCampaign(minimumContribution).send({
            from: accounts[0],  //we do not need to specify gas amount cuz that will be calculated by the metamask itself, we only need to specify that in case of running our tests
        }) 
         
        Router.pushRoute('/')

      } catch(err) {
           setErrorMessage(err.message) ;
      }

      setLoading(false);
    }

  return <Layout>
      <h1>Create a new Campaign!</h1>
      {/* <h4>Minimum Contribution (Wei) </h4>
      <div class="ui input">
  <input type="text" placeholder="Search..." />
  
  <button class="ui primary button">
  Create Campaign
</button>
</div> */}

<Form onSubmit={onSubmit} error={errorMessage}>
    <Form.Field>
      <label>Minimum Contribution (Wei)</label>
      <Input value={minimumContribution}
      onChange={event => setMinimumContribution(event.target.value)}
      placeholder='Minimum Contribution' 
      label="Wei"
      labelPosition='right' />
    </Form.Field>
    <Message error header='Oops!' content={errorMessage} />
    <Button loading={loadings} primary type='submit'>Create Campaign!</Button>
</Form>    

{/* <h4>{minimumContribution}</h4> */}


  </Layout>;
};

export default NewCampaign ;
