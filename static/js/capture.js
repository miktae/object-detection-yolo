$(function () {
    var k = 1;
    $('#capture').on('click', function (e) {
      e.preventDefault()
      let d = new Date();
      let hours = d.getHours();
      let minutes = d.getMinutes();
      let seconds = d.getSeconds();
      let date = d.getDate();
      let month = d.getMonth() + 1;
      let year = d.getFullYear();
      if( k ==1 ){
        setTimeout(
          function() 
          {
            $("#capturedImage").attr('src', '/static/capture/' + hours + 'h' + minutes + 'm' + seconds + 's_' + date + '_' + month + '_' + year + '.png');
            k++;
          }, 30000);               
      }
      else{
        setTimeout(function() {
          $("#capturedImage").attr('src', '/static/capture' + k +'/'  + hours + 'h' + minutes + 'm' + seconds + 's_' + date + '_' + month + '_' + year + '.png');
          k++;
        }, 30000);
      }
      $.getJSON('/capture',
        function (data) {
          //do nothing
        });
      return false;
    });
  });