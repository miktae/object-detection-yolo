document.getElementById('sendbutton').onclick = () => setTimeout(function() {
 getJSON("../static/product.json") 
 $("#list1").css("display", "none")
 $("#list").css("display", "flex")
}, 3000)

document.getElementById('capture').onclick = () => setTimeout(function() {
  getJSON("../static/capture.json") 
  $("#list").css("display", "none")
  $("#list1").css("display", "flex")
 }, 4000)

function getJSON(url){
$.getJSON(url, function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<p class='item' id='" +  key + "'>" 
    + key + " : " + val + "</p>" );
  });
 
  console.log(items);
  $("#list").html( items )

  $("#list1").html( items )
});}