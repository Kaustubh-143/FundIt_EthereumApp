import React from 'react'
import Layout from '../../../components/Layout'
import {Link} from '../../../routes'
import Campaign from '../../../ethereum/campaign'
import {Button,Table} from 'semantic-ui-react' 
import RenderRow from '../../../components/RenderRow'

const RequestIndex = (props) => {
  
    RequestIndex.getInitialProps = async (props) => {
        const address = props.query.token;
        console.log(props.query);

        const campaign = await Campaign(address);
        const requestsCount = await campaign.methods.getRequestsCount().call();
        // const approversCount = await campaign.methods.approversCount().call();

        //some fancy javascript

        const requests = await Promise.all(
          Array(parseInt(requestsCount)).fill()  //There's one small problem - getRequestsCount returns a number inside a string, but the Array  constructor expects to be passed a number, not a string.  To fix this, we can use the parseInt  function on requestCount before passing it into Array . 
          .map((element,index) => {
            return campaign.methods.requests(index).call()
          } )
        )

        return {address,requests,requestsCount};
    }

    console.log(props.address);
    console.log(props.requests);

    const renderRequestRow = () => {
      return props.requests.map((request,index) => {
        return <RenderRow 
        key={index}
        request={request}
        id={index}
        address={props.address}
        // approversCount={props.approversCount}
         />
      })
    }


  return (
    <Layout> 
        <h3>Requests</h3>
        <Link route={`/campaigns/${props.address}/requests/new`} >
        <a>
        <Button floated style={{marginBottom:10}} primary>Add Request!</Button>
        </a>
        </Link>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Recipient</Table.HeaderCell>
              <Table.HeaderCell>ApprovalCount</Table.HeaderCell>
              <Table.HeaderCell>Approvals</Table.HeaderCell>
              <Table.HeaderCell>Finalize</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {renderRequestRow()}
          </Table.Body>
        </Table>
        <div>
          <h3>Found {props.requestsCount} request(s)</h3>
        </div>
    </Layout>
  )
}

export default RequestIndex;