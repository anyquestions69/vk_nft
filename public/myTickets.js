$(document).ready(async function(){
  
    let response = await fetch('/tickets/')
    let result = await response.json();
    if(result.length==0){
        $("#content").append('<h3>Нет билетов</h3>')
    }
    console.log(result)
    for(let i=0; i<result.length;i++){
        $("#content").append(`<div class="u-blog-post u-container-style u-repeater-item u-repeater-item-1">
        <div class="u-container-layout u-similar-container u-container-layout-1"><!--blog_post_header-->
          <h2 class="u-blog-control u-text">
            <a class="u-post-header-link" href="/tickets/${result[i].source}/${result[i].ticketId}">${result[i].name}#${result[i].ticketId}</a>
          </h2>
          <a class="u-post-header-link" href="/tickets/${result[i].source}/${result[i].ticketId}">
            <img src="images/8ad73f3c.jpeg" alt="" class="u-blog-control u-expanded-width u-image u-image-default u-image-1">
          <div class="u-blog-control u-post-content u-text">${result[i].price}</div>
        </div>
      </div>`)
    }
  
 }); 