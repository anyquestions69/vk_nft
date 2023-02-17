const express = require ('express')
const app = express()
const router = require('./routes/index.js')
const path = require('path');
require('dotenv').config();

app.use(express.static(__dirname+'/../public'));
app.use(express.static('contracts'));

app.use('/api', router.router)
app.use('/events', router.events)
app.use('/tickets', router.tickets)
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})
app.get("/show/:eventId", (req,res)=>{
    res.sendFile(path.join(__dirname, '../public', 'event.html'))
})
app.get("/addEvent", (req,res)=>{
    res.sendFile(path.join(__dirname, '../public', 'addEvent.html'))
})

app.listen(process.env.PORT, ()=>{
console.log('works')
})