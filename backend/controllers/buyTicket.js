const Web3 = require('web3')
const web3 = new Web3('http://127.0.0.1:7545')
require('dotenv').config();
const {
    S3
} = require("@aws-sdk/client-s3")
const s3 = new S3({endpoint: 'https://s3.filebase.com', signatureVersion: 'v4',region: 'us-east-1'});
const abi2 = require('../../build/contracts/TicketNFT.json')

function Upload(bucket, name,owner) {
    var params = {
        Bucket: 'tickets',
        Key: name,
        ContentType: 'text/plain',
        Metadata:{
            owner:owner
        }
    };
    s3.putObject(params, function(error, data) {
        if (error) {
          console.error(error);
        } else {
          console.log('Successfully uploaded file' + name + ":" + bucket);
        }
    });
 }

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
                console.log(receipt.events.Transfer.returnValues)
                //Upload('tickets', 'firstadd', 'me')
                res.json(receipt) 
            }).on('error', (error, receipt)=>{
                res.json(error) 
            })
        }
    },
    showTicket: async function(req,res){
        const ticket =new web3.eth.Contract(abi2.abi)
        ticket.options.address=req.params["eventId"]
        let ticketName= await ticket.methods.name().call()
        let owner=await ticket.methods.getTokenById(req.params["ticketId"]).call()
        res.json({
            name: ticketName+"#"+req.params["ticketId"],
            owner: owner
        })
    },
    confirmOwnership: async function (req,res) { 
        const acc = await web3.eth.getAccounts()
        const ticket =new web3.eth.Contract(abi2.abi)
        ticket.options.address=req.params["eventId"]
        let owner=await ticket.methods.confirmOwnership(acc[0]).call()
        res.json({isOwner:owner})
    }

}
module.exports = Management