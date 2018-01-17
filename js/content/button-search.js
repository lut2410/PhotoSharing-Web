 $( "#search-button" ).keyup(function(e) {
	var filter, imageContainer, viewLargerImage, imageTitle, categories, imageAlt, photographer;
	var totalImageView = 0;
	filter = this.value.trim().toUpperCase();
	
	if($(".active-category").text().trim() == "All") {
		imageContainer = document.getElementsByClassName("image-container");
		for (var i = 0; i < imageContainer.length; i++) {
			viewLargerImage = imageContainer[i].getElementsByClassName("view-larger-image")[0];
			imageTitle = imageContainer[i].getElementsByClassName("image-title")[0].textContent;
			imageAlt = viewLargerImage.getElementsByClassName("content-image")[0].alt;
			var info = imageAlt.split("_");
			categories = info[2].replace(",", "_______");
			photographer = info[5].toUpperCase();
			if(imageTitle.toUpperCase().indexOf(filter) > -1 || categories.toUpperCase().indexOf(filter) > -1 || 
				photographer.toUpperCase().indexOf(filter) > -1) {
				imageContainer[i].style.display = "";
				if(!$(imageContainer[i]).hasClass("showing-image"))
					$(imageContainer[i]).addClass("showing-image");
				totalImageView++;
			}
			else {
				imageContainer[i].style.display = "none";
				if($(imageContainer[i]).hasClass("showing-image"))
					$(imageContainer[i]).removeClass("showing-image");
			}
		}
	}
	else {
		imageContainer = document.getElementsByClassName("showing-image");
		for (var i = 0; i < imageContainer.length; i++) {
			viewLargerImage = imageContainer[i].getElementsByClassName("view-larger-image")[0];
			imageTitle = imageContainer[i].getElementsByClassName("image-title")[0].textContent;
			imageAlt = viewLargerImage.getElementsByClassName("content-image")[0].alt;
			var info = imageAlt.split("_");
			categories = info[2].replace(",", "_______");
			photographer = info[5].toUpperCase();
			if(imageTitle.toUpperCase().indexOf(filter) > -1 || categories.toUpperCase().indexOf(filter) > -1 || 
				photographer.toUpperCase().indexOf(filter) > -1) {
				imageContainer[i].style.display = "";
				totalImageView++;
			}
			else {
				imageContainer[i].style.display = "none";
			}
		}
	}

	var maxPages = Math.floor(totalImageView / 24) + 1;
	$(".cdp").empty(); // xóa hết tất cả các trang hiện có
	if(Math.floor(totalImageView / 24) > 0) {
		// chèn các trang mới vào
		var appendStr = "<a href='#!-1' class='cdp_i' id='pagePrev' onclick='onClickCdpItem(event)'><< Prev</a>";
		for (var i = 0; i < maxPages; i++) {
			appendStr += "<a href='#!" + (i + 1) + "' class='cdp_i' onclick='onClickCdpItem(event)'>" + (i + 1) + "</a>";
		}
		appendStr += "<a href='#!+1' class='cdp_i' id='pageNext' onclick='onClickCdpItem(event)'>Next >></a>";
		$(".cdp").append(appendStr);
	}
});

//  function hasValue(elem) {
//     return $(elem).filter(function() { return $(this).val(); }).length > 0;
// }
// $(document).on('input', '.my-class', function(){
//     alert('Input changed');
// });hasValue("#my-input-id");
