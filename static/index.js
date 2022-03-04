var i = 1;

window.onload = () => {
  let authToken = sessionStorage.getItem('Auth Token')
  //if (!authToken) {
    //window.location.href = '/login';
  //}
  $("#sendbutton").click(() => {
    imagebox = $("#imagebox");
    link = $("#link");
    input = $("#imageinput")[0];
    if (input.files && input.files[0]) {
      let formData = new FormData();
      formData.append("video", input.files[0]);
      $.ajax({
        url: "/detect", // fix this to your liking
        type: "POST",
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        error: function (data) {
          console.log("upload error", data);
          console.log(data.getAllResponseHeaders());
        },
        success: function (data) {
          console.log(data);
          // bytestring = data["status"];
          // image = bytestring.split("'")[1];
          $("#link").css("visibility", "visible");
          if(i == 1){
            $("#download").attr("href", "static/exp/" + data);
            $("#detect-img").attr("src", "static/exp/" + data);
            console.log(i);
            i++;
        }
          else{
            $("#download").attr("href", "static/exp" + i +"/" + data);
            $("#detect-img").attr("src", "static/exp" + i +"/" + data);
            
            console.log(i);
            i++;
          }
          console.log(data);
        },
      });
    }
  });
};

function readUrl(input) {
  imagebox = $("#imagebox");
  console.log(imagebox);
  console.log("evoked readUrl");
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      console.log(e.target);

      imagebox.attr("src", e.target.result);
      //   imagebox.height(500);
      //   imagebox.width(800);
    };
    reader.readAsDataURL(input.files[0]);
  }
}