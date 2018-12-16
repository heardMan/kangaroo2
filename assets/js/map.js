
// Initialize and add the map
var initMap = function (position) {
    if (position) {
        // The location of defaultPos
        var latitude = position.coords.latitude
        var longitude = position.coords.longitude
        var userPosition = { lat: latitude, lng: longitude };
        // The map, centered at defaultPos
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 8, center: userPosition });
            var lax = { lat: 34.0522, lng: -118.2437 };

        newMarker(userPosition, map, "You Here");
newMarker(lax, map, "LAX Here");
addSomePostMArkers(map);

        window.localStorage.setItem("userLat",userPosition.lat);
        window.localStorage.setItem("userLng",userPosition.lng);
        
    }

}

function newMarker(pos, aMap, content){
    var contentString = content;

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var userMarker = new google.maps.Marker({
            position: pos,
            map: aMap,
        });
        userMarker.addListener('click', function () {
            infowindow.open(map, userMarker);
        });
}

function addSomePostMArkers(mapa){
    firebase.database().ref().child("posts").on("value", function(snapshot) {
        var postsLength = snapshot.numChildren();

        //console.log(postsLength);
        firebase.database().ref().child("posts").on("child_added", function(snapshot) {
            var post = snapshot.val();
            console.log(post);
            var latitude = parseFloat(post.lat);
            var longitude = parseFloat(post.lng);
            var position = { lat: latitude, lng: longitude };
            console.log(position);
            var content = "<div><p>Name: "+post.userName+"</p><p>Date: "+post.departureDate+"</p><p>Contact: "+post.contactInfo+"</p></div>";
            newMarker(position, mapa, content);
             
          });

        
      })
}



// function moveToLocation(lat, lng){
//     var center = new google.maps.LatLng(lat, lng);
//     var map = document.getElementById("");
//     map.panTo(center);
//  }





// Default map to show
// Initialize and add the map
var defaultMap = function () {
    // The location of lax
    var latitude = 34.0522;
    var longitude = -118.2437;
    var lax = { lat: latitude, lng: longitude };
    // The map, centered at lax
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 8, center: lax });
    // The marker, positioned at lax
    // var marker = new google.maps.Marker({ position: lax, map: map });
    newMarker(lax, map, "LAX Here");
    addSomePostMArkers(map);
}
$(document).ready(function () {
    defaultMap();
    navigator.geolocation.getCurrentPosition(initMap);
    
});
