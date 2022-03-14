pragma solidity ^0.4.17;


contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) {
       address newCampaign= new Campaign(minimum,msg.sender);
       deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {

    struct Request {
        string description;
        uint value;
        address reciever;
        mapping(address => bool) approvals;
        uint yesCount ;
        bool isFinal ;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint approversCount = 0;
    Request[] public requests;

    modifier restricted() {
        require(msg.sender == manager) ;
        _;
    }

    function Campaign(uint minimum, address creator) public {
          manager = creator;
          minimumContribution = minimum ;
    }

    function contribute() public payable {
         require(msg.value >= minimumContribution) ;
         approvers[msg.sender] = true ;
         approversCount++;
    }

    function createRequest(string des, uint value, address reciever) public restricted {
           Request memory newRequest = Request({
               description: des,
               value: value,
               reciever: reciever,
               yesCount:0,
               isFinal: false
           }) ;

           requests.push(newRequest);
    }

    function approveRequest(uint index) public {
          Request storage request = requests[index]; 
          require(approvers[msg.sender]);
          require(request.approvals[msg.sender] == false) ;
          request.approvals[msg.sender] = true;
          request.yesCount++ ;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(request.isFinal == false) ;
        require(request.yesCount > (approversCount/2)) ;
        request.reciever.transfer(request.value) ;
        request.isFinal = true ;
    }

    function getSummary() public view returns (
        uint,uint,uint,uint,address
    ) {
        return (
            this.balance,
            minimumContribution,
            requests.length,
            approversCount,
            manager 
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }


}