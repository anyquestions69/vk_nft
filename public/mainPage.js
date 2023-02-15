$(document).ready(async function(){
  
    let response = await fetch('/events/')
    let result = await response.json();
    if(result.length==0){
        $("#content").append('<h3>Нет событие</h3>')
    }
    for(let i=0; i<result.length;i++){
        $("#content").append(`<tr style="height: 65px">
        
        <td class="u-border-1 u-border-no-left u-border-no-right u-border-palette-5-light-2 u-table-cell">
        <a href="/show/${result[i].source}" style="color:black">${result[i].name}</a></td>
        <td class="u-border-1 u-border-no-left u-border-no-right u-border-palette-5-light-2 u-table-cell">${result[i].maxAmount}</td>
        <td class="u-border-1 u-border-no-left u-border-no-right u-border-palette-5-light-2 u-table-cell">${result[i].maxAmount-result[i].totalAmount}</td>
        <td class="u-border-1 u-border-no-left u-border-no-right u-border-palette-5-light-2 u-table-cell">${result[i].price}</td>
      </tr>`)
    }
  
 }); 