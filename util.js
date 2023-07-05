class Database extends React.Component {
    constructor(props) {
        super(props);
        this.state = {popup:0};
        localStorage.setItem("rooms", {});
        localStorage.setItem("lawnAreas", {});
    }

    static saveRoom = () => {
        var dbObj = localStorage.getItem("rooms");
        var db = JSON.parse(dbObj);
        if (db === null) //if the database hasn't been created yet 
            db = {};

        var roomName = document.getElementById("roomNameInput").value;
        var roomTemp = document.getElementById("roomTempInput").value;
        
        // this will overwrite if the entry exists
        // db[roomName] = {temp:roomTemp};
        // var JSONObject = JSON.stringify(db);
        // localStorage.setItem("rooms", JSONObject);
        db[roomName] = {temp:roomTemp,
                        schedule_start:new Date(),
                        schedule_end:new Date()};

        var JSONObject = JSON.stringify(db);
        localStorage.setItem("rooms", JSONObject);

        // this will not allow the user to overwrite
        var button = document.createElement("button");
        button.type = "button";
        button.innerHTML = `${roomName} <br> Temp: ${db[roomName].temp}`;
        button.className = "default-btn btn btn-primary btn-lg m-3 room-btn-custom";
        button.addEventListener("click", () => {
            var overlay = document.getElementById("rooms-overlay");
            var popupBox = document.getElementById("rooms-popupBox");
            if (this.state.popup === 0) {
                overlay.style.display = "block";
                popupBox.style.display = "block";
                this.state.popup = 1;
            } else if (this.state.popup === 1) {
                overlay.style.display = "none";
                popupBox.style.display = "none";
                this.state.popup = 0;
            }
        });
        var container = document.getElementById("roomButtons");
        container.appendChild(button);
        
    }
    static updateRoom = () => {
        var dbObj = localStorage.getItem("rooms");
        var db = JSON.parse(dbObj);

        var roomName = document.getElementById("roomNameInput").value;
        var roomTemp = document.getElementById("roomTempInput").value;
        
        // this will overwrite if the entry exists
        // db[roomName] = {temp:roomTemp};
        // var JSONObject = JSON.stringify(db);
        // localStorage.setItem("rooms", JSONObject);
        db[roomName].temp = roomTemp;
        var JSONObject = JSON.stringify(db);
        localStorage.setItem("rooms", JSONObject);
    }

    //update the room temperature schedule
    //params: 
    // - roomName: String (name/key of room)
    // - from: Date (start date of schedule)
    // - to: Date (end date of schedule) 
    static updateRoomSchedule(roomName, from, to) {
        var dbObj = localStorage.getItem("rooms");
        var db = JSON.parse(dbObj);

        //update schedules
        db[roomName].schedule_start = from;
        db[roomName].schedule_end = to;
        var JSONObject = JSON.stringify(db);        
        localStorage.setItem("rooms", JSONObject);
    }

    static retrieveRoom = () => {
        var JSONObject = localStorage.getItem("rooms");
        var JSObject = JSON.parse(JSONObject);
        return(JSObject);
    }


    static saveLawnArea = (areaName, from, to, overlayID, popupID) => {
        var dbObj = localStorage.getItem("lawnAreas");
        var db = JSON.parse(dbObj);
        if (db === null) //if the database hasn't been created yet 
            db = {};

        var lawnStatus = Util.getLawnStatus();;

        db[areaName] = {status:lawnStatus,
                        schedule_start:from,
                        schedule_end:to};

        var JSONObject = JSON.stringify(db);
        localStorage.setItem("lawnAreas", JSONObject);

        var button = document.createElement("button");
        button.type = "button";
        button.innerHTML = `${areaName} <br> Status: ${db[areaName].temp}`;
        button.className = "default-btn btn btn-primary btn-lg m-3 room-btn-custom";
        button.addEventListener("click", () => {
            var overlay = document.getElementById(overlayID);
            var popupBox = document.getElementById(popupID);
            if (this.state.popup === 0) {
                overlay.style.display = "block";
                popupBox.style.display = "block";
                this.state.popup = 1;
            } else if (this.state.popup === 1) {
                overlay.style.display = "none";
                popupBox.style.display = "none";
                this.state.popup = 0;
            }
        });
        var container = document.getElementById("garden-sched-buttons");
        container.appendChild(button);

    }

    //update the garden irrigation schedule
    //params: 
    // - areaName: String (name/key of lawn area)
    // - status: Boolean (state of water irrigation, true=on, false=off)
    // - from: Date (start date of schedule)
    // - to: Date (end date of schedule) 
    static updateAreaSchedule(areaName, from, to) {
        var dbObj = localStorage.getItem("lawnAreas");
        var db = JSON.parse(dbObj);
        
        var lawnStatus = Util.getLawnStatus();

        //update schedules
        db[areaName].status = lawnStatus;
        db[areaName].schedule_start = from;
        db[areaName].schedule_end = to;
        var JSONObject = JSON.stringify(db);        
        localStorage.setItem("lawnAreas", JSONObject);
    }

    static retrieveLawnAreas() {
        var JSONObject = localStorage.getItem("lawnAreas");
        var JSObject = JSON.parse(JSONObject);
        if (JSObject === null) {
            JSObject = {};
        }
        return(JSObject);
    }

    static cleardb = () => {
        localStorage.clear();
    }
}


class Util {
    constructor(){}

    /*Shows or hides a popup window
    params:
     - overlayID: String (id of overlay div in the rendered page)
     - popupID: String (id of popup div)
     - stateValue: Int (the state of the popup, 0=off, 1=on
     - roomName: String (name of the room if passed) 
    */ 
    static handlePopupChange(overlayID, popupID, stateValue, roomName=null) {
        var overlay = document.getElementById(overlayID);
        var popupBox = document.getElementById(popupID);

        if (stateValue === 0) {
            //if state is currently off, turn on (show popup)
            overlay.style.display = "block";
            popupBox.style.display = "block";
            stateValue = 1;
            if (roomName){ //if room name was passed
                var val = document.getElementById("roomName");
                var newVal = roomName;
                val.style.fontSize = "1.3em";
                val.innerHTML = "Room: " + newVal;
            }
        } else if (stateValue === 1) {
            //if state is on, turn off (hide popup)
            overlay.style.display = "none";
            popupBox.style.display = "none";
            stateValue = 0;
        }

        return stateValue;
    }

    static changeText(textID, valueID) {
        var val = document.getElementById(textID);
        var newVal = document.getElementById(valueID).value;
        val.innerHTML = newVal;
    }

    static getLawnStatus() {
        var lawnStatusObject = document.getElementById("lawnStatus");
        var lawnStatus = "Off";
        if (lawnStatusObject != undefined) {
            var lawnStatusBool = lawnStatusObject.checked;
            if (lawnStatusBool) {lawnStatus="On";}
            else {lawnStatus="Off";}
        }
        return lawnStatus;
    }
}