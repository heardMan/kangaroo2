function getCoordinates(query) {
    $.ajax({
        url: 'https://www.mapquestapi.com/geocoding/v1/address?key=oJemIAUX2z50LZNB78Pv7gEpOJ6GJ0ZE&inFormat=kvp&outFormat=json&location=' + query + '&thumbMaps=false',
        type: 'GET',

        dataType: 'json',
        success: function (response) {
            var lat = response.results[0].locations[0].latLng.lat;
            var long = response.results[0].locations[0].latLng.lng;
            var coordinates = { latitude: lat, longitude: long }
            makeSearchMap(lat, long);
            console.log(response.results[0].locations);
            console.log(lat);
            console.log(long);
            return coordinates;
        },
        error: function (request, error) {
            console.log("Aw, Shit!!!")
        }
    });
}

function writeNewPost(name, date, contact, latitude, longitude) {
    var newPostKey = firebase.database().ref().child('posts').push().key;
    
    var userLat = latitude;
    var userLng = longitude;
    var postData = {
        postKey: newPostKey,
        userName: name,
        departureDate: date,
        contactInfo: contact,
        lat: userLat,
        lng: userLng
    };
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    return firebase.database().ref().update(updates);
}

function createNewPost() {
    $("#submitNewPost").on("click", function (e) {
        e.preventDefault();
        var postName = $("#newPostName").val();
        var postDate = $("#newPostDate").val();
        var postOrigin = $("#newPostOrigin").val();
        var postContact = $("#newPostPhone").val();
        $.ajax({
            url: 'https://www.mapquestapi.com/geocoding/v1/address?key=oJemIAUX2z50LZNB78Pv7gEpOJ6GJ0ZE&inFormat=kvp&outFormat=json&location=' + postOrigin + '&thumbMaps=false',
            type: 'GET',

            dataType: 'json',
            success: function (response) {

                if (!postOrigin) {
                    var latitude = window.localStorage.getItem("userLat");
                    var longitude = window.localStorage.getItem("userLng");
                } else {
                    var latitude = response.results[0].locations[0].latLng.lat;
                var longitude = response.results[0].locations[0].latLng.lng;
                    
                }

                
                writeNewPost(postName, postDate, postContact, latitude, longitude);
                console.log(response.results[0].locations);
                console.log(latitude);
                console.log(longitude);

            },
            error: function (request, error) {
                alert("Request: " + JSON.stringify(request));
            }
        });
        //writeNewPost(postName, postDate, postContact);
        $("#newPostName").val("");
        $("#newPostDate").val("");
        $("#newPostOrigin").val("");
        $("#newPostPhone").val("");


    })

}

$(document).ready(function () {
    ///Menu Toggle Script
    $("#side-menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $('.sidenav').sidenav("open");
    });

    $('.datepicker').datepicker();

    $('.sidenav').sidenav();

    $(".new-post").click(function () {
        $('.modal').modal();
        $("#wrapper").toggleClass("toggled");
    });

    $("#closeMenu").click(function () {
        $('.sidenav').sidenav("close");

    });

    createNewPost();


});