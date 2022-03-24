$(function () {
  let kVal = localStorage.getItem("kValues");
  let l = JSON.parse(kVal)
  console.log(l)
  
  if(l === null){
    localStorage.setItem('kValues', JSON.stringify({
      k: Number(1)
    }))
    console.log(l.k)
  }

    $('#capture').on('click', function (e) {
      e.preventDefault()
      let d = new Date();
      let hours = d.getHours();
      let minutes = d.getMinutes();
      let seconds = d.getSeconds();
      let date = d.getDate();
      let month = d.getMonth() + 1;
      let year = d.getFullYear();
      if( l.k == 1){
        setTimeout(
          function() 
          {
            $("#capturedImage").attr('src', '/static/capture/' + hours + 'h' + minutes + 'm' + seconds + 's_' + date + '_' + month + '_' + year + '.png');
            localStorage.setItem('kValues', JSON.stringify({
              //Insert Number(value)
              k: Number(2)
           }))
          }, document.getElementById('rate').value *1000);               
      }
      else{
        setTimeout(function() {
          $("#capturedImage").attr('src', '/static/capture' + l.k +'/'  + hours + 'h' + minutes + 'm' + seconds + 's_' + date + '_' + month + '_' + year + '.png');
          localStorage.setItem('kValues', JSON.stringify({
            //Insert Number(value)
            k: Number(l.k += 1)
         }))
        }, document.getElementById('rate').value*1000);
      }
      $.getJSON('/capture',
        function (data) {
          //do nothing
        });
      return false;
    });
  });

  $('#capreset').on('click', () => {
    console.log("Reset");
    CapReset();
  })

  function CapReset() {
    $.getJSON('/capreset',
      function (data) {
        //do nothing
      });
    setTimeout(getcapInfo(), document.getElementById('rate').value*1000);
    return false;
  }
  
  function getcapInfo() {
    $.getJSON("../static/capture.json", function (data) {
      var items = [];
      $.each(data, function (key, val) {
        items.push("<p class='item' id='" + key + "'>"
          + key + " : " + val + "</p>");
      });
  
      console.log(items);
  
      $("#list1").html(items)
    });
  }