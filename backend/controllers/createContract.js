const Web3 = require('web3')
const web3 = new Web3('http://127.0.0.1:7545')
const abi = require('../../build/contracts/ticketCreator.json')
const abi2 = require('../../build/contracts/TicketNFT.json')
require('dotenv').config();
const address =process.env.ADDRESS

Management={
    account:'',
    createTicket: async function(req,res){
        const instance =new web3.eth.Contract(abi.abi)
        instance.options.address=address
        let account = await web3.eth.getAccounts()
        let gasAmount = await instance.methods.createTicket(req.body.name,req.body.symbol, req.body.maxAmount, req.body.price).estimateGas()
        instance.methods.createTicket(req.body.name,req.body.symbol, req.body.maxAmount, req.body.price)
         .send({
            from:account[0],
            gas:gasAmount
        }).then( result=>{
            res.send(result.events['0'].address)
         })
       
    },
    showAll: async function(req,res){
        const instance =new web3.eth.Contract(abi.abi)
        instance.options.address=address
        let amount = await instance.methods.indexOfDb().call()
        let tickets = []
        let contractTicket =[]
        for(let i=0;i<amount;i++){
            contractTicket[i] = new web3.eth.Contract(abi2.abi)
            contractTicket[i].options.address = await instance.methods.allEvents(i).call()
            tickets[i] = {
                name : await contractTicket[i].methods.name().call(),
                symbol : await contractTicket[i].methods.symbol().call(),
                price : await contractTicket[i].methods.price().call(),
                creator : await contractTicket[i].methods.creator().call(),
                totalAmount : await contractTicket[i].methods.totalAmount().call(),
                maxAmount : await contractTicket[i].methods.maxAmount().call(),
                source: contractTicket[i].options.address
                }
        }
        res.json(tickets)
       
    },
    showEvent: async function(req,res){
        let resObj={
            name:'',
            symbol:'',
            creator:'',
            price:'',
            maxAmount:'',
            totalAmount:''
        }
        const ticket =new web3.eth.Contract(abi2.abi)
        ticket.options.address=req.params["eventId"]
        resObj.maxAmount= await ticket.methods.maxAmount().call()
        resObj.totalAmount=resObj.maxAmount-(await ticket.methods.totalAmount().call())
        resObj.name= await ticket.methods.name().call()
        resObj.symbol= await ticket.methods.symbol().call()
        resObj.price=await ticket.methods.price().call()
        resObj.creator=await ticket.methods.creator().call()
        res.json(resObj)
       
    },
    showAllTickets: async function (req,res) {  
        let acc = await web3.eth.getAccounts()
        const instance =new web3.eth.Contract(abi.abi)
        instance.options.address=address
        let amount = await instance.methods.indexOfDb().call()
        let tickets = []
        let contractTicket =[]
        for(let i=0,j=0;i<amount;i++){
            contractTicket[i] = new web3.eth.Contract(abi2.abi)
            contractTicket[i].options.address = await instance.methods.allEvents(i).call()
            if(await contractTicket[i].methods.confirmOwnership(acc[0])){
                tickets[j]={
                    name : await contractTicket[i].methods.name().call(),
                    symbol : await contractTicket[i].methods.symbol().call(),
                    price : await contractTicket[i].methods.price().call(),
                    source: contractTicket[i].options.address,
                    ticketId : await contractTicket[i].methods.getTokenIdByOwner(acc[0]).call()
                }
                j++;
            }
        }
        res.json(tickets)
    }

}
module.exports = Management