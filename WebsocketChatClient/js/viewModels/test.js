/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * test module
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojlistview', 'ojs/ojarraytabledatasource', 'ojs/ojbutton', 'ojs/ojinputtext'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function testContentViewModel() {
        var self = this;
        this.name = ko.observable("");
        this.itemToAdd = ko.observable("");
        this.allItems = ko.observableArray();
        this.selectedItems = ko.observableArray([]);

        var lastItemId = this.allItems().length;

        this.dataSource = new oj.ArrayTableDataSource(this.allItems, {idAttribute: "id"});



        var wsUri = "ws://localhost:8080/WebsocketTest/websockettestendpoint";
        var websocket = new WebSocket(wsUri);

        websocket.onerror = function (evt) {
            onError(evt)
        };

        function onError(evt) {

        }

        websocket.onopen = function (evt) {
            onOpen(evt)
        };

        function onOpen() {
            this.tmessage = "Connected to " + wsUri;
        }

        websocket.onmessage = function (event) {
            onMessage(event.data);
        };

        function onMessage(text) {
            if ((text != ""))
            {
                console.log(self);
                self.allItems.unshift({"id": self.lastItemId, "item": text});
            }
        }

        $(document).keyup(function (event) {
            if (event.keyCode == 13) {
                $("#button").click();
                event.preventDefault();

            }
        });

        this.buttonClick = function (data, event) {
            if (self.itemToAdd() != "" && self.name() != "") {
                websocket.send(self.name() + ": " + self.itemToAdd());

                self.itemToAdd("");
            }
        }
    }
    ;


// End test functions


    return testContentViewModel;
});
