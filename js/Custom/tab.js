$("document").ready(function(){
  $(".tab-slider--body").hide();
  $(".tab-slider--body:first").show();
});

$(".tab-slider--nav li").click(function() {
  $(".tab-slider--body").hide();
  var activeTab = $(this).attr("rel");
 //  // $('.tab-slider--trigger.active').eq(0).attr('rel');
  $("#"+activeTab).fadeIn();
  //reset tab1
  $('.tab-slider--tabs').removeClass('slide');
  $('.tab-slider--tabs').removeClass('slide2');
  //specify
  if($(this).attr("rel") == "tab2"){
    $('.tab-slider--tabs').addClass('slide');
  }
  else if($(this).attr("rel") == "tab3")
  {
    $('.tab-slider--tabs').addClass('slide2');
  }

  $(".tab-slider--nav li").removeClass("active");
  $(this).addClass("active");
});