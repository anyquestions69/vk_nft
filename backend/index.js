const express = require ('express')
const app = express()
const router = require('./routes/index.js')

app.use(express.static('public'));
app.use(express.static('contracts'));

app.use('/api', router.router)
app.use('/events', router.events)
app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/src/index.html')
})

app.listen(3000, ()=>{
console.log('works')
})