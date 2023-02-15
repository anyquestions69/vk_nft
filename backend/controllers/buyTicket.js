const Web3 = require('web3')
const web3 = new Web3('http://127.0.0.1:7545')

const abi2 = require('../../build/contracts/TicketNFT.json')

Management={
    instance:'',
    ticket:null,
    account:'',
    
    buyTicket: async function(req,res){
        const acc = await web3.eth.getAccounts()
        const ticket =new web3.eth.Contract(abi2.abi)
        ticket.options.address=req.params["eventId"]
        let price=await ticket.methods.price().call()
        let alreadyHave = await ticket.methods.confirmOwnership(acc[0]).call()
        console.log(alreadyHave)
        if(alreadyHave){
            res.json({status:false})
        }else{
            let estimateGas = await ticket.methods.buyTicket().estimateGas({value:price})
            console.log(price)
            ticket.methods.buyTicket().send({
                from:acc[0],
                value:price,
                gas:estimateGas
            }).on('receipt', (receipt)=>{
                console.log(receipt)
                res.json(receipt) 
            }).on('error', (error, receipt)=>{
                res.json(error) 
            })
        }
    }

}
module.exports = Management