$(document).ready(function () {

    $("#sidebar").show(300);//brings in the side bar which contains the search form

    //displays the current location map and the close button, also hides the current location tab
    $('.pull-me-right').click(function(){
        $('.pull-me-right').fadeOut('fast');
        $('.slide-right-close').show('fast');
        $('#panel-right').show('fast');
        $('#map-canvas2').show('fast');
    });

    //does the opposite of above when you click on teh close button
    $('.slide-right-close').click(function(){
        $('#panel-right').hide('fast');
        $('.slide-right-close').hide('fast');
        $('#map-canvas2').hide('fast');
        $('.pull-me-right').show('fast');
    });

    //http://jqueryui.com/autocomplete/
    $("#destination-search").autocomplete({
        source: [
                 {label: "Ballycommon G.A.A Pitch", value: "53.283638, -7.365105"},
                 {label: "Ballinagar G.A.A Pitch", value: "53.267347, -7.332065" },
                 {label: "Cappincur G.A.A Pitch", value: "53.275017, -7.449432"},
                 {label: "Daingean G.A.A Pitch",value: "53.301667, -7.293206"},
                 {label: "Kilclonfert G.A.A Pitch",value: "53.328217, -7.347591"},
                 {label: "Tullamore G.A.A Pitch",value: "53.280481, -7.491577"},
                 {label: "O' Connor Park",value: "53.280728, -7.491062"}],
        minLength: 1,
        select: function(event, ui) {
            event.preventDefault();
            $("#destination-search").val(ui.item.label);
            $("#destination-search").hide(ui.item.label);
            $("#destination-search").show(ui.item.value);
            $("#destination-search").val(ui.item.value);
            $("#daddr-address").show( "bounce", { times: 3 }, "slow" );
            $("#dlocation").text(ui.item.label).css('color', 'green');
            $("#search-button").fadeIn(800);

        },
        focus: function(event, ui) {
            event.preventDefault();
            $("#destination-search").val(ui.item.label);
        }
    });



    //gets the county offaly location
    //centers it on a map called "map"
    //also displays the user current location
    function initialize() {
        //set variable for the longtitude and latitude
        var myLatlng = new google.maps.LatLng(53.235687, -7.712223);
        //setting how the map displays
        var mapOptions = {
            center: myLatlng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.MAP
        };
        //where to display the map
        var map = new google.maps.Map(document.getElementById("panel-right"),
            mapOptions);
        //adding a marker to the "myLatlng"
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'County Offaly'
        });

        var myloc = new google.maps.Marker({
            icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
                new google.maps.Size(22,22),
                new google.maps.Point(0,18),
                new google.maps.Point(11,11)),
            shadow: null,
            zIndex: 999,
            map: map,
            title: 'My current location'
        });



        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(pos) {
            var me = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            myloc.setPosition(me);
            $("#my_location").val(me);
        }, function(error) {
            // ...
        });


    }

    //Load the map
    google.maps.event.addDomListener(window, 'load', initialize);


    var displayResponse = function(response) { // Display fetched content from the server on the page
        $("#loading").hide();  // hides the loading bar

        var content = $("#map-canvas"); // fetch the content div

        content.html(response); // write the new content in it
        content.find("a").on("click", loadAjax); // finds every link in it and monitor the click events
        content.find("form").on("submit", submitForm); // findex every form in it and monitor the submit events
    }


    var submitForm = function(e) { // When a form is submitted
        e.preventDefault(); // cancel the default action, page refresh

        $(this).find("input[type=submit]").attr("disabled", "disabled"); // find the submit button and disable it
        $(this).off("submit"); // remove the submission event from the form

        $("#loading").show(); // display the loading bar


        var url = $(this).attr("action"); // retrieve the action attribute from the submitted form
        var method = $(this).attr("method"); // retrive the method attribute from the submitted form
        var data = {}; // creates an empty data json object to hold all the values from the submitted form

        $(this).find("input, select, radio").each(function() { // for each input / select / radio in the submitted form
            var name = $(this).attr("name"); // find the name of the input
            var value = $(this).val(); // find the value of the input

            data[name] = value; // add it to the data object
        });

        $.ajax({ // start an ajax request
            url: url, // to the following url
            type: method, // with this http verb (get / post / put / delete)
            data: data, // with these values from the form
            success: displayResponse // when it is done, display the content fetched
        });
    }

    var loadAjax = function(e) { // When a link is clicked
        e.preventDefault(); // cancel the default action, page refresh

        $("#loading").show(); // display the loading bar

        var url = $(this).attr("href"); // retrive the href attribute from the clicked link
        var method = $(this).attr("data-method") || "get"; // retrive the data-method attribute from the clicked link or get if the attribute is empty

        if(method === "delete") { // if the method is delete
            $(this).parents("tr").remove(); // remove the row from the page
        }

        $.ajax({ // start an ajax request
            url: url, // to the following url
            type: method, // with this http verb (get / post / put / delete)
            success: displayResponse // when it is done, display the content fetched
        });
    }

    $("#menu a").on("click", loadAjax); // monitor the navigation bar for click events

});
