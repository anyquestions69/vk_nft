const Web3 = require('web3')
const web3 = new Web3('http://127.0.0.1:7545')
const abi = require('../../contracts/artifacts/ticketCreator.json'),
/* if (typeof web3 !== 'undefined') {
    // If a web3 instance is already provided by Meta Mask.
    web3Provider = web3.currentProvider;
    web3 = new Web3(web3.currentProvider);
  } else {
    // Specify default instance if no web3 instance provided
    web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
    web3 = new Web3(web3Provider);
  } */

Management={
    instance:'',
    ticket:null,
    init:  async function () {
        
        return instance
    },
    viewBalance: function(req,response){
        let account;
        let bal;
        web3.eth.getAccounts().then(acc=>{
            account=acc[0]
            return account
        }).then(rrr=>{
            web3.eth.getBalance(rrr).then(res=>{
                bal=res
                response.json({account: account, balance: res})
            })
        }
        )
        
    }, 
    createTicket: async function(req,res){
        const ticket =new web3.eth.Contract(abi.abi)
        ticket.deploy({data:abi.data.bytecode})
         ticket.methods.createTicket(req.body.name,req.body.symbol, req.body.maxAmount, req.body.price)
        .estimateGas({gas: 5000000}, function(error, gasAmount){
            if(gasAmount == 5000000)
                console.log('Method ran out of gas');
        }); 
        res.json(ticket.options)
    }

}
module.exports = Management