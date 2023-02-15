$(document).ready(async function(){
  
   let response = await fetch('/events/'+window.location.pathname.split('show')[1])
   let result = await response.json();
   console.log(result);
   $("#name").text(result.name)
   $("#maxAmount").text(result.maxAmount)
   $("#totalAmount").text(result.totalAmount)
   $("#price").text(result.price)
    

      $("#buy").click(async function(){
        let req = await fetch('/events'+window.location.pathname.split('show')[1]+'/buyTicket', {
          method: 'POST'  
        })
        let res = await req.json()
        console.log(res)
      })
}); 