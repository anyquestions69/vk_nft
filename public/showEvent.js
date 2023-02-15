$(async function(){
    let response = await fetch('/event/')
    let result = await response.json();
    console.log(result);
    $("#accountAddress").html('<p>Your address is '+result.account+'</p>')
    $("#balance").html('<p>Your balance is '+result.balance+'</p>')
     
       $("#buy").click(async function(){
         let req = await fetch('/api/buyTicket', {
           method: 'POST'  
         })
         let res = await req.json()
         console.log(res)
       })
 }); 