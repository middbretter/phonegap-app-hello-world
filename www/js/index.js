/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        app.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        var findButton = document.getElementById("find-location");
        findButton.addEventListener("click", app.locateMe, false);
        console.log("Step 1: deviceready Listener Bound");
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    locateMe: function () {
        app.receivedEvent("click");
    },
    
    // attempt to map the phone's location

    
    // onSuccess Geolocation
    onSuccess: function (position) {
        var element = document.getElementById("geolocation");
        element.innerHTML = "Location Found";
        // element.innerHTML = "Latitude: "           + position.coords.latitude              + "<br />" +
                            // "Longitude: "          + position.coords.longitude             + "<br />" +
                            // "Altitude: "           + position.coords.altitude              + "<br />" +
                            // "Accuracy: "           + position.coords.accuracy              + "<br />" +
                            // "Altitude Accuracy: "  + position.coords.altitudeAccuracy      + "<br />" +
                            // "Heading: "            + position.coords.heading               + "<br />" +
                            // "Speed: "              + position.coords.speed                 + "<br />" +
                            // "Timestamp: "          + position.timestamp                    + "<br />";
        var map;
        console.log("Latitude is: " + position.coords.latitude);
        console.log("Longitude is: " + position.coords.longitude);
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        function initializeMap() {
            var mapDiv = document.getElementById('map-canvas');
            console.log("MAPS LOADING...");
            map = new google.maps.Map(mapDiv, {
                center: latLng,
                zoom: 14,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            var marker = new google.maps.Marker({
                position: latLng,
                map: map
            });
      }
      initializeMap();
    },
    
    // onError Callback receives a PositionError object
    onError: function (error) {
        alert("code: "    + error.code    + "\n" +
              "message: " + error.message + "\n");
    },

    // once the event is received, execute the geolocation function
    receivedEvent: function (id) {
        console.log("Step 2: " + id + " Received");
        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector(".listening");
        var receivedElement = parentElement.querySelector(".received");

        listeningElement.setAttribute("style", "display:none;");
        receivedElement.setAttribute("style", "display:block;");
    }
};
