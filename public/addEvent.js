$(document).ready(async function(){
      $('#createTicket').click(async function(event){
        event.preventDefault();
       let ticket={
         name: $('#name').val(),
         symbol:$('#symbol').val(),
         maxAmount: $('#maxAmount').val(),
         price: $('#price').val()
       }
         let req = await fetch('/api/createTicket', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json;charset=utf-8'
           },
           body: JSON.stringify(ticket)
           
       })
          let res=await req.text()
          $('#successlink').text(res)
          $('#successlink').attr("href", "/show/"+res)
          $('#success').show()
           console.log(res)
         
       });
      })