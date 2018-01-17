function readURL(input) {

if (input.files && input.files[0]) 
  {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#blah').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
     show_Detail();
  }
}

$("#imgInp").change(function() {
  readURL(this);
});


// detail upload
function show_Detail() {
    // if (document.getElementById('yesCheck').checked)
    //  {
        document.getElementById('detail_upload').style.display = 'block';
        document.getElementById('detail_instruction').style.display = 'none';
    // }
    // else document.getElementById('ifYes').style.display = 'none';

}
// document.getElementById("mm").onclick = function() {myFunction()};
// function myFunction() {
//     document.getElementById("ifYes").classList.toggle("show");
// }