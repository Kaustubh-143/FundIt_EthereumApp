import React,{useState} from 'react'
import {Link,Router} from '../../../routes'
import {Button, Message, Form ,Input} from 'semantic-ui-react'
import Campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import Layout from '../../../components/Layout'

const NewRequest = (props) => {

    NewRequest.getInitialProps = (props) => {
      const address = props.query.token;
      console.log(props.query)

      return {address}
    }

    const [description, setDescription] = useState(''); 
    const [value, setValue] = useState('');
    const [recipient, setRecipient] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    console.log(props.address);

    
    const onSubmit = async (event) => {
      event.preventDefault(); 
      setLoading(true);
      setError('');

      const accounts= await web3.eth.getAccounts();

      try {

        const campaign = await Campaign(props.address) ;
        await campaign.methods.createRequest(description,web3.utils.toWei(value,'ether'),recipient).send({
            from:accounts[0],
        })
        
       Router.pushRoute(`/campaigns/${props.address}/requests`); 
      } catch (error) {
          setError(error.message);
      }

      setLoading(false);
    }


  return (
    <Layout>
     
     <Form onSubmit={onSubmit} error={error}>
         <Form.Field>
             <label>Description</label>
             <Input value={description} onChange={event => setDescription(event.target.value)} />
         </Form.Field>

         <Form.Field>
             <label>Amount in ether</label>
             <Input value={value} onChange={event => setValue(event.target.value)} />
         </Form.Field>

         <Form.Field>
             <label>Recipient</label>
             <Input value={recipient} onChange={event => setRecipient(event.target.value)} />
         </Form.Field>

         <Message error header='Oops!' content={error} />

         <Button loading={loading} primary>Create New Request</Button>
     </Form>
    </Layout>
  )
}

export default NewRequest;