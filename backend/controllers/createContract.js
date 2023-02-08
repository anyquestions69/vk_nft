const Web3 = require('web3')
const web3 = new Web3('http://127.0.0.1:7545')
const abi = require('../../contracts/artifacts/ticketCreator.json')
const abi2 = require('../../contracts/artifacts/TicketNFT.json')

Management={
    account:'',

    viewBalance: function(req,response){
        let account;
        let bal;
        web3.eth.getAccounts().then(acc=>{
            account=acc[0]
            this.account=account
            return account
        }).then(rrr=>{
            web3.eth.getBalance(rrr).then(res=>{
                bal=res
                response.json({account: this.account, balance: res})
            })
        }
        )
        
    }, 
    createTicket: async function(req,res){
        const instance =new web3.eth.Contract(abi.abi)
        instance.options.address='0x1f8Abd5702ACb009493a4164D6B397B0490b5af2'
        let gasAmount = await instance.methods.createTicket(req.body.name,req.body.symbol, req.body.maxAmount, req.body.price).estimateGas()
        instance.methods.createTicket(req.body.name,req.body.symbol, req.body.maxAmount, req.body.price)
         .send({
            from:this.account,
            gas:gasAmount
        }).then( result=>{
            res.send(result.events['0'].address)
         })
       
    },
    showEvent: async function(req,res){
        let resObj={
            name:'',
            symbol:'',
            creator:'',
            price:'',
            maxAmount:''
        }
        const ticket =new web3.eth.Contract(abi2.abi)
        ticket.options.address=req.params["eventId"]
        console.log(req.params["eventId"])
        console.log(ticket.methods)
        
        resObj.maxAmount= await ticket.methods.maxAmount().call()
        resObj.name= await ticket.methods.name().call()
        resObj.symbol= await ticket.methods.symbol().call()
        resObj.price=await ticket.methods.price().call()
        resObj.creator=await ticket.methods.creator().call()
        console.log(resObj)
        res.json(resObj)
        /* let price = await ticket.methods.price().call()
        let name = await ticket.methods.name_().call()
        let symbol = await ticket.methods.symbol_().call()
        let author = await ticket.methods.creator().call() */
        //res.json({price:price,name:name, author:author, maxAmount:maxAmount, symbol: symbol})
    }

}
module.exports = Management