$(async function(){
   let response = await fetch('/api/showBalance')
   let result = await response.json();
   console.log(result);
   $("#accountAddress").html('<p>Your address is '+result.account+'</p>')
   $("#balance").html('<p>Your balance is '+result.balance+'</p>')
    
     $("#createTicket").click(async function(){
      let ticket={
        name: $('#name').val(),
        symbol:$('#symbol').val(),
        maxAmount: $('#maxAmount').val(),
        price: $('#price').val()
      }
      console.log(ticket)
        let req = await fetch('/api/createTicket', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(ticket)
          
      })
         let res=await req.text()
         
          console.log(res)
        
      });


      $("#buy").click(async function(){
        let req = await fetch('/api/buyTicket', {
          method: 'POST'  
        })
        let res = await req.json()
        console.log(res)
      })
}); 