import React from 'react'
import {Button, Table} from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import Campaign from '../ethereum/campaign'

const RenderRow = (props) => {

  const {Cell,Row} = Table;

  const approveReq = async () => {
      const campaign = await Campaign(props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(props.id).send({
        from: accounts[0]
      })
  }

  const finalizeReq = async () => {
    const campaign = await Campaign(props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(props.id).send({
      from: accounts[0]
    })
  }

  return (
       <Row disabled={props.request['isFinal']}>
         <Cell>{props.id}</Cell>
         <Cell>{props.request.description}</Cell>
         <Cell>{web3.utils.fromWei(props.request['1'],'ether')} ether</Cell>
         <Cell>{props.request.reciever}</Cell>
         <Cell>{props.request['yesCount']}</Cell>
         <Cell>
           {props.request['isFinal'] ? null : (
           <Button basic color='green' onClick={approveReq}>Approve</Button> 
           )}
         </Cell>
         <Cell>       
           <Button basic color='teal' onClick={finalizeReq}>Finalize</Button>
         </Cell>
       </Row>
  )
}

export default RenderRow 