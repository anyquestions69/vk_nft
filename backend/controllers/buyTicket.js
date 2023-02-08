const Web3 = require('web3')
const web3 = new Web3('http://127.0.0.1:7545')

const abi2 = require('../../contracts/artifacts/TicketNFT.json')

Management={
    instance:'',
    ticket:null,
    account:'',
    
    buyTicket: async function(req,res){
        web3.eth.getAccounts().then(acc=>{
            this.account=acc[0]
           
        })
        const ticket =new web3.eth.Contract(abi2.abi)
        ticket.options.address=req.params["eventId"]
        ticket.methods.buyTicket().send({
            from:this.account,

        })
        console.log(ticket)
        res.json(ticket) 
    }

}
module.exports = Management