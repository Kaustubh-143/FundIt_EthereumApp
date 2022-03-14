import React,{useState} from 'react'
import {Form,Input, Button , Message } from 'semantic-ui-react'
import CampaignContract from '../ethereum/build/ Campaign.json'
import Campaign from '../ethereum/campaign'
import web3 from '../ethereum/web3';
import {Router} from '../routes'

const ContributeForm = (props) => {

  const [value,setValue] = useState(0);
  const [errorMessage,setErrorMessage] = useState('');

  const [loading,setLoading] = useState(false);

 
  const onSubmit= async (event) => {
    event.preventDefault();
    const campaign = await Campaign(props.address)

    setLoading(true);
    setErrorMessage('');
    setValue(0)

    try {
    
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei(value,'ether')

    })
    Router.replaceRoute(`/campaigns/${props.address}`)  //to refresh the page right away

     } catch (err) {
       setErrorMessage(err.message)
     }

     setLoading(false);
  }

  return (
    <>
     <Form onSubmit={onSubmit} error={errorMessage}>
         <Form.Field>
             <label>Amount to Contribute</label>
             <Input
             label='ether'
             labelPosition='right'
             value={value}
             onChange={(event) => setValue(event.target.value)} />
             <Message error header='Oops' content={errorMessage} />
             <Button style={{marginTop:10}} loading={loading} primary >Contribute!</Button>
         </Form.Field>
     </Form>
    </>
  )
}

export default ContributeForm ;