function onKeyUpSearchBtn() {
	var input, filter, imageContainer, viewLargerImage, imageTitle, categories, imageAlt;

	input = document.getElementById("search-button");
	filter = input.value.toUpperCase();
	imageContainer = document.getElementsByClassName("image-container");
	for (var i = 0; i < imageContainer.length; i++) {
		viewLargerImage = imageContainer[i].getElementsByClassName("view-larger-image")[0];
		imageTitle = imageContainer[i].getElementsByClassName("image-title")[0].textContent;
		imageAlt = viewLargerImage.getElementsByClassName("content-image")[0].alt;
		var info = imageAlt.split("_");
		categories = info[2].replace(",", "_______");
		if(imageTitle.toUpperCase().indexOf(filter) > -1) {
			imageContainer[i].style.display = "";
		}
		else {
			if(info[2].toUpperCase().indexOf(filter) > -1)
				imageContainer[i].style.display = "";
			else imageContainer[i].style.display = "none";
		}
	}
}