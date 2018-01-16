const imageName = 0;
const imagViewDownload = 1;
const imageCategory = 2;
const imageDateUpload = 3;
const avatarName = 4;
const photographerName = 5;
const totalPhotos = 6;
var imageUrl;
var image;

$('.view-larger-image').click(function(event) {
	imageUrl = $(this).find(".content-image").attr("src");
	image = new Image;
	image.src = imageUrl;
	image.alt = $(this).find(".content-image").attr("alt");
	$("#larger-image").attr("src", imageUrl);

	var info = image.alt.split("_");

	// đổi background, tiêu đề, nội dung của hình ảnh
	$("#larger-image").css("background-image", "url('" + imageUrl + "')");
	$("#larger-image").attr("data-title", info[imageName]);
	// đổi tên hình ảnh
	$("#image-name").text(info[imageName]);

	// đổi số lượt xem, tải xuống
	$("#image-view-download").text(info[imagViewDownload]);

	// thay đổi category
	// gỡ bỏ link và ký tự phân cách của category đi
	$(".image-category").remove();
	$(".category").remove();
	$(".cate-split-char").remove();
	var cate = info[imageCategory].split(",");
	var splitChar = "<span class='cate-split-char'>/</span>";
	var appendStr = "<div class='col-md-7 col-xs-7' style='padding-left: 0;'>Categories: </div><div class='col-md-5 col-xs-5'>";
	for (var i = 0; i < cate.length; i++) {
		appendStr += "<a class='category'>" + cate[i] + "</a>";

		if(i+1 < cate.length)
			appendStr += splitChar;
	}
	appendStr += "</div>";
	$("#image-category").text("");
	$("#image-category").append(appendStr);

	// thay đổi ngày tải lên
	$(".image-date-upload").remove();
	$("#image-date-upload").text("");
	appendStr = "<div class='col-md-7 col-xs-7' style='padding-left: 0;'>Upload at: </div>";
	appendStr += "<div class='col-md-5 col-xs-5'>" + info[imageDateUpload] + "</div>";
	$("#image-date-upload").append(appendStr);

	// thay đổi kích thước
	$(".image-size").remove();
	$("#image-size").text("");
	appendStr = "<div class='col-md-7 col-xs-7' style='padding-left: 0;'>Size: </div>";
	appendStr += "<div class='col-md-5 col-xs-5'>" + image.width + "x" + image.height + "</div>";
	$("#image-size").append(appendStr);


	// hiển thị thông tin photographer
	// hiển thị hình ảnh đại diện
	$("#avatar-image").attr("src", "images/avatar/" + info[avatarName]);

	// hiển thị tên photographer
	$("#photographer-name").text(info[photographerName]);

	// hiển thị số hình ảnh đã tải lên
	$("#total-photos").text(info[totalPhotos]);

	// hiển thị số sao của hình ảnh
	$("#image-detail-rating").empty();
	appendStr = "<div class='row'>" + $(this).parent().find(".rating").html() + "</div>";

	// hiển thị xem hình ảnh có được yêu thích không?
	if($(this).hasClass("loved"))
		appendStr += "<img id='image-detail-favourite-button' class='row loved' src='images/favourite-red.png' onmouseover='onMouseOverFavBtn(this)' onmouseout='onMouseOutFavBtn(this)'/>";
	else appendStr += "<img id='image-detail-favourite-button' class='row' src='images/favourite-gray.png' onmouseover='onMouseOverFavBtn(this)' onmouseout='onMouseOutFavBtn(this)'/>";
	
	// hiển thị nút "Download"
	appendStr += "<a href='" + imageUrl + "' download><button id='download-button' onmouseover='onMouseOverDownloadBtn(this)' onmouseout='onMouseOutDownloadBtn(this)'>Download</button></a>";
	$("#image-detail-rating").append(appendStr);

	// thêm bình luận
	// ẩn bình luận đi
	$(".comment-container").css("visibility", "hidden");
	$(".comment-container").css("height", "0px");

	$(".dialogbox").remove();
	var comment = $(this).parent().find(".comment-content").text();
	if(comment.trim() != "") {
		var comments = comment.split("___");

		for (var i = 0; i < comments.length; i++) {
			var commentInfo = comments[i].split("_");
			var str = "<div class='dialogbox row'>"
			str += "<div class='col-md-1 col-xs-1'>"
			var avatarID = 1;
			switch(commentInfo[0]) {
				case "Uzumaki Naruto": 
					avatarID = 1;
					break;
				case "Bảo Anh":
					avatarID = 4;
					break;
				case "Funny Senjus":
					avatarID = 2;
					break;
				case "Doraemon":
					avatarID = 3;
					break;
				default: avatarID = 1; break;
			}
			str += "<img class='avatar-user' class='row' src='images/avatar/avatar" + avatarID + ".png'/>";
			str += "</div>";
			str += "<div class='col-md-11 col-xs-11 .comment-body'>";
			str += "<span class='row'>";
			str += "<span class='user-name'>" + commentInfo[0] + "</span>";
			str += "<span class='time-comment'> " + commentInfo[1] + "</span>";
			str += "</span>";
			str += "<div class='message' class='row'>";
			str += "<span id='comment-content'>" + commentInfo[2] + "</span>";
			str += "</div>";
			str += "</div>";
			str += "</div>";
			$(".comment-container").append(str);
		}

		$("#comment-total").text(comments.length + (comments.length > 1 ? " comments" : " comment"));
	}
	else $("#comment-total").text("0 comment");
});

$('.view-larger-image').hover(function() {
	var id = $(this).attr("id");
	$(this).parent().find(".favourite-button-on-small-image").css("visibility", "visible");

});

$('.view-larger-image').mouseleave(function() {
	$(".favourite-button-on-small-image").css("visibility", "hidden");
});

// ----------------favourite-button-on-small-image-----------------------
$('.favourite-button-on-small-image').hover(function(e) {
	$(this).css("visibility", "visible");
	if(!($(this).parent().hasClass("loved")))
		$(this).attr('src', "images/favourite-red.png");

	getPixelColor(this, e);
});

$('.favourite-button-on-small-image').mouseleave(function() {
	if(!($(this).parent().hasClass("loved")))
		$(this).attr('src', "images/favourite-white.png");
	else $(this).attr('src', "images/favourite-red.png");
});

$('.favourite-button-on-small-image').click(function() {
	if(!($(this).parent().hasClass("loved"))) {
		$(this).parent().addClass("loved");
	}
	else {
		$(this).parent().removeClass("loved");
	}
});
// ----------------end favourite-button-on-small-image-----------------------

// ----------------comment-----------------------
$("#comment-link").click(function() {
	if($(".comment-container").css("visibility") == "hidden") {
		$(".comment-container").css("visibility", "visible");
		$(".comment-container").css("height", "320px");
	}
	else {
		$(".comment-container").css("visibility", "hidden");
		$(".comment-container").css("height", "0px");
	}
});
// ----------------end comment-----------------------
function onMouseOverFavBtn(element) {
	element.src = "images/favourite-red.png";
};

function onMouseOutFavBtn(element) {
	if(hasClass(element, "loved"))
		element.src = "images/favourite-red.png";
	else element.src = "images/favourite-gray.png";
};

function onMouseOverDownloadBtn(element) {
	element.style.backgroundColor = "#454545";
};

function onMouseOutDownloadBtn(element) {
	element.style.backgroundColor = "#aaaaaa";
};

$(document).ready(function() {

	 // thay đổi tiêu đề hình ảnh
	var images = document.getElementsByClassName("view-larger-image");
	
	for (var i = 0; i < images.length; i++) {
		var image = images[i];

		// thiết lập tên của hình ảnh
		var titleElement = image.parentElement.getElementsByTagName("p")[0];
		var alt = image.getElementsByTagName("img")[0].alt;
		titleElement.innerHTML = alt.split("_")[0];
	}
	var elements = document.querySelectorAll( '.demo-image' );
    Intense( elements );
});

function hasClass(element, className) {
    return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
}