$(".categories-item").click(function() {
	// xóa bỏ các class xác định hình nào thuộc trang nào trước đó
	$(".image-container[class*='page']").each(function() {
		var classNames = $(this).attr("class").split(" ");
		for (var i = 0; i < classNames.length; i++) {
			if(classNames[i].indexOf("page") > -1)
				$(this).removeClass(classNames[i]);
		}
	});

	// tìm những hình ảnh thuộc loại đó
	var filter, imageContainer, viewLargerImage, categories, imageAlt;

	filter = $(this).text().trim();
	imageContainer = document.getElementsByClassName("image-container");
	if(filter != "All")
		for (var i = 0; i < imageContainer.length; i++) {
			viewLargerImage = imageContainer[i].getElementsByClassName("view-larger-image")[0];
			imageTitle = imageContainer[i].getElementsByClassName("image-title")[0].textContent;
			imageAlt = viewLargerImage.getElementsByClassName("content-image")[0].alt;
			var info = imageAlt.split("_");

			categories = info[2].split(",");
			if(jQuery.inArray(filter, categories) !== -1) {
				imageContainer[i].style.display = "";

				// cho biết những hình ảnh được hiển thị
				$(imageContainer[i]).addClass("showing-image");

				// thiết lập trang
				$(imageContainer[i]).addClass("page" + (Math.floor(i / 24 + 1).toString()));
			}
			else {
				imageContainer[i].style.display = "none";

				// xóa hình ảnh không được hiển thị
				$(imageContainer[i]).removeClass("showing-image");
			}
		}
	else {
		for (var i = 0; i < imageContainer.length; i++) {
			// thiết lập hình ảnh nào thuộc trang nào (24 hình/trang)
			$(imageContainer[i]).addClass("page" + (Math.floor(i / 24 + 1).toString()));
			if(Math.floor(i / 24 + 1) == 1)
				$(imageContainer[i]).addClass("showing-image");
		
			imageContainer[i].style.display = "none";
		}


	}

	// hiển thị đúng số trang với số hình hiện tại
	var images = document.getElementsByClassName("showing-image");
	var maxPages = Math.floor(images.length / 24) + 1;
	$(".cdp").empty(); // xóa hết tất cả các trang hiện có
	$("#none-image").remove(); // xóa dòng chữ NONE IMAGE
	if(images.length > 0) {
		// chèn các trang mới vào
		var appendStr = "<a href='#!-1' class='cdp_i' id='pagePrev' onclick='onClickCdpItem(event)'><< Prev</a>";
		for (var i = 0; i < maxPages; i++) {
			appendStr += "<a href='#!" + (i + 1) + "' class='cdp_i' onclick='onClickCdpItem(event)'>" + (i + 1) + "</a>";
		}
		appendStr += "<a href='#!+1' class='cdp_i' id='pageNext' onclick='onClickCdpItem(event)'>Next >></a>";
		$(".cdp").append(appendStr);

		// hiển thị hình ảnh của trang hiện tại
		$(".page1").css("display", "");
	}
	else $(".cdp").append("<span id='none-image' style='width: 10px; color: black; z-index: 999;'>NONE IMAGE</span>");

	// thay đổi chọn category
	$(".active-category").removeClass("active-category");
	$(this).addClass("active-category");
});