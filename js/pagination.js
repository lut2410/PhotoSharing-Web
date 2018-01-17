/* 
this javascript is only to change the "actpage" attribut on the .cdp div
*/

function onClickCdpItem(event) {
  var paginationPage = parseInt($('.cdp').attr('actpage'), 10);
  var go = $(event.target).attr('href').replace('#!', '');
  
  if (go === '+1') {
    paginationPage++;

  } else if (go === '-1') {
    paginationPage--;
  }else{
    paginationPage = parseInt(go, 10);
  }

  $('.cdp').attr('actpage', paginationPage);

 $(".image-container[class*='page']").each(function() {
    var visible = $(this).attr("class").indexOf("page" + paginationPage) > -1 ? true : false;
    if(visible)
      $(this).css("display", "");
    else $(this).css("display", "none");
  });
}