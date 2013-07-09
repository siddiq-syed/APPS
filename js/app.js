$.ajaxSetup({ scriptCharset: "utf-8" , contentType: "text/html; charset=utf-8"});

var theScroll;
function scroll(){
    theScroll = new iScroll('wrapper');
}
document.addEventListener('DOMContentLoaded', scroll, false);

$(document).on('click','#tab-bar a', function(e){
    e.preventDefault();
    var nextPage = $(e.target.hash);
   page(nextPage); //You need to add this for it to work
$("#pages .current").removeClass("current");
nextPage.addClass("current");
});

function page(toPage) {
    var toPage = $(toPage),
    fromPage = $("#pages .current");
    if(toPage.hasClass("current") || toPage === fromPage) {
        return;
    };
    toPage.addClass("current fade in").one("webkitAnimationEnd", function(){
        fromPage.removeClass("current fade out");
        toPage.removeClass("fade in")
    });
    fromPage.addClass("fade out");
}
function capturePhoto(){
    navigator.camera.getPicture(uploadPhoto,null,{sourceType:1,quality:60});
}
function uploadPhoto(data){
// this is where you would send the image file to server
    cameraPic.src = "data:image/jpeg;base64," + data;
    // Successful upload to the server
    navigator.notification.alert(
        'Your Photo has been uploaded',  // message
        okay,                           // callback
        'Photo Uploaded',              // title
        'OK'                          // buttonName
    );
    // upload has failed Fail
    /*
    if (failedToUpload){
    navigator.notification.alert(
        'Your Photo has failed to upload',
        failedDismissed,
        'Photo Not Uploaded',
        'OK'
        );
    }
    */
}
function okay(){
    // Do something
}
function getTweets() {
    var q = "ga_paroleboard"
        rpp = 5,
        twurl = "http://twitter.com/search?q=";
    $.getJSON(twurl + q + "&rpp=" + rpp +  "&callback=?", function(data){
        $("#tmpl-tweets").tmpl(data.results).appendTo("#tweets");
    });
}

$(document).on('click','#tweet', function(e){
   getTweets();
});

var map;
function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

$(document).on('click','#gmap', function(e){
   google.maps.event.addDomListener(window, 'load', initialize);
});
